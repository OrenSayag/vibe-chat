import { Locale } from '../../dashboard/locales.types';
import { SendMessageRequest, WhatsappMessage } from './whatsapp-messages.types';
import { z } from 'zod';

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
  // ACCOUNT_UPDATE = 'ACCOUNT_UPDATE',
  // PAYMENT_UPDATE = 'PAYMENT_UPDATE',
  // PERSONAL_FINANCE_UPDATE = 'PERSONAL_FINANCE_UPDATE',
  // SHIPPING_UPDATE = 'SHIPPING_UPDATE',
  // RESERVATION_UPDATE = 'RESERVATION_UPDATE',
  // ISSUE_RESOLUTION = 'ISSUE_RESOLUTION',
  // APPOINTMENT_UPDATE = 'APPOINTMENT_UPDATE',
  // TRANSPORTATION_UPDATE = 'TRANSPORTATION_UPDATE',
  // TICKET_UPDATE = 'TICKET_UPDATE',
  // ALERT_UPDATE = 'ALERT_UPDATE',
  // AUTO_REPLY = 'AUTO_REPLY',
  // TRANSACTIONAL = 'TRANSACTIONAL',
  // OTP = 'OTP',
  // UTILITY = 'UTILITY',
  MARKETING = 'MARKETING',
  // AUTHENTICATION = 'AUTHENTICATION',
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

type BaseWhatsappTemplateHeaderComponent = {
  type: WhatsappTemplateComponentType.HEADER;
  format: WhatsappTemplateComponentFormat;
};

export type WhatsappTemplateHeaderTextComponent =
  BaseWhatsappTemplateHeaderComponent & {
    text: string;
    format: WhatsappTemplateComponentFormat.TEXT;
    example: {
      header_text: string[];
    };
  };

export type WhatsappTemplateHeaderImageComponent =
  BaseWhatsappTemplateHeaderComponent & {
    format: WhatsappTemplateComponentFormat.IMAGE;
    example: {
      header_handle: string[];
    };
  };

export type WhatsappTemplateHeaderDocumentComponent =
  BaseWhatsappTemplateHeaderComponent & {
    format: WhatsappTemplateComponentFormat.DOCUMENT;
    example: {
      header_handle: string[];
    };
  };

export type WhatsappTemplateHeaderLocationComponent =
  BaseWhatsappTemplateHeaderComponent & {
    format: WhatsappTemplateComponentFormat.LOCATION;
  };

export type WhatsappTemplateHeaderComponent =
  | WhatsappTemplateHeaderTextComponent
  | WhatsappTemplateHeaderImageComponent
  | WhatsappTemplateHeaderDocumentComponent
  | WhatsappTemplateHeaderLocationComponent;

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
  id: string;
  parameter_format: WhatsappParameterFormat;
  category: WhatsappTemplateCategory;
  components: WhatsappTemplateComponent[];
  correct_category?: WhatsappTemplateCategory;
  cta_url_link_tracking_opted_out?: boolean;
  language: string;
  library_template_name?: string;
  message_send_ttl_seconds?: number;
  previous_category?: WhatsappTemplateCategory;
  quality_score?: WhatsappHSMQualityScore;
  rejected_reason?: WhatsappTemplateRejectionReason;
  status: WhatsappTemplateStatus;
  sub_category?: WhatsappTemplateCategory;

  // app added fields
  isDraft?: boolean;
};

export type WhatsappApiPagination = {
  paging: {
    cursors: {
      before: string;
      after: string;
    };
  };
};

export const whatsappTemplateCategoryTranslations: Record<
  WhatsappTemplateCategory,
  Record<Locale, string>
> = {
  // [WhatsappTemplateCategory.ACCOUNT_UPDATE]: {
  //   [Locale.ENGLISH]: 'Account Update',
  //   [Locale.HEBREW]: 'עדכון חשבון',
  // },
  // [WhatsappTemplateCategory.PAYMENT_UPDATE]: {
  //   [Locale.ENGLISH]: 'Payment Update',
  //   [Locale.HEBREW]: 'עדכון תשלום',
  // },
  // [WhatsappTemplateCategory.PERSONAL_FINANCE_UPDATE]: {
  //   [Locale.ENGLISH]: 'Personal Finance Update',
  //   [Locale.HEBREW]: 'עדכון פיננסי אישי',
  // },
  // [WhatsappTemplateCategory.SHIPPING_UPDATE]: {
  //   [Locale.ENGLISH]: 'Shipping Update',
  //   [Locale.HEBREW]: 'עדכון משלוח',
  // },
  // [WhatsappTemplateCategory.RESERVATION_UPDATE]: {
  //   [Locale.ENGLISH]: 'Reservation Update',
  //   [Locale.HEBREW]: 'עדכון הזמנה',
  // },
  // [WhatsappTemplateCategory.ISSUE_RESOLUTION]: {
  //   [Locale.ENGLISH]: 'Issue Resolution',
  //   [Locale.HEBREW]: 'פתרון בעיה',
  // },
  // [WhatsappTemplateCategory.APPOINTMENT_UPDATE]: {
  //   [Locale.ENGLISH]: 'Appointment Update',
  //   [Locale.HEBREW]: 'עדכון פגישה',
  // },
  // [WhatsappTemplateCategory.TRANSPORTATION_UPDATE]: {
  //   [Locale.ENGLISH]: 'Transportation Update',
  //   [Locale.HEBREW]: 'עדכון תחבורה',
  // },
  // [WhatsappTemplateCategory.TICKET_UPDATE]: {
  //   [Locale.ENGLISH]: 'Ticket Update',
  //   [Locale.HEBREW]: 'עדכון כרטיס',
  // },
  // [WhatsappTemplateCategory.ALERT_UPDATE]: {
  //   [Locale.ENGLISH]: 'Alert Update',
  //   [Locale.HEBREW]: 'עדכון התראה',
  // },
  // [WhatsappTemplateCategory.AUTO_REPLY]: {
  //   [Locale.ENGLISH]: 'Auto Reply',
  //   [Locale.HEBREW]: 'תשובה אוטומטית',
  // },
  // [WhatsappTemplateCategory.TRANSACTIONAL]: {
  //   [Locale.ENGLISH]: 'Transactional',
  //   [Locale.HEBREW]: 'טרנזקציה',
  // },
  // [WhatsappTemplateCategory.OTP]: {
  //   [Locale.ENGLISH]: 'One-Time Password',
  //   [Locale.HEBREW]: 'סיסמה חד פעמית',
  // },
  // [WhatsappTemplateCategory.UTILITY]: {
  //   [Locale.ENGLISH]: 'Utility',
  //   [Locale.HEBREW]: 'שירות',
  // },
  [WhatsappTemplateCategory.MARKETING]: {
    [Locale.ENGLISH]: 'Marketing',
    [Locale.HEBREW]: 'שיווק',
  },
  // [WhatsappTemplateCategory.AUTHENTICATION]: {
  //   [Locale.ENGLISH]: 'Authentication',
  //   [Locale.HEBREW]: 'אימות',
  // },
};

