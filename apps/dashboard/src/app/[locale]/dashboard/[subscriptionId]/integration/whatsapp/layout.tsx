'use client';

import { Tab, Divider } from '@vibe/core';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { intagrationSubSlugs, IntegrationType } from '@vibe-chat/shared-types';

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

export default function WhatsappLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('WhatsappIntegrationTemplate');

  const currentTab = pathname.split('/').pop();

  const handleTabClick = (tabValue: string) => {
    router.replace(pathname.replace(/\/[^/]+$/, `/${tabValue}`));
  };

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            active={tab.value === currentTab}
          >
            {t(tab.label)}
          </Tab>
        ))}
      </div>
      <Divider withoutMargin />
      <div>{children}</div>
    </div>
  );
}
