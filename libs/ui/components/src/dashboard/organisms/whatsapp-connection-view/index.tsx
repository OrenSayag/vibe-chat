'use client';

import { WhatsappConnectionViewProps } from 'libs/shared-types/src/dashboard/props.types';
import { Box, Text } from '@vibe/core';
import { CSSProperties, FC } from 'react';
import { useTranslations } from 'next-intl';
type Props = {
  style?: CSSProperties;
} & WhatsappConnectionViewProps;

export const WhatsappConnectionView: FC<Props> = ({
  style = {},
  whatsappNumber,
  whatsappBusinessAccountId,
  displayName,
  image,
}) => {
  return (
    <>
      <Box
        style={{
          ...style,
        }}
        padding="medium"
      >
        <ConnectionInfo
          whatsappNumber={whatsappNumber}
          whatsappBusinessAccountId={whatsappBusinessAccountId}
          displayName={displayName}
          image={image}
        />
      </Box>
    </>
  );
};
function ConnectionInfo({
  whatsappNumber,
  whatsappBusinessAccountId,
  displayName,
  image,
}: {
  whatsappNumber: string;
  whatsappBusinessAccountId: string;
  displayName: string;
  image?: string;
}) {
  const t = useTranslations('WhatsappConnectionView');
  return (
    <>
      <Box style={{ display: 'grid', gap: '0.5em' }}>
        <Box style={{ display: 'grid', gap: '0.25em' }}>
          <Text>{t('WhatsAppNumber')}:</Text>
          <Text>{whatsappNumber}</Text>
        </Box>
        <Box style={{ display: 'grid', gap: '0.25em' }}>
          <Text>{t('BusinessAccountId')}:</Text>
          <Text>{whatsappBusinessAccountId}</Text>
        </Box>
        <Box style={{ display: 'grid', gap: '0.25em' }}>
          <Text>{t('DisplayName')}:</Text>
          <Text>{displayName}</Text>
        </Box>
        {image && (
          <Box style={{ display: 'grid', gap: '0.25em' }}>
            <Text>{t('ProfileImage')}:</Text>
            <img src={image} alt={displayName} />
          </Box>
        )}
      </Box>
    </>
  );
}
