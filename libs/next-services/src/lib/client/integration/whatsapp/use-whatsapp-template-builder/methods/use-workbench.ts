import {
  Locale,
  TemplateBuilderWorkbenchContentProps,
  WhatappTemplateBuilderWorkbenchProps,
  WhatsappContentForm,
  WhatsappTemplate,
  WhatsappTemplateCategory,
  WhatsappTemplateComponent,
  WhatsappTemplateComponentFormat,
  WhatsappTemplateComponentType,
} from '@vibe-chat/shared-types';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

type Input = {
  categories: WhatappTemplateBuilderWorkbenchProps['categories'];
  onCategoryChange: (category: WhatsappTemplateCategory) => void;
  category: WhatsappTemplateCategory;
  templateName: string;
  onChangeTemplateName: (name: string) => void;
  locales?: Locale[];
  onCreateLocale: (locale: Locale) => void;
  onSelectLocale: (locale: Locale) => void;
  onRemoveLocale: (locale: Locale) => void;
  selectedLocale: Locale;
  isReadOnly?: boolean;
  templateByLocale?: WhatsappTemplate[];
};

export const useWorkbench = ({
  categories,
  onCategoryChange,
  category,
  templateName,
  onChangeTemplateName,
  locales,
  onCreateLocale,
  onSelectLocale,
  onRemoveLocale,
  selectedLocale,
  isReadOnly,
  templateByLocale,
}: Input): WhatappTemplateBuilderWorkbenchProps & {
  locale: Locale;
  formData: WhatsappContentForm;
} => {
  const [selectedFormat, setSelectedFormat] =
    useState<WhatsappTemplateComponentFormat>(
      WhatsappTemplateComponentFormat.TEXT
    );

  const {
    watch,
    setValue,
    formState: { errors },
  } = useForm<WhatsappContentForm>({
    defaultValues: defaultValues(templateByLocale ?? []),
  });

  const formData = watch();

  const handleFormatChange = useCallback(
    (format: WhatsappTemplateComponentFormat) => {
      setSelectedFormat(format);
    },
    [setValue]
  );

  const handleHeaderChange = useCallback(
    (value: string) => {
      console.log({
        selectedLocale,
        value,
      });
      if (selectedFormat === WhatsappTemplateComponentFormat.TEXT) {
        setValue(`header.text.${selectedLocale}`, value);
      }
    },
    [selectedFormat, selectedLocale]
  );

  const handleBodyChange = useCallback(
    (value: string) => {
      setValue(`body.text.${selectedLocale}`, value);
    },
    [setValue, selectedLocale]
  );

  const handleFooterChange = useCallback(
    (value: string) => {
      setValue(`footer.text.${selectedLocale}`, value);
    },
    [selectedLocale]
  );

  const handleButtonsChange = useCallback(
    (value: WhatsappContentForm['buttons']) => {
      setValue('buttons', value);
    },
    []
  );

  const templateHeadComponentValue = useMemo<
    TemplateBuilderWorkbenchContentProps['headProps']['value']
  >(() => {
    switch (formData.header?.format) {
      case WhatsappTemplateComponentFormat.TEXT:
        return {
          type: selectedFormat,
          value: formData.header?.text[selectedLocale] || '',
          onChange: handleHeaderChange,
        };
      case WhatsappTemplateComponentFormat.IMAGE:
      case WhatsappTemplateComponentFormat.DOCUMENT:
        return {
          type: selectedFormat,
          value: 'not implemented',
          onChange: handleHeaderChange,
        };
      default:
        return {
          type: selectedFormat,
          value: '',
          onChange: handleHeaderChange,
        };
    }
  }, [
    selectedFormat,
    JSON.stringify(formData.header ?? {}),
    handleHeaderChange,
  ]);

  return {
    categories,
    localesProps: {
      selectedLocale,
      locales: locales ?? [],
      onChange: onSelectLocale,
      onCreateLocale,
      onRemoveLocale,
      readOnly: isReadOnly,
    },
    contentProps: {
      headProps: {
        selectedFormat,
        onFormatChange: handleFormatChange,
        value: templateHeadComponentValue,
        readOnly: isReadOnly,
      },
      bodyProps: {
        value: formData.body.text[selectedLocale] || '',
        onChange: handleBodyChange,
        readOnly: isReadOnly,
      },
      footerProps: {
        value: formData.footer?.text[selectedLocale] || '',
        onChange: handleFooterChange,
        readOnly: isReadOnly,
      },
      buttonsProps: {
        value:
          formData.buttons?.buttons.map((b) => ({
            ...b,
            text: b.text[selectedLocale],
          })) || [],
        onChange: (buttons) => {
          handleButtonsChange({
            type: WhatsappTemplateComponentType.BUTTONS,
            buttons: buttons.map((b, index) => ({
              ...b,
              text: {
                ...formData.buttons?.buttons[index]?.text,
                [selectedLocale]: b.text,
              },
            })),
          });
        },
        readOnly: isReadOnly,
      },
    },
    headerProps: {
      templateName,
      selectedCategory: category,
      setSelectedCategory: onCategoryChange,
      onNameChange: onChangeTemplateName,
      errors,
      readOnly: isReadOnly,
    },
    formData,
    previewData: Object.values(formData)
      .map((component) => {
        return {
          ...component,
          text:
            (component as WhatsappContentForm['body'])?.text?.[
              selectedLocale
            ] ?? '',
          buttons: (component as WhatsappContentForm['buttons'])?.buttons?.map(
            (b) => ({
              ...b,
              text: b.text[selectedLocale],
            })
          ),
        };
      })
      .filter(Boolean) as WhatsappTemplateComponent[],
    isReadOnly,
    locale: selectedLocale,
  };
};

