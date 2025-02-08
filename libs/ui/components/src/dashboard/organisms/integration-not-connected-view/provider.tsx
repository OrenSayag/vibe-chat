'use client';

import { IntegrationType } from '@vibe-chat/shared-types';
import { FC } from 'react';
import { IntegrationNotConnectedView } from '.';

type Props = {
  integrationType: IntegrationType;
};

export const IntegrationNotConnectedViewProvider: FC<Props> = ({
  integrationType,
}) => {
  const { onConnect } = useIntegrationNotConnectedView({ integrationType });
  return (
    <>
      <IntegrationNotConnectedView onConnect={onConnect} />
    </>
  );
};

function useIntegrationNotConnectedView({
  integrationType,
}: {
  integrationType: IntegrationType;
}) {
  const onConnectMap: Record<IntegrationType, () => void> = {
    [IntegrationType.WHATSAPP]: () => {
      alert('connect with whatsapp');
    },
    [IntegrationType.INSTAGRAM]: () => {
      console.log('not implemented');
    },
    [IntegrationType.TELEGRAM]: () => {
      console.log('not implemented');
    },
    [IntegrationType.MESSENGER]: () => {
      console.log('not implemented');
    },
  };

  return { onConnect: onConnectMap[integrationType] };
}
