'use client';

import { usePathname, useRouter } from '@vibe-chat/next-services/server';
import { intagrationSubSlugs, IntegrationType } from '@vibe-chat/shared-types';
import { Divider, Tab } from '@vibe/core';
import { useTranslations } from 'next-intl';

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
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('WhatsappIntegrationTemplate');

  const isTemplateEditor = pathname.includes('/template/');

  return (
    <div>
      {!isTemplateEditor && (
        <>
          <div>
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                onClick={() =>
                  router.replace(
                    `/dashboard/${
                      pathname.split('/')[2]
                    }/integration/whatsapp/${tab.value}`
                  )
                }
                active={pathname.endsWith(`/whatsapp/${tab.value}`)}
              >
                {t(tab.label)}
              </Tab>
            ))}
          </div>
          <Divider withoutMargin />
        </>
      )}
      <div>{children}</div>
    </div>
  );
}