function defaultValues(
  templateByLocale: WhatsappTemplate[]
): WhatsappContentForm {
  const existingHeaders = templateByLocale.map((t) => ({
    header: t.components.find(
      (c) => c.type === WhatsappTemplateComponentType.HEADER
    ),
    locale: t.language,
  }));
  const existingBodies = templateByLocale.map((t) => ({
    body: t.components.find(
      (c) => c.type === WhatsappTemplateComponentType.BODY
    ),
    locale: t.language,
  }));
  const existingFooters = templateByLocale.map((t) => ({
    footer: t.components.find(
      (c) => c.type === WhatsappTemplateComponentType.FOOTER
    ),
    locale: t.language,
  }));
  const existingButtons = templateByLocale.map((t) => ({
    buttons: t.components.find(
      (c) => c.type === WhatsappTemplateComponentType.BUTTONS
    ),
    locale: t.language,
  }));

  textButtonsLocales();

  return {
    header: existingHeaders[0]
      ? ({
          ...existingHeaders[0].header,
          text: textHeaderLocales(),
        } as WhatsappContentForm['header'])
      : {
          type: WhatsappTemplateComponentType.HEADER,
          format: WhatsappTemplateComponentFormat.TEXT,
          text: {},
        },
    body: existingBodies[0]
      ? ({
          ...existingBodies[0].body,
          text: textBodyLocales(),
        } as WhatsappContentForm['body'])
      : {
          type: WhatsappTemplateComponentType.BODY,
          text: {},
        },
    footer: existingFooters[0]
      ? ({
          ...existingFooters[0].footer,
          text: textFooterLocales(),
        } as WhatsappContentForm['footer'])
      : {
          type: WhatsappTemplateComponentType.FOOTER,
          text: {},
        },
    buttons: existingButtons[0]
      ? {
          type: WhatsappTemplateComponentType.BUTTONS,
          buttons:
            existingButtons[0].buttons?.buttons.map((btn, index) => {
              return {
                ...btn,
                text: textButtonsLocales()[index],
              };
            }) ?? [],
        }
      : {
          type: WhatsappTemplateComponentType.BUTTONS,
          buttons: [],
        },
  };

  function textHeaderLocales(): Record<Locale, string> {
    return existingHeaders.reduce((acc, header) => {
      if (header?.header?.format === WhatsappTemplateComponentFormat.TEXT) {
        acc[header.locale as Locale] = header.header.text;
      }
      return acc;
    }, {} as Record<Locale, string>);
  }

  function textBodyLocales(): Record<Locale, string> {
    return existingBodies.reduce((acc, body) => {
      if (body?.body) {
        acc[body.locale as Locale] = body.body.text;
      }
      return acc;
    }, {} as Record<Locale, string>);
  }

  function textFooterLocales(): Record<Locale, string> {
    return existingFooters.reduce((acc, footer) => {
      if (footer?.footer) {
        acc[footer.locale as Locale] = footer.footer.text;
      }
      return acc;
    }, {} as Record<Locale, string>);
  }

  function textButtonsLocales(): Record<Locale, string>[] {
    const firstButton = existingButtons[0];
    if (!firstButton) {
      return [];
    }
    const amountOfButtons = firstButton.buttons?.buttons.length;
    if (!amountOfButtons) {
      return [];
    }
    const acc: Record<Locale, string>[] = [];
    for (let i = 0; i < amountOfButtons; i++) {
      const val: Partial<Record<Locale, string>> = {};
      for (const item of existingButtons) {
        val[item.locale as Locale] = item.buttons!.buttons[i].text;
      }
      acc.push(val as Record<Locale, string>);
    }
    return acc;
  }
}
