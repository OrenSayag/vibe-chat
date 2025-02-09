import { Box, Heading } from '@vibe/core';
import { X } from 'lucide-react';
import { CSSProperties, FC } from 'react';

type Props = {
  style?: CSSProperties;
  message?: string;
};

export const ErrorView: FC<Props> = ({
  style = {},
  message = 'An Error has Occurred',
}) => {
  return (
    <Box
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <X size={48} color="red" />
      <Heading type="h1" style={{ marginTop: '1em' }}>
        {message}
      </Heading>
    </Box>
  );
};
