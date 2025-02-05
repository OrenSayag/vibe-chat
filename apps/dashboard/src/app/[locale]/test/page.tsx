'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Text } from '@vibe/core';

export default function TestPage() {
  const locale = useLocale();
  const t = useTranslations('HomePage');

  return (
    <div>
      <Text>{locale}</Text>
      <Text>{t('title')}</Text>
    </div>
  );
}
