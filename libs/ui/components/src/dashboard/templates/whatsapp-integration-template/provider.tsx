'use client';

import { FC } from 'react';
import { WhatsappIntegrationTemplate } from '.';
import { useWhatsappIntegrationTemplate } from '@vibe-chat/next-services';
import {
  WhatsappTemplate,
  WhatsappConnectionViewProps,
} from '@vibe-chat/shared-types';
import { ErrorView } from '../../organisms/error-view';

interface Props {
  connectionViewInfo: WhatsappConnectionViewProps;
  templates: WhatsappTemplate[];
  error?: string;
  type: 'connection' | 'templates';
}

export const WhatsappIntegrationTemplateProvider: FC<Props> = ({
  connectionViewInfo,
  templates,
  error,
  type,
}) => {
  const props = useWhatsappIntegrationTemplate({
    connectionViewInfo,
    templates,
  });

  if (error) {
    return <ErrorView message={error} />;
  }

  return (
    <>
      <WhatsappIntegrationTemplate {...props} type={type} />
    </>
  );
};
