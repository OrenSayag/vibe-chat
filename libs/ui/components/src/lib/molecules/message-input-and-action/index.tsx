import { FC, useState } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Button, Flex, TextField, TextArea } from '@vibe/core';
import { MessageInputAndActionProps } from '@monday-whatsapp/shared-types';

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
        className={cn(type === 'text' && 'flex gap-1 items-center', className)}
        marginTop={'medium'}
      >
        <InputComponent
          className={'h-full'}
          placeholder={'Type a message...'}
          onChange={(e) => setInput(type === 'text' ? e : e.target.value)}
          value={input}
        />
        <Box marginTop={type === 'text-area' ? 'small' : undefined}>
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
              Send
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};
