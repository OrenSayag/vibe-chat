import { FC } from 'react';
import { cn } from '@vibe-chat/ui-utils';
import { Box, Text } from '@vibe/core';

interface Props {
  className?: string;
}

export const UnConfiguredAccountTemplate: FC<Props> = ({ className }) => {
  return (
    <>
      <Box className={cn(className)}>
        <Text>You account is not configured to use the Whatsapp service.</Text>
        <Text>
          <a className={'underline'} target={'_blank'}>
            some link for setting up
          </a>
        </Text>
      </Box>
    </>
  );
};
