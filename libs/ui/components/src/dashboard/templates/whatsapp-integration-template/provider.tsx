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
}

export const WhatsappIntegrationTemplateProvider: FC<Props> = ({
  connectionViewInfo,
  templates,
  error,
}) => {
  const props = useWhatsappIntegrationTemplate({
    connectionViewInfo,
    templates,
  });
  console.log(props);
  if (error) {
    return <ErrorView message={error} />;
  }
  return (
    <>
      <WhatsappIntegrationTemplate {...props} />
    </>
  );
};
