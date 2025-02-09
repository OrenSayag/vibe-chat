import { Tab, Divider } from '@vibe/core';
import { WhatsappIntegrationTemplateProps } from 'libs/shared-types/src/lib/whatsapp/whatsapp-component-props.types';
import { FC, useState } from 'react';
import { WhatsappConnectionView } from '../../organisms/whatsapp-connection-view';
import { WhatsappTemplatesView } from '../../organisms/whatsapp-templates-view';
import { useTranslations } from 'next-intl';

type Props = WhatsappIntegrationTemplateProps;

const tabs: {
  label: string;
  value: string;
}[] = [
  {
    label: 'Connection',
    value: 'Connection',
  },
  {
    label: 'Templates',
    value: 'Templates',
  },
] as const;

type Tab = (typeof tabs)[number]['value'];

export const WhatsappIntegrationTemplate: FC<Props> = ({
  connectionViewProps,
}) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0].value);
  const t = useTranslations('WhatsappIntegrationTemplate');
  return (
    <>
      <div>
        <div>
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              onClick={() => setSelectedTab(tab.value)}
              active={tab.value === selectedTab}
            >
              {t(tab.label)}
            </Tab>
          ))}
        </div>
        <Divider withoutMargin />
        <div>
          {selectedTab === 'Connection' && (
            <WhatsappConnectionView {...connectionViewProps} />
          )}
          {selectedTab === 'Templates' && <WhatsappTemplatesView />}
        </div>
      </div>
    </>
  );
};
