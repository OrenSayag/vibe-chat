import { FC } from 'react';
import { cn, customFormatDate } from '@monday-whatsapp/ui-utils';
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
        className={cn('w-fit px-4 py-2 uppercase text-sm', className)}
        backgroundColor={'allgreyBackgroundColor'}
      >
        {customFormatDate(new Date(timestamp * 1_000), 'day')}
      </Box>
    </>
  );
};
