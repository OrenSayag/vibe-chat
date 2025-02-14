import { useForm } from 'react-hook-form';
import {
  Locale,
  WhatsappTemplate,
  WhatsappTemplateCategory,
  WhatsappTemplateComponentFormat,
  WhatappTemplateBuilderWorkbenchProps,
  WhatsappContentForm,
  WhatsappTemplateComponentType,
  WhatsappTemplateHeaderComponent,
} from '@vibe-chat/shared-types';
import { useCallback, useState } from 'react';

type Input = {
  template?: WhatsappTemplate;
  categories: WhatappTemplateBuilderWorkbenchProps['categories'];
};

export const useWorkbench = ({ template, categories }: Input): WhatappTemplateBuilderWorkbenchProps => {
  const [selectedLocale, setSelectedLocale] = useState<Locale>(Locale.ENGLISH);
  const [selectedFormat, setSelectedFormat] = useState<WhatsappTemplateComponentFormat>(
    WhatsappTemplateComponentFormat.TEXT
  );

  const { register, watch, setValue, formState: { errors } } = useForm<WhatsappContentForm>({
    defaultValues: {
      header: {
        format: WhatsappTemplateComponentFormat.TEXT,
        text: '',
      },
      body: {
        text: '',
      },
      footer: {
        text: '',
      },
      buttons: {
        type: WhatsappTemplateComponentType.BUTTONS,
        buttons: [],
      },
    },
  });

  const formData = watch();

  const handleFormatChange = useCallback((format: WhatsappTemplateHeaderComponent['format']) => {
    setSelectedFormat(format);
    setValue('header.format', format);
  }, [setValue]);

  const handleHeaderChange = useCallback((value: string) => {
    if (selectedFormat === WhatsappTemplateComponentFormat.TEXT) {
      setValue('header.text', value);
    }
  }, [selectedFormat, setValue]);

  const handleBodyChange = useCallback((value: string) => {
    setValue('body.text', value);
  }, [setValue]);

  const handleFooterChange = useCallback((value: string) => {
    setValue('footer.text', value);
  }, [setValue]);

  const handleButtonsChange = useCallback((value: WhatsappContentForm['buttons']) => {
    setValue('buttons', value);
  }, [setValue]);

  return {
    categories,
    localesProps: {
      selectedLocale,
      locales: Object.values(Locale),
      onChange: setSelectedLocale,
      onCreateLocale: () => {}, // Implement if needed
    },
    contentProps: {
      headProps: {
        selectedFormat,
        onFormatChange: handleFormatChange,
        value: selectedFormat === WhatsappTemplateComponentFormat.LOCATION
          ? { type: WhatsappTemplateComponentFormat.LOCATION }
          : selectedFormat === WhatsappTemplateComponentFormat.TEXT
          ? {
              type: WhatsappTemplateComponentFormat.TEXT,
              value: formData.header.text || '',
              onChange: handleHeaderChange,
            }
          : {
              type: selectedFormat,
              value: formData.header.mediaId || '',
              onChange: handleHeaderChange,
            },
      },
      bodyProps: {
        value: formData.body.text,
        onChange: handleBodyChange,
      },
      footerProps: {
        value: formData.footer.text,
        onChange: handleFooterChange,
      },
      buttonsProps: {
        value: formData.buttons,
        onChange: handleButtonsChange,
      },
    },
    headerProps: {
      templateName: formData.name,
      selectedCategory: formData.category,
      setSelectedCategory: handleCategoryChange,
      onNameChange: handleNameChange,
      errors,
    },
    formData,
  };
}; 