import { Locale, locales as allLocales } from '@vibe-chat/shared-types';
import { Box, Dropdown, Heading, List, ListItem } from '@vibe/core';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';

type Props = {
  style?: CSSProperties;
  onChange: (locale: Locale) => void;
  selectedLocale: Locale;
  locales: Locale[];
  onCreateLocale: (locale: Locale) => void;
  onRemoveLocale: (locale: Locale) => void;
  readOnly?: boolean;
};

export const Locales: FC<Props> = ({
  style = {},
  onChange,
  selectedLocale,
  locales,
  onCreateLocale,
  onRemoveLocale,
  readOnly,
}) => {
  const t = useTranslations('Locale');
  const addableLocales = allLocales
    .filter((locale) => !locales.includes(locale))
    .map((locale) => ({
      label: t(locale),
      value: locale,
    }));

  return (
    <>
      <div
        style={{
          ...style,
          padding: '1em',
        }}
      >
        <Box marginBottom="small">
          <Heading type="h3">Language</Heading>
        </Box>
        <List>
          {locales.map((locale) => (
            <LocaleOption
              key={locale}
              locale={locale}
              selectedLocale={selectedLocale}
              onChange={readOnly ? () => {} : onChange}
              onRemoveLocale={
                !readOnly && locales.length > 1 ? onRemoveLocale : undefined
              }
            />
          ))}
        </List>
        {addableLocales.length > 0 && !readOnly && (
          <div style={{ marginTop: '.4em' }}>
            <Dropdown
              clearable={false}
              value={selectedLocale}
              isOptionSelected={(option) =>
                addableLocales.includes(option.value)
              }
              searchable={false}
              placeholder="Add Language"
              options={addableLocales}
              onChange={(selected) => onCreateLocale(selected.value)}
            />
          </div>
        )}
      </div>
    </>
  );
};

function LocaleOption({
  locale,
  selectedLocale,
  onChange,
  onRemoveLocale,
}: {
  locale: Locale;
  selectedLocale: Locale;
  onChange: (locale: string) => void;
  onRemoveLocale?: (locale: Locale) => void;
}) {
  const t = useTranslations('Locale');
  const ref = useRef<HTMLLIElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mouseenter', handleMouseEnter);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mouseenter', handleMouseEnter);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <ListItem
      key={locale}
      onClick={() => onChange(locale)}
      selected={selectedLocale === locale}
      ref={ref}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        {t(locale)}
        {isHovered && onRemoveLocale && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveLocale(locale);
            }}
            style={{
              position: 'absolute',
              right: '1em',
              display: 'block',
            }}
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </ListItem>
  );
}
