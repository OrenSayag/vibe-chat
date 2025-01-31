import { SendMessageRequest, WhatsappMessage } from './whatsapp-messages.types';

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
} & WhatsappMessage;

export type Message = {
  message: WhatsappMessage;
  from: string;
  id: string;
  timestamp: string;
} & AddedMessageInfo;

export enum WhatsappMessageType {
  TEMPLATE = 'template',
  TEXT = 'text',
  DOCUMENT = 'document',
}

export type WhatsappSendMessageRequestBody = {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
} & SendMessageRequest;

export type WhatsappSendMessageResponseBody = {
  messaging_product: 'whatsapp';
  contacts: { input: string; wa_id: string }[];
  messages: { id: string }[];
};

export enum WhatsappTemplateCategory {
  ACCOUNT_UPDATE = 'ACCOUNT_UPDATE',
  PAYMENT_UPDATE = 'PAYMENT_UPDATE',
  PERSONAL_FINANCE_UPDATE = 'PERSONAL_FINANCE_UPDATE',
  SHIPPING_UPDATE = 'SHIPPING_UPDATE',
  RESERVATION_UPDATE = 'RESERVATION_UPDATE',
  ISSUE_RESOLUTION = 'ISSUE_RESOLUTION',
  APPOINTMENT_UPDATE = 'APPOINTMENT_UPDATE',
  TRANSPORTATION_UPDATE = 'TRANSPORTATION_UPDATE',
  TICKET_UPDATE = 'TICKET_UPDATE',
  ALERT_UPDATE = 'ALERT_UPDATE',
  AUTO_REPLY = 'AUTO_REPLY',
  TRANSACTIONAL = 'TRANSACTIONAL',
  OTP = 'OTP',
  UTILITY = 'UTILITY',
  MARKETING = 'MARKETING',
  AUTHENTICATION = 'AUTHENTICATION',
}

export type WhatsappParameterFormat = 'POSITIONAL' | 'Named';

export enum WhatsappTemplateComponentFormat {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
  LOCATION = 'LOCATION',
}

export enum WhatsappTemplateComponentType {
  HEADER = 'HEADER',
  BODY = 'BODY',
  FOOTER = 'FOOTER',
  BUTTONS = 'BUTTONS',
}

export type WhatsappTemplateHeaderComponent = {
  type: WhatsappTemplateComponentType;
  format: WhatsappTemplateComponentFormat;
};

export type WhatsappTemplateBodyComponent = {
  type: WhatsappTemplateComponentType.BODY;
  text: string;
};

export type WhatsappTemplateFooterComponent = {
  type: WhatsappTemplateComponentType.FOOTER;
  text: string;
};

export enum WhatsappTemplateButtonType {
  PHONE_NUMBER = 'PHONE_NUMBER',
  URL = 'URL',
  COPY_CODE = 'COPY_CODE',
  FLOW = 'FLOW',
  QUICK_REPLY = 'QUICK_REPLY',
}

export type WhatsappTemplatePhoneNumberButton = {
  type: WhatsappTemplateButtonType.PHONE_NUMBER;
  phone_number: string;
};

export type WhatsappTemplateUrlButton = {
  type: WhatsappTemplateButtonType.URL;
  url: string;
};

export type WhatsappTemplateCopyCodeButton = {
  type: WhatsappTemplateButtonType.COPY_CODE;
  // example: string;
};

export type WhatsappTemplateQuickReplyButton = {
  type: WhatsappTemplateButtonType.QUICK_REPLY;
};

export type WhatsappTemplateFlowButton = {
  type: WhatsappTemplateButtonType.FLOW;
  // example: string;
  flow_id: string;
  flow_name: string;
  flow_json: string;
  flow_action: string;
  navigate_screen: string;
};

export type WhatsappTemplateButton = {
  text: string;
} & (
  | WhatsappTemplateUrlButton
  | WhatsappTemplatePhoneNumberButton
  | WhatsappTemplateCopyCodeButton
  | WhatsappTemplateQuickReplyButton
  | WhatsappTemplateFlowButton
);

export type WhatsappTemplateButtonsComponent = {
  type: WhatsappTemplateComponentType.BUTTONS;
  buttons: WhatsappTemplateButton[];
};

export type WhatsappTemplateComponent =
  | WhatsappTemplateButtonsComponent
  | WhatsappTemplateHeaderComponent
  | WhatsappTemplateBodyComponent
  | WhatsappTemplateFooterComponent;

export type WhatsappHSMQualityScore = {
  date: number;
  reasons: string[];
  score: string;
};

export enum WhatsappTemplateRejectionReason {
  ABUSIVE_CONTENT = 'ABUSIVE_CONTENT',
  INVALID_FORMAT = 'INVALID_FORMAT',
  NONE = 'NONE',
  PROMOTIONAL = 'PROMOTIONAL',
  TAG_CONTENT_MISMATCH = 'TAG_CONTENT_MISMATCH',
  SCAM = 'SCAM',
}

export enum WhatsappTemplateStatus {
  APPROVED = 'APPROVED',
  IN_APPEAL = 'IN_APPEAL',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  PENDING_DELETION = 'PENDING_DELETION',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
  PAUSED = 'PAUSED',
  LIMIT_EXCEEDED = 'LIMIT_EXCEEDED',
}

export type WhatsappTemplate = {
  name: string;
  parameter_format: WhatsappParameterFormat;
  category: WhatsappTemplateCategory;
  components: WhatsappTemplateComponent[];
  correct_category: WhatsappTemplateCategory;
  cta_url_link_tracking_opted_out?: boolean;
  language: string;
  library_template_name?: string;
  message_send_ttl_seconds?: number;
  previous_category?: WhatsappTemplateCategory;
  quality_score?: WhatsappHSMQualityScore;
  rejected_reason?: WhatsappTemplateRejectionReason;
  status: WhatsappTemplateStatus;
  sub_category?: WhatsappTemplateCategory;
};

export type WhatsappApiPagination = {
  paging: {
    cursors: {
      before: string;
      after: string;
    };
  };
};
