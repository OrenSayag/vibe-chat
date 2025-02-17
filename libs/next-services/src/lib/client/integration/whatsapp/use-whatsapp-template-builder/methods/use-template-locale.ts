import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Input = {
  templateByLocale?: WhatsappTemplate[];
};

type Output = {
  template?: WhatsappTemplate;
  templateLocale: string;
};

const templateLocaleQueryKey = 'templateLocale';

export const useTemplateLocale = ({ templateByLocale }: Input): Output => {
  const query = useSearchParams();

  const selectedLocale = useMemo(
    () => query.get(templateLocaleQueryKey),
    [query]
  );

  const template = useMemo(() => {
    if (!selectedLocale) {
      return templateByLocale?.[0];
    }
    return templateByLocale?.find(
      (t) => t.language.split('_')?.[0] === selectedLocale
    );
  }, [templateByLocale, selectedLocale]);

  return { template, templateLocale: selectedLocale ?? '' };
};
