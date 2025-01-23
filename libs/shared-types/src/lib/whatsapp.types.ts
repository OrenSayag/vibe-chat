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

export type Message = {
  from: string;
  id: string;
  timestamp: string;
  text: Text;
  type: 'text';
};

type Text = {
  body: string;
};
