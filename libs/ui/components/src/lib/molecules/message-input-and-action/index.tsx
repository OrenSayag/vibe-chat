import { FC, useState } from 'react';
import { Box, Button, Flex, TextArea, TextField } from '@vibe/core';
import { MessageInputAndActionProps } from '@monday-whatsapp/shared-types';
import { SendHorizonal } from 'lucide-react';

export const MessageInputAndAction: FC<MessageInputAndActionProps> = ({
  className,
  onSend,
  disabled,
  type = 'text',
}) => {
  const [input, setInput] = useState<string>('');
  const InputComponent = type === 'text' ? TextField : TextArea;
  return (
    <>
      <Box
        style={{
          padding: '1em 1em',
        }}
      >
        <Flex gap={'small'}>
          <InputComponent
            className={'h-full'}
            placeholder={'Type a message...'}
            onChange={(e) => setInput(type === 'text' ? e : e.target.value)}
            value={input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSend(input);
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
                  onSend(input);
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
