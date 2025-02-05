import { FC } from 'react';
import { Box, Text } from '@vibe/core';

interface Props {
  className?: string;
}

export const ChatSessionPlaceholder: FC<Props> = ({ className }) => {
  return (
    <>
      <Box
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Vibe Chat</Text>
      </Box>
    </>
  );
};
