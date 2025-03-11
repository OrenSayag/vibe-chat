import {
  Locale,
  WhatsappTemplate,
  defaultLocale,
  isLocale,
} from '@vibe-chat/shared-types';
import {
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

type Input = {
  templateByLocale?: WhatsappTemplate[];
};

type Output = {
  templateLocale: Locale;
  selectLocale: (l: Locale) => void;
  locales: Locale[];
  setLocales: (locales: Locale[]) => void;
};

const templateLocaleQueryKey = 'templateLocale';

export const useTemplateLocales = ({ templateByLocale }: Input): Output => {
  const query = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [locales, setLocales] = useState<Locale[]>([]);

  const selectLocale = useCallback(
    (locale: Locale) => {
      const currentQuery = new URLSearchParams(query);
      currentQuery.set(templateLocaleQueryKey, locale);
      router.replace(`${pathname}?${currentQuery.toString()}`);
    },
    [query, pathname, router]
  );

  const selectedLocale = useMemo<Locale>(() => {
    const value = query.get(templateLocaleQueryKey);
    if (!isLocale(value)) {
      selectLocale(defaultLocale);
      return defaultLocale;
    }
    return value;
  }, [query, selectLocale]);

  return {
    templateLocale: selectedLocale ?? '',
    selectLocale,
    locales,
    setLocales,
  };
};
