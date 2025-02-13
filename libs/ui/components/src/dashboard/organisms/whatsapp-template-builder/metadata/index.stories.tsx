import { Meta, StoryObj } from '@storybook/react';
import { Metadata } from '.';
import {
  WhatsappTemplateCategory,
  whatsappTemplateCategoryTranslations,
  Locale,
  ListItem,
} from '@vibe-chat/shared-types';
import { useState } from 'react';

const meta: Meta<typeof Metadata> = {
  component: Metadata,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Metadata>;

const categories = [
  {
    label:
      whatsappTemplateCategoryTranslations[WhatsappTemplateCategory.MARKETING][
        Locale.ENGLISH
      ],
    value: WhatsappTemplateCategory.MARKETING,
  },
  {
    label:
      whatsappTemplateCategoryTranslations[WhatsappTemplateCategory.UTILITY][
        Locale.ENGLISH
      ],
    value: WhatsappTemplateCategory.UTILITY,
  },
  {
    label:
      whatsappTemplateCategoryTranslations[
        WhatsappTemplateCategory.AUTHENTICATION
      ][Locale.ENGLISH],
    value: WhatsappTemplateCategory.AUTHENTICATION,
  },
];

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
];

export const Primary: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      category: WhatsappTemplateCategory.MARKETING,
      name: '',
      languages: [] as ListItem[],
    });

    const onChange = {
      category: (category: WhatsappTemplateCategory) =>
        setFormData((prev) => ({ ...prev, category })),
      name: (name: string) => setFormData((prev) => ({ ...prev, name })),
      languages: (selectedLanguages: ListItem[]) =>
        setFormData((prev) => ({ ...prev, languages: selectedLanguages })),
    };

    return (
      <Metadata
        categories={categories}
        languages={languages}
        formData={formData}
        onChange={onChange}
        errors={{}}
        onSubmit={(data) => console.log('Form submitted:', data)}
      />
    );
  },
};

export const WithErrors: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      category: WhatsappTemplateCategory.MARKETING,
      name: '',
      languages: [] as ListItem[],
    });

    const onChange = {
      category: (category: WhatsappTemplateCategory) =>
        setFormData((prev) => ({ ...prev, category })),
      name: (name: string) => setFormData((prev) => ({ ...prev, name })),
      languages: (selectedLanguages: ListItem[]) =>
        setFormData((prev) => ({ ...prev, languages: selectedLanguages })),
    };

    return (
      <Metadata
        categories={categories}
        languages={languages}
        formData={formData}
        onChange={onChange}
        errors={{
          name: 'Name is required',
          languages: 'At least one language is required',
        }}
        onSubmit={(data) => console.log('Form submitted:', data)}
      />
    );
  },
};
