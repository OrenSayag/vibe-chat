export type WhatsappWebhook = WhatsappBusinessAccountWebhook;

type WhatsappBusinessAccountWebhook = {
  object: 'whatsapp_business_account';
  entry: Entry[];
};

type Entry = {
  id: string;
  changes: Change[];
};

type ChangeField = 'messages';

type Change = {
  value: ChangeValue;
  field: ChangeField;
};

type MessageStatusChange = {
  id: string;
  status: MessageStatus;
  timestamp: `${number}`;
  recipientId: `${number}`;
  conversation: {
    id: string;
    origin: {
      type: 'utility';
    };
  };
};

type ChangeValue = {
  messaging_product: 'whatsapp';
  metadata: Metadata;
  statuses?: MessageStatusChange[]; // when the message is outbound
  contacts?: InboundMessageContact[]; // when the message is inbound
  messages?: RawWhatsappMessage[]; // when the message is inbound
};

type Metadata = {
  display_phone_number: string;
  phone_number_id: string;
};

export type InboundMessageContact = {
  profile: {
    name: string;
  };
  wa_id: string;
};

export enum MessageDirection {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

export enum MessageStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
  DELETED = 'deleted',
}

type AddedMessageInfo = {
  direction: MessageDirection;
  status: MessageStatus;
};

export type RawWhatsappMessage = {
  from: string;
  id: string;
  timestamp: string;
  text: Text;
  type: 'text';
};

export type Message = RawWhatsappMessage & AddedMessageInfo;

type Text = {
  body: string;
};

export enum WhatsappMessageType {
  TEXT = 'text',
  DOCUMENT = 'document',
}

export type WhatsappSendMessageRequestBody = {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
  to: string;
  type: WhatsappMessageType;
  text: {
    body: string;
    preview_url?: boolean;
  };
};

export type WhatsappSendMessageResponseBody = {
  messaging_product: 'whatsapp';
  contacts: { input: string; wa_id: string }[];
  messages: { id: string }[];
};
