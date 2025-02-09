import { Tab, Divider } from '@vibe/core';
import { WhatsappIntegrationTemplateProps } from '@vibe-chat/shared-types';
import { FC, useState } from 'react';
import { WhatsappConnectionView } from '../../organisms/whatsapp-connection-view';
import { WhatsappTemplatesView } from '../../organisms/whatsapp-templates-view';
import { useTranslations } from 'next-intl';
import { usePathname } from '@vibe-chat/next-services/server';
import { intagrationSubSlugs, IntegrationType } from '@vibe-chat/shared-types';
import { useParams, useRouter } from 'next/navigation';

type Props = WhatsappIntegrationTemplateProps;

const integrationKeys = Object.keys(
  intagrationSubSlugs[IntegrationType.WHATSAPP] || {}
);

const tabLabels: Record<(typeof integrationKeys)[number], string> = {
  connection: 'Connection',
  templates: 'Templates',
};

const tabs = integrationKeys.map((key) => ({
  label: tabLabels[key] || key,
  value: key,
}));

type Tab = (typeof tabs)[number]['value'];

export const WhatsappIntegrationTemplate: FC<Props> = ({
  connectionViewProps,
  templatesViewProps,
}) => {
  const { slug } = useParams();
  const pathname = usePathname();
  const initialTab = slug && slug.length > 0 ? slug[0] : tabs[0].value;
  const [selectedTab, setSelectedTab] = useState<Tab>(initialTab);

  const t = useTranslations('WhatsappIntegrationTemplate');
  const router = useRouter();

  const handleTabClick = (tabValue: string) => {
    setSelectedTab(tabValue);
    router.replace(pathname.replace(/\/[^/]+$/, `/${tabValue}`));
  };

  return (
    <>
      <div>
        <div>
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              active={tab.value === selectedTab}
            >
              {t(tab.label)}
            </Tab>
          ))}
        </div>
        <Divider withoutMargin />
        <div>
          {selectedTab === 'connection' && (
            <WhatsappConnectionView {...connectionViewProps} />
          )}
          {selectedTab === 'templates' && (
            <WhatsappTemplatesView {...templatesViewProps} />
          )}
        </div>
      </div>
    </>
  );
};
