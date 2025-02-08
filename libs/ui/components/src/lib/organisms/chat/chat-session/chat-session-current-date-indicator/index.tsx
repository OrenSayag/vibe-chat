import { FC } from 'react';
import { customFormatDate } from '@vibe-chat/ui-utils';
import { Box } from '@vibe/core';

interface Props {
  className?: string;
  timestamp: number;
}

export const ChatSessionCurrentDateIndicator: FC<Props> = ({
  className,
  timestamp,
}) => {
  return (
    <>
      <Box
        style={{
          width: 'fit-content',
          textTransform: 'uppercase',
          fontSize: 'small',
          margin: '.6em auto',
          padding: '.4em .8em',
        }}
        backgroundColor={'allgreyBackgroundColor'}
        rounded={'small'}
      >
        {customFormatDate(new Date(timestamp * 1_000), 'day')}
      </Box>
    </>
  );
};
