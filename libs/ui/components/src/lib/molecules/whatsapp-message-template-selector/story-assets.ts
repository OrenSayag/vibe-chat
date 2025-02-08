import {
  WhatsappTemplate,
  WhatsappTemplateCategory,
  WhatsappTemplateComponentFormat,
  WhatsappTemplateComponentType,
  WhatsappTemplateStatus,
} from '@vibe-chat/shared-types';

export const templates: WhatsappTemplate[] = [
  {
    name: 'hello_world',
    parameter_format: 'POSITIONAL',
    components: [
      {
        type: WhatsappTemplateComponentType.HEADER,
        format: WhatsappTemplateComponentFormat.TEXT,
        text: 'Hello World',
      },
      {
        type: WhatsappTemplateComponentType.BODY,
        text: 'Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us.',
      },
      {
        type: WhatsappTemplateComponentType.FOOTER,
        text: 'WhatsApp Business Platform sample message',
      },
    ],
    language: 'en_US',
    status: WhatsappTemplateStatus.APPROVED,
    category: WhatsappTemplateCategory.UTILITY,
    id: '1636106633965044',
  },
  {
    name: 'hello_world_2',
    parameter_format: 'POSITIONAL',
    components: [
      {
        type: WhatsappTemplateComponentType.HEADER,
        format: WhatsappTemplateComponentFormat.TEXT,
        text: 'Hello World 2',
      },
      {
        type: WhatsappTemplateComponentType.BODY,
        text: 'Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us.',
      },
      {
        type: WhatsappTemplateComponentType.FOOTER,
        text: 'WhatsApp Business Platform sample message',
      },
    ],
    language: 'en_US',
    status: WhatsappTemplateStatus.APPROVED,
    category: WhatsappTemplateCategory.UTILITY,
    id: '1636106633965048',
  },
];
