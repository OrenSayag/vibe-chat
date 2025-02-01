import { FC, useMemo } from 'react';
import {
  ListItem,
  WhatsappMessageTemplateSelectorProps,
  WhatsappTemplate,
} from '@monday-whatsapp/shared-types';
import { Dropdown } from '@vibe/core';

export const WhatsappMessageTemplateSelector: FC<
  WhatsappMessageTemplateSelectorProps
> = ({
  className,
  style,
  templates,
  loading,
  error,
  selectedTemplateName,
  onSelect,
}) => {
  const options = useMemo<ListItem<WhatsappTemplate>[]>(
    () =>
      templates.map((t) => ({
        label: t.name,
        value: t,
      })),
    [templates]
  );
  const placeholder = useMemo(() => {
    if (error) return 'Error loading templates';
    if (loading) return 'Loading templates...';
    return 'Select a message template';
  }, [error, loading]);

  return (
    <>
      <div style={style}>
        <Dropdown
          size={'small'}
          menuPlacement={'auto'}
          defaultValue={[
            options.find((o) => o.value.name == selectedTemplateName),
          ].filter(Boolean)}
          isLoading={loading}
          disabled={loading || error}
          placeholder={placeholder}
          options={options}
          isOptionSelected={(o) => o.value.name == selectedTemplateName}
          onOptionSelect={(o) => onSelect(o.value)}
        />
      </div>
    </>
  );
};
