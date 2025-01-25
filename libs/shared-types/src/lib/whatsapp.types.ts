export type Webhook = WhatsappBusinessAccountWebhook;

type WhatsappBusinessAccountWebhook = {
  object: 'whatsapp_business_account';
  entry: Entry[];
};

type Entry = {
  id: string;
  changes: Change[];
};

type Change = {
  value: ChangeValue;
  field: string;
};

type ChangeValue = {
  messaging_product: 'whatsapp';
  metadata: Metadata;
  contacts: Contact[];
  messages: Message[];
};

type Metadata = {
  display_phone_number: string;
  phone_number_id: string;
};

type Contact = {
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

export type Message = {
  from: string;
  id: string;
  timestamp: string;
  text: Text;
  type: 'text';
} & AddedMessageInfo;

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
