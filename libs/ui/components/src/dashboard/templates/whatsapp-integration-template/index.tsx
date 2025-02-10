import { WhatsappIntegrationTemplateProps } from '@vibe-chat/shared-types';
import { FC } from 'react';
import { WhatsappConnectionView } from '../../organisms/whatsapp-connection-view';
import { WhatsappTemplatesView } from '../../organisms/whatsapp-templates-view';
import { useParams } from 'next/navigation';

type Props = WhatsappIntegrationTemplateProps;

export const WhatsappIntegrationTemplate: FC<Props> = ({
  connectionViewProps,
  templatesViewProps,
}) => {
  const { slug } = useParams();
  const currentView = slug && slug.length > 0 ? slug[0] : 'connection';

  return (
    <div>
      {currentView === 'connection' && (
        <WhatsappConnectionView {...connectionViewProps} />
      )}
      {currentView === 'templates' && (
        <WhatsappTemplatesView {...templatesViewProps} />
      )}
    </div>
  );
};
