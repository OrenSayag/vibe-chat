import { FC, useState } from 'react';
import { Box, Button, Flex, TextArea, TextField } from '@vibe/core';
import {
  MessageInputAndActionProps,
  WhatsappMessageType,
} from '@monday-whatsapp/shared-types';
import { Bot, SendHorizonal } from 'lucide-react';

export const MessageInputAndAction: FC<MessageInputAndActionProps> = ({
  className,
  onSend,
  disabled,
  type = 'text',
  style,
  templates,
  templatesOnly,
}) => {
  const [input, setInput] = useState<string>('');
  const InputComponent = type === 'text' ? TextField : TextArea;
  return (
    <>
      <Box style={style}>
        <Flex gap={'small'}>
          <TemplateButton onClick={() => {}} />
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
          <Box
            marginTop={type === 'text-area' ? 'small' : undefined}
            rounded={'small'}
          >
            <Flex justify={'start'}>
              <Button
                color={'positive'}
                size={'small'}
                disabled={!input || disabled}
                onClick={() => {
                  onSend({
                    type: WhatsappMessageType.TEXT,
                    text: {
                      body: input,
                    },
                  });
                  setInput('');
                }}
              >
                <SendHorizonal size={20} />
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

function TemplateButton({ onClick }: { onClick(): void }) {
  return (
    <Button onClick={onClick} size={'small'}>
      <Bot size={20} />
    </Button>
  );
}

function useTemplateList({
  template,
}: {
  template: MessageInputAndActionProps['templates'];
}) {}
