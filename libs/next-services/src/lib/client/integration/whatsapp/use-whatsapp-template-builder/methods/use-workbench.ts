import {
  Locale,
  TemplateBuilderWorkbenchContentProps,
  WhatappTemplateBuilderWorkbenchProps,
  WhatsappContentForm,
  WhatsappTemplate,
  WhatsappTemplateCategory,
  WhatsappTemplateComponentFormat,
  WhatsappTemplateComponentType,
} from '@vibe-chat/shared-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

type Input = {
  template?: WhatsappTemplate;
  categories: WhatappTemplateBuilderWorkbenchProps['categories'];
  onNameChange: (name: string) => void;
  onCategoryChange: (category: WhatsappTemplateCategory) => void;
};

export const useWorkbench = ({
  template,
  categories,
  onNameChange,
  onCategoryChange,
}: Input): WhatappTemplateBuilderWorkbenchProps => {
  const [selectedLocale, setSelectedLocale] = useState<Locale>(Locale.ENGLISH);
  const [selectedFormat, setSelectedFormat] =
    useState<WhatsappTemplateComponentFormat>(
      WhatsappTemplateComponentFormat.TEXT
    );

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WhatsappContentForm>({
    defaultValues: {
      header: {
        format: WhatsappTemplateComponentFormat.TEXT,
        text: '',
        type: WhatsappTemplateComponentType.HEADER,
      },
      body: {
        text: '',
        type: WhatsappTemplateComponentType.BODY,
      },
      footer: {
        text: '',
        type: WhatsappTemplateComponentType.FOOTER,
      },
      buttons: {
        type: WhatsappTemplateComponentType.BUTTONS,
        buttons: [],
      },
    },
  });

  const formData = watch();
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleFormatChange = useCallback(
    (format: WhatsappTemplateComponentFormat) => {
      setSelectedFormat(format);
    },
    [setValue]
  );

  const handleHeaderChange = useCallback(
    (value: string) => {
      if (selectedFormat === WhatsappTemplateComponentFormat.TEXT) {
        setValue('header.text', value);
      }
    },
    [selectedFormat, setValue]
  );

  const handleBodyChange = useCallback(
    (value: string) => {
      setValue('body.text', value);
    },
    [setValue]
  );

  const handleFooterChange = useCallback(
    (value: string) => {
      setValue('footer.text', value);
    },
    [setValue]
  );

  const handleButtonsChange = useCallback(
    (value: WhatsappContentForm['buttons']) => {
      setValue('buttons', value);
    },
    [setValue]
  );

  const templateHeadComponentValue = useMemo<
    TemplateBuilderWorkbenchContentProps['headProps']['value']
  >(() => {
    switch (formData.header?.format) {
      case WhatsappTemplateComponentFormat.TEXT:
        return {
          type: selectedFormat,
          value: formData.header?.text || '',
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
  }, [selectedFormat, JSON.stringify(formData.header ?? {})]);

  return {
    categories,
    localesProps: {
      selectedLocale,
      locales: Object.values(Locale),
      onChange: setSelectedLocale,
      onCreateLocale: () => {},
    },
    contentProps: {
      headProps: {
        selectedFormat,
        onFormatChange: handleFormatChange,
        value: templateHeadComponentValue,
      },
      bodyProps: {
        value: formData.body.text,
        onChange: handleBodyChange,
      },
      footerProps: {
        value: formData.footer?.text || '',
        onChange: handleFooterChange,
      },
      buttonsProps: {
        value: formData.buttons?.buttons || [],
        onChange: (buttons) => {
          handleButtonsChange({
            type: WhatsappTemplateComponentType.BUTTONS,
            buttons,
          });
        },
      },
    },
    headerProps: {
      templateName: template?.name ?? '',
      selectedCategory:
        template?.category ?? WhatsappTemplateCategory.TRANSACTIONAL,
      setSelectedCategory: onCategoryChange,
      onNameChange,
      errors,
    },
    formData,
  };
};
