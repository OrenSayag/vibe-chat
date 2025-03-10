import { ChatMessageBox } from '@vibe-chat/components';
import {
  Message,
  MessageDirection,
  MessageStatus,
  WhatsappMessageType,
  WhatsappTemplate,
  WhatsappTemplateCategory,
  WhatsappTemplateStatus,
} from '@vibe-chat/shared-types';
import { CSSProperties, FC } from 'react';
type Props = {
  style?: CSSProperties;
  data: WhatsappTemplate['components'];
};

export const Preview: FC<Props> = ({ style = {}, data }) => {
  const mockMessage: Message = {
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

  const template: WhatsappTemplate = {
    name: 'preview-template',
    id: 'preview-template',
    parameter_format: 'POSITIONAL',
    category: WhatsappTemplateCategory.UTILITY,
    components: data,
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
        <ChatMessageBox message={mockMessage} template={template} />
      </div>
    </div>
  );
};