export const whatsappTemplateComponentSchema = z.union([
  z.object({
    type: z.literal(WhatsappTemplateComponentType.HEADER),
    format: z.nativeEnum(WhatsappTemplateComponentFormat),
    text: z.string().optional(),
  }),
  z.object({
    type: z.literal(WhatsappTemplateComponentType.BODY),
    text: z.string().min(1),
  }),
  z.object({
    type: z.literal(WhatsappTemplateComponentType.FOOTER),
    text: z.string().optional(),
  }),
  z.object({
    type: z.literal(WhatsappTemplateComponentType.BUTTONS),
    buttons: z.array(
      z.object({
        text: z.string(),
        type: z.nativeEnum(WhatsappTemplateButtonType),
        phone_number: z.string().optional(),
        url: z.string().optional(),
        navigate_screen: z.string().optional(),
      })
    ),
  }),
]);

export const headerComponentSchema = z.discriminatedUnion('format', [
  z.object({
    format: z.literal(WhatsappTemplateComponentFormat.TEXT),
    text: z.string(),
    example: z.object({
      header_text: z.array(z.string()),
    }),
  }),
  z.object({
    format: z.literal(WhatsappTemplateComponentFormat.IMAGE),
    example: z.object({
      header_handle: z.array(z.string()),
    }),
  }),
  z.object({
    format: z.literal(WhatsappTemplateComponentFormat.DOCUMENT),
    example: z.object({
      header_handle: z.array(z.string()),
    }),
  }),
  z.object({
    format: z.literal(WhatsappTemplateComponentFormat.LOCATION),
  }),
]);

export type HeaderComponent = z.infer<typeof headerComponentSchema>;

export const whatsappTemplateBuilderMetadataFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.nativeEnum(WhatsappTemplateCategory),
  components: z.array(whatsappTemplateComponentSchema),
  language: z.string().min(1, 'Language is required'),
});

export const metadataSchema = z.object({
  category: z.nativeEnum(WhatsappTemplateCategory, {
    required_error: 'Category is required',
  }),
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(
      /^[a-zA-Z-_]+$/,
      'Name can only contain letters, hyphens, and underscores'
    ),
  languages: z.array(z.any()).min(1, 'At least one language is required'),
});

export type WhatsappTemplateBuilderMetadataForm = z.infer<
  typeof whatsappTemplateBuilderMetadataFormSchema
>;

export const localizedStringSchema = z.record(z.string(), z.string().min(1));

export const whatsappContentFormSchema = z.object({
  header: z
    .discriminatedUnion('format', [
      z.object({
        type: z.literal(WhatsappTemplateComponentType.HEADER),
        format: z.literal(WhatsappTemplateComponentFormat.TEXT),
        text: localizedStringSchema,
      }),
      z.object({
        type: z.literal(WhatsappTemplateComponentType.HEADER),
        format: z.literal(WhatsappTemplateComponentFormat.IMAGE),
        image: z.string().min(1),
      }),
      z.object({
        type: z.literal(WhatsappTemplateComponentType.HEADER),
        format: z.literal(WhatsappTemplateComponentFormat.DOCUMENT),
      }),
      z.object({
        type: z.literal(WhatsappTemplateComponentType.HEADER),
        format: z.literal(WhatsappTemplateComponentFormat.LOCATION),
      }),
    ])
    .optional(),
  body: z.object({
    type: z.literal(WhatsappTemplateComponentType.BODY),
    text: localizedStringSchema,
  }),
  footer: z
    .object({
      type: z.literal(WhatsappTemplateComponentType.FOOTER),
      text: localizedStringSchema,
    })
    .optional(),
  buttons: z
    .object({
      type: z.literal(WhatsappTemplateComponentType.BUTTONS),
      buttons: z.array(
        z.object({
          text: localizedStringSchema,
          type: z.nativeEnum(WhatsappTemplateButtonType),
          phone_number: z.string().optional(),
          url: z.string().optional(),
          navigate_screen: z.string().optional(),
        })
      ),
    })
    .optional(),
});

export type WhatsappContentForm = z.infer<typeof whatsappContentFormSchema>;

export const NEW_WHATSAPP_TEMPLATE_ID = 'new';
