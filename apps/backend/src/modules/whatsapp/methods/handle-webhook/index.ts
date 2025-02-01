import {
  InboundMessageContact,
  Message,
  MessageDirection,
  MessageStatus,
  UpdateMessageStatusEventPayload,
  WhatsappWebhook,
} from '@monday-whatsapp/shared-types';
import {
  getContactByPhoneNumberId,
  getMessageContact,
  getSubscriptionIdByPhoneNumberId,
  updateMessageStatus,
  upsertMessageInHistory,
} from '@monday-whatsapp/db';
import { EventsService } from '../../../events/events.service';

type Input = {
  data: WhatsappWebhook;
  eventsService: EventsService;
};

export const handleWebhook = async ({ data, eventsService }: Input) => {
  switch (data.object) {
    case 'whatsapp_business_account':
      for (const entry of data.entry) {
        for (const change of entry.changes) {
          switch (change.field) {
            case 'messages':
              for (const status of change.value.statuses ?? []) {
                await handleOutboundMessageStatusChange({
                  mid: status.id,
                  status: status.status,
                  eventsService,
                });
              }
              for (const msg of change.value.messages ?? []) {
                await handleInboundMessage({
                  message: {
                    status: MessageStatus.READ,
                    direction: MessageDirection.INCOMING,
                    id: msg.id,
                    from: msg.from,
                    timestamp: msg.timestamp,
                    message: msg,
                  },
                  contact: change.value.contacts![0]!,
                  subscriptionPhoneNumberId:
                    change.value.metadata.phone_number_id,
                  eventsService,
                });
              }
          }
        }
      }
  }
};

async function handleOutboundMessageStatusChange({
  status,
  mid,
  eventsService,
}: {
  mid: string;
  status: MessageStatus;
  eventsService: EventsService;
}) {
  try {
    const message = await updateMessageStatus({
      mid,
      status,
    });

    const contact = await getMessageContact({
      mid,
    });

    await eventsService.broadcastMessageStatusChange({
      message,
      contactPhoneNumberId: contact.phoneNumberId,
    });
  } catch (e) {
    console.log(e);
    console.log('Error in method handleOutboundMessageStatusChange');
  }
}

async function handleInboundMessage({
  message,
  contact,
  subscriptionPhoneNumberId,
  eventsService,
}: {
  message: Message;
  subscriptionPhoneNumberId: string;
  contact: InboundMessageContact;
  eventsService: EventsService;
}) {
  const { subscriptionId } = await getSubscriptionIdByPhoneNumberId({
    phoneNumberId: subscriptionPhoneNumberId,
  });
  const { id: contactId } = await getContactByPhoneNumberId({
    subscriptionId,
    phoneNumberId: contact.wa_id,
    displayedPhoneNumber: contact.wa_id,
    name: contact.profile.name,
  });
  await upsertMessageInHistory({
    message,
    subscriptionId,
    contactId,
  });
  const payload: UpdateMessageStatusEventPayload = {
    message,
    contactPhoneNumberId: contact.wa_id,
  };
  await eventsService.broadcastMessageStatusChange(payload);
}
