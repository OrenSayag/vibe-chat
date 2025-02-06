import { CSSProperties, FC, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@monday-whatsapp/next-services/server';
import { useParams } from 'next/navigation';
import {
  ListItem,
  Locale,
  localeOriginalNameMap,
  locales,
} from '@monday-whatsapp/shared-types';
import { Menu } from '../menu';
import { Dropdown } from '@vibe/core';

type Props = {
  style?: CSSProperties;
  type?: 'menu' | 'dropdown';
};

export const AppLocaleMenu: FC<Props> = ({ style = {}, type = 'menu' }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const onLocaleChange = (l: Locale) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: l }
    );
  };
  const dropdownOptions: ListItem[] = locales.map((l) => ({
    label: localeOriginalNameMap[l],
    value: l,
  }));
  const selectedOption = useMemo(
    () => dropdownOptions.find((l) => l.value === locale),
    [locale]
  );
  return (
    <>
      {type === 'menu' && (
        <Menu
          items={[
            {
              selected: locale === Locale.ENGLISH,
              onClick: () => onLocaleChange(Locale.ENGLISH),
              label: (
                <>
                  <span>English</span>
                </>
              ),
            },
            {
              selected: locale === Locale.HEBREW,
              onClick: () => onLocaleChange(Locale.HEBREW),
              label: (
                <>
                  <span>Hebrew</span>
                </>
              ),
            },
          ]}
        />
      )}
      {type === 'dropdown' && (
        <Dropdown
          clearable={false}
          value={selectedOption}
          searchable={false}
          options={dropdownOptions}
          onChange={(l) => onLocaleChange(l.value)}
        />
      )}
    </>
  );
};
