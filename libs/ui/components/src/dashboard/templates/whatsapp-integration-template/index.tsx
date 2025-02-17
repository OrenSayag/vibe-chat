'use client';

import { WhatsappIntegrationTemplateProps } from '@vibe-chat/shared-types';
import { FC } from 'react';
import { WhatsappConnectionView } from '../../organisms/whatsapp-connection-view';
import { WhatsappTemplatesView } from '../../organisms/whatsapp-templates-view';

type Props = WhatsappIntegrationTemplateProps & {
  type: 'connection' | 'templates';
};

export const WhatsappIntegrationTemplate: FC<Props> = ({
  connectionViewProps,
  templatesViewProps,
  type,
}) => {
  return (
    <div>
      {type === 'connection' && (
        <WhatsappConnectionView {...connectionViewProps} />
      )}
      {type === 'templates' && (
        <WhatsappTemplatesView {...templatesViewProps} />
      )}
    </div>
  );
};
