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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

type Input = {
  template?: WhatsappTemplate;
  categories: WhatappTemplateBuilderWorkbenchProps['categories'];
  onCategoryChange: (category: WhatsappTemplateCategory) => void;
  category: WhatsappTemplateCategory;
  templateName: string;
  onChangeTemplateName: (name: string) => void;
};

export const useWorkbench = ({
  template,
  categories,
  onCategoryChange,
  category,
  templateName,
  onChangeTemplateName,
}: Input): WhatappTemplateBuilderWorkbenchProps & {
  locale: Locale;
} => {
  const query = useSearchParams();
  const selectedLocale = useMemo<Locale>(
    () => (query.get('templateLocale') as Locale) ?? Locale.ENGLISH,
    [query]
  );
  const { replace } = useRouter();
  const pathname = usePathname();
  const onChangeLocale = useCallback(
    (locale: Locale) => {
      const newQuery = new URLSearchParams(query);
      newQuery.set('templateLocale', locale);
      replace(`${pathname}?${newQuery.toString()}`);
    },
    [replace, pathname]
  );
  const [selectedFormat, setSelectedFormat] =
    useState<WhatsappTemplateComponentFormat>(
      WhatsappTemplateComponentFormat.TEXT
    );

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<
    WhatsappContentForm & {
      locale: Locale;
    }
  >({
    defaultValues: {
      header: template
        ? template.components.find(
            (component) =>
              component.type === WhatsappTemplateComponentType.HEADER
          ) ?? {
            format: WhatsappTemplateComponentFormat.TEXT,
            text: '',
            type: WhatsappTemplateComponentType.HEADER,
          }
        : {
            format: WhatsappTemplateComponentFormat.TEXT,
            text: '',
            type: WhatsappTemplateComponentType.HEADER,
          },
      body: template
        ? template.components.find(
            (component) => component.type === WhatsappTemplateComponentType.BODY
          ) ?? {
            text: '',
            type: WhatsappTemplateComponentType.BODY,
          }
        : {
            text: '',
            type: WhatsappTemplateComponentType.BODY,
          },
      footer: template
        ? template.components.find(
            (component) =>
              component.type === WhatsappTemplateComponentType.FOOTER
          ) ?? {
            text: '',
            type: WhatsappTemplateComponentType.FOOTER,
          }
        : {
            text: '',
            type: WhatsappTemplateComponentType.FOOTER,
          },
      buttons: template
        ? template.components.find(
            (component) =>
              component.type === WhatsappTemplateComponentType.BUTTONS
          ) ?? {
            type: WhatsappTemplateComponentType.BUTTONS,
            buttons: [],
          }
        : {
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
      onChange: onChangeLocale,
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
      templateName,
      selectedCategory: category,
      setSelectedCategory: onCategoryChange,
      onNameChange: onChangeTemplateName,
      errors,
    },
    formData,
    locale: selectedLocale,
  };
};
