import { FC, useCallback, useState } from 'react';
import { Box, Button, Flex, TextArea, TextField } from '@vibe/core';
import {
  MessageInputAndActionProps,
  WhatsappMessageType,
} from '@vibe-chat/shared-types';
import { Bot, MessageCircleIcon, SendHorizonal } from 'lucide-react';
import { WhatsappMessageTemplateSelector } from '../whatsapp-message-template-selector';

export const MessageInputAndAction: FC<MessageInputAndActionProps> = ({
  className,
  onSend,
  disabled,
  type = 'text',
  style,
  templateSelectorProps,
  templatesOnly,
}) => {
  const [input, setInput] = useState<string>('');
  const [mode, setMode] = useState<'template' | 'message'>(
    templatesOnly ? 'template' : 'message'
  );
  const toggleMode = () => setMode(mode === 'message' ? 'template' : 'message');
  const InputComponent = type === 'text' ? TextField : TextArea;
  const onSendMessage = useCallback(() => {
    if (mode === 'message') {
      onSend({
        type: WhatsappMessageType.TEXT,
        text: {
          body: input,
        },
      });
      setInput('');
    }
    if (mode === 'template') {
      onSend({
        type: WhatsappMessageType.TEMPLATE,
        template: {
          name: templateSelectorProps.selectedTemplateName!,
          language: {
            code: templateSelectorProps.templates.find(
              (t) => t.name === templateSelectorProps.selectedTemplateName!
            )!.language,
          },
        },
      });
    }
  }, [mode, input, templateSelectorProps.selectedTemplateName]);
  return (
    <>
      <div style={style}>
        <Flex gap={'small'}>
          <ModeToggle
            onClick={toggleMode}
            disabled={templatesOnly && mode === 'template'}
            mode={mode}
          />
          {mode === 'template' && (
            <TemplateSelection templateSelectorProps={templateSelectorProps} />
          )}
          {mode === 'message' && (
            <InputComponent
              disabled={templatesOnly}
              className={'h-full'}
              placeholder={'Type a message...'}
              onChange={(e) => setInput(type === 'text' ? e : e.target.value)}
              value={input}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSend({
                    type: WhatsappMessageType.TEXT,
                    text: {
                      body: input,
                    },
                  });
                  setInput('');
                }
              }}
            />
          )}
          <Box
            marginTop={type === 'text-area' ? 'small' : undefined}
            rounded={'small'}
          >
            <Flex justify={'start'}>
              <Button
                color={'positive'}
                size={'small'}
                disabled={
                  (mode === 'message' && !input) ||
                  (mode === 'template' &&
                    !templateSelectorProps.selectedTemplateName) ||
                  disabled
                }
                onClick={onSendMessage}
              >
                <SendHorizonal size={20} />
              </Button>
            </Flex>
          </Box>
        </Flex>
      </div>
    </>
  );
};

function TemplateSelection({
  templateSelectorProps,
}: {
  templateSelectorProps: MessageInputAndActionProps['templateSelectorProps'];
}) {
  return (
    <WhatsappMessageTemplateSelector
      {...templateSelectorProps}
      style={{ width: '100%' }}
    />
  );
}

function ModeToggle({
  onClick,
  disabled,
  mode,
}: {
  onClick(): void;
  disabled?: boolean;
  mode: 'template' | 'message';
}) {
  const Icon = mode === 'message' ? Bot : MessageCircleIcon;
  return (
    <Button onClick={onClick} size={'small'} disabled={disabled}>
      <Icon size={20} />
    </Button>
  );
}
