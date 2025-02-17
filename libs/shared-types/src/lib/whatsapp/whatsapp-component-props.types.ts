import {
  ListItem,
  Locale,
  WhatsappContentForm,
  WhatsappTemplate,
  WhatsappTemplateCategory,
  WhatsappTemplateComponentFormat,
  WhatsappTemplateButtonType,
  WhatsappTemplateBuilderMetadataForm,
} from '@vibe-chat/shared-types';
import { CSSProperties } from 'react';
import { FieldErrors } from 'react-hook-form';

export type WhatsappMessageTemplateSelectorProps = {
  className?: string;
  style?: CSSProperties;
  templates: WhatsappTemplate[];
  selectedTemplateName?: string;
  loading?: boolean;
  error?: boolean;
  onSelect(template: WhatsappTemplate): void;
};

export type TemplateBuilderWorkbenchContentProps = {
  style?: CSSProperties;
  isDraft?: boolean;
  headProps: {
    readOnly?: boolean;
    selectedFormat?: WhatsappTemplateComponentFormat;
    onFormatChange: (format: WhatsappTemplateComponentFormat) => void;
    value:
      | {
          type: WhatsappTemplateComponentFormat.TEXT;
          value: string;
          onChange(value: string): void;
        }
      | {
          type:
            | WhatsappTemplateComponentFormat.IMAGE
            | WhatsappTemplateComponentFormat.VIDEO
            | WhatsappTemplateComponentFormat.DOCUMENT;
          value: string; // mediaId
          onChange(value: string): void;
        }
      | {
          type: WhatsappTemplateComponentFormat.LOCATION;
        };
  };
  bodyProps: {
    style?: CSSProperties;
    value?: string;
    onChange(value: string): void;
    readOnly?: boolean;
  };
  footerProps: {
    style?: CSSProperties;
    value?: string;
    onChange(value: string): void;
    readOnly?: boolean;
  };
  buttonsProps: {
    style?: CSSProperties;
    value?: Array<{
      text: string;
      type: WhatsappTemplateButtonType;
      phone_number?: string;
      url?: string;
      navigate_screen?: string;
    }>;
    onChange(
      value: Array<{
        text: string;
        type: WhatsappTemplateButtonType;
        phone_number?: string;
        url?: string;
        navigate_screen?: string;
      }>
    ): void;
    readOnly?: boolean;
  };
};

export type WhatappTemplateBuilderWorkbenchProps = {
  style?: CSSProperties;
  categories: ListItem<WhatsappTemplateCategory>[];
  localesProps: {
    onChange: (locale: Locale) => void;
    selectedLocale: Locale;
    locales: Locale[];
    onCreateLocale: (locale: Locale) => void;
    onRemoveLocale: (locale: Locale) => void;
    readOnly?: boolean;
  };
  contentProps: TemplateBuilderWorkbenchContentProps;
  headerProps: {
    templateName: string;
    selectedCategory: WhatsappTemplateCategory;
    setSelectedCategory: (category: WhatsappTemplateCategory) => void;
    onNameChange: (name: string) => void;
    errors?: FieldErrors<WhatsappTemplateBuilderMetadataForm>;
    readOnly?: boolean;
  };
  formData: Partial<WhatsappContentForm>;
  isReadOnly?: boolean;
};
