'use client';

import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Text } from '@vibe/core';

interface Props {
  className?: string;
}

export const BoardTemplate: FC<Props> = ({ className }) => {
  return (
    <>
      <Box className={cn(className)}>
        <Text>BoardTemplate works!</Text>
      </Box>
    </>
  );
};
