'use client';

import { WhatsappConnectionViewProps } from 'libs/shared-types/src/dashboard/props.types';
import { FC } from 'react';
import { WhatsappIntegrationTemplate } from '.';
import { useWhatsappIntegrationTemplate } from '@vibe-chat/next-services';
interface Props {
  connectionViewInfo: WhatsappConnectionViewProps;
}

export const WhatsappIntegrationTemplateProvider: FC<Props> = ({
  connectionViewInfo,
}) => {
  const props = useWhatsappIntegrationTemplate({
    connectionViewInfo,
  });
  return (
    <>
      <WhatsappIntegrationTemplate {...props} />
    </>
  );
};
