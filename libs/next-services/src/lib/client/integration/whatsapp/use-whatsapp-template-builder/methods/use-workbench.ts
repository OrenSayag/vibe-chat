import {
  Locale,
  TemplateBuilderWorkbenchContentProps,
  WhatappTemplateBuilderWorkbenchProps,
  WhatsappContentForm,
  WhatsappTemplateCategory,
  WhatsappTemplateComponent,
  WhatsappTemplateComponentFormat,
  WhatsappTemplateComponentType,
} from '@vibe-chat/shared-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
}: Input): WhatappTemplateBuilderWorkbenchProps & {
  locale: Locale;
  formData: WhatsappContentForm;
} => {
  const [selectedFormat, setSelectedFormat] =
    useState<WhatsappTemplateComponentFormat>(
      WhatsappTemplateComponentFormat.TEXT
    );

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<WhatsappContentForm>({
    defaultValues: {
      header: {
        format: WhatsappTemplateComponentFormat.TEXT,
        text: {
          [selectedLocale]: '',
        },
        type: WhatsappTemplateComponentType.HEADER,
      },
      body: {
        text: {
          [selectedLocale]: '',
        },
        type: WhatsappTemplateComponentType.BODY,
      },
      footer: {
        text: {
          [selectedLocale]: '',
        },
        type: WhatsappTemplateComponentType.FOOTER,
      },
      buttons: {
        type: WhatsappTemplateComponentType.BUTTONS,
        buttons: [],
      },
    },
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

  useEffect(() => {
    console.log({
      selectedLocale,
    });
  }, [selectedLocale]);

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
        };
      })
      .filter(Boolean) as WhatsappTemplateComponent[],
    isReadOnly,
    locale: selectedLocale,
  };
};
