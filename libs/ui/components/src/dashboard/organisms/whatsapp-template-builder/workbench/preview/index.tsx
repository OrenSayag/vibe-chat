import {
  WhatsappContentForm,
  Message,
  MessageDirection,
  MessageStatus,
  WhatsappMessageType,
  WhatsappTemplate,
  WhatsappTemplateCategory,
  WhatsappTemplateStatus,
  WhatsappTemplateComponent,
} from '@vibe-chat/shared-types';
import { CSSProperties, FC } from 'react';
import { ChatMessageBox } from '@vibe-chat/components';
type Props = {
  style?: CSSProperties;
  data: Partial<WhatsappContentForm>;
};

export const Preview: FC<Props> = ({ style = {}, data }) => {
  // Create default message object
  const defaultMessage: Message = {
    direction: MessageDirection.OUTGOING,
    status: MessageStatus.SENT,
    from: '1234567890',
    id: 'preview-message',
    timestamp: (Date.now() / 1000).toString(),
    message: {
      type: WhatsappMessageType.TEMPLATE,
      template: {
        name: 'preview-template',
        language: { code: 'en' },
      },
    },
  };

  // Create template object from form data
  const template: WhatsappTemplate = {
    name: 'preview-template',
    id: 'preview-template',
    parameter_format: 'POSITIONAL',
    category: WhatsappTemplateCategory.UTILITY,
    components: [data.header, data.body, data.footer, data.buttons].filter(
      Boolean
    ) as WhatsappTemplateComponent[], // Filter out undefined components
    language: 'en',
    status: WhatsappTemplateStatus.APPROVED,
  };

  return (
    <div
      style={{
        ...style,
        background: 'rgba(22, 161, 247, 0.1)',
        height: '100%',
        padding: '.5em',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 10,
          zIndex: 1000,
        }}
      >
        <ChatMessageBox message={defaultMessage} template={template} />
      </div>
    </div>
  );
};
