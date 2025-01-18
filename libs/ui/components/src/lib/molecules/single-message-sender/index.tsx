import { FC, useState } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Button, Flex, TextArea } from '@vibe/core';

interface Props {
  className?: string;
  onSend(txt: string): void;
}

export const SingleMessageSender: FC<Props> = ({ className, onSend }) => {
  const [input, setInput] = useState<string>('');
  return (
    <>
      <Box className={cn(className)} marginTop={'medium'}>
        <TextArea
          placeholder={'Type a message...'}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Box marginTop={'small'}>
          <Flex justify={'start'}>
            <Button
              color={'positive'}
              disabled={!input}
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
