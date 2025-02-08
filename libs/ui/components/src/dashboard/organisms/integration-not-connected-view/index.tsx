import { IntegrationNotConnectedViewProps } from '@vibe-chat/shared-types';
import { Box, Button, Heading } from '@vibe/core';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const IntegrationNotConnectedView: FC<
  IntegrationNotConnectedViewProps
> = ({ onConnect }) => {
  const t = useTranslations('IntegrationNotConnectedView');
  return (
    <>
      <div style={{ padding: '2em' }}>
        <Box marginBottom={'large'}>
          <Heading type="h1">{t('title')}</Heading>
        </Box>
        <Button onClick={onConnect}>{t('connect')}</Button>
      </div>
    </>
  );
};
