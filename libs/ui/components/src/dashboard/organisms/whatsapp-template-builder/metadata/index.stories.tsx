import { Meta, StoryObj } from '@storybook/react';
import { Metadata } from '.';
import {
  WhatsappTemplateCategory,
  whatsappTemplateCategoryTranslations,
  Locale,
} from '@vibe-chat/shared-types';

const meta: Meta<typeof Metadata> = {
  component: Metadata,
  argTypes: {},
  args: {
    categories: [
      {
        label:
          whatsappTemplateCategoryTranslations[
            WhatsappTemplateCategory.MARKETING
          ][Locale.ENGLISH],
        value: WhatsappTemplateCategory.MARKETING,
      },
      {
        label:
          whatsappTemplateCategoryTranslations[
            WhatsappTemplateCategory.UTILITY
          ][Locale.ENGLISH],
        value: WhatsappTemplateCategory.UTILITY,
      },
      {
        label:
          whatsappTemplateCategoryTranslations[
            WhatsappTemplateCategory.AUTHENTICATION
          ][Locale.ENGLISH],
        value: WhatsappTemplateCategory.AUTHENTICATION,
      },
    ],
    languages: [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
    ],
    onSubmit: () => {},
    pendingSubmit: false,
  },
};

export default meta;
type Story = StoryObj<typeof Metadata>;

export const Primary: Story = {
  args: {},
};
