import { Meta, StoryObj } from '@storybook/react';
import { WhatsappTemplateBuilder } from '.';
import {
  Locale,
  WhatsappTemplateCategory,
  WhatsappTemplateComponentFormat,
  WhatsappTemplateComponentType,
  WhatsappTemplateButtonType,
} from '@vibe-chat/shared-types';
import React from 'react';

const categories = Object.values(WhatsappTemplateCategory).map((category) => ({
  id: category,
  label: category.toLowerCase().replace(/_/g, ' '),
  value: category,
}));

const languages = [
  { id: 'en', label: 'English', value: 'en' },
  { id: 'es', label: 'Spanish', value: 'es' },
  { id: 'fr', label: 'French', value: 'fr' },
  { id: 'he', label: 'Hebrew', value: 'he' },
];

const meta: Meta<typeof WhatsappTemplateBuilder> = {
  component: WhatsappTemplateBuilder,
  argTypes: {},
  render: (args) => {
    const [selectedCategory, setSelectedCategory] = React.useState(
      WhatsappTemplateCategory.MARKETING
    );
    const [selectedLanguages, setSelectedLanguages] = React.useState([
      { label: 'English', value: 'en' },
    ]);
    const [templateName, setTemplateName] = React.useState('Sample Template');
    const [selectedLocale, setSelectedLocale] = React.useState(Locale.ENGLISH);
    const [headerFormat, setHeaderFormat] = React.useState(
      WhatsappTemplateComponentFormat.TEXT
    );
    const [headerText, setHeaderText] = React.useState('Sample header text');
    const [bodyText, setBodyText] = React.useState('Sample body text');
    const [footerText, setFooterText] = React.useState('Sample footer text');
    const [buttons, setButtons] = React.useState([
      {
        text: 'Visit Website',
        type: WhatsappTemplateButtonType.URL,
        url: 'https://example.com',
      },
      {
        text: 'Call Us',
        type: WhatsappTemplateButtonType.PHONE_NUMBER,
        phone_number: '+1234567890',
      },
    ]);

    return (
      <WhatsappTemplateBuilder
        {...args}
        metadataProps={{
          ...args.metadataProps,
          formData: {
            category: selectedCategory,
            name: templateName,
            languages: selectedLanguages,
          },
          onChange: {
            category: setSelectedCategory,
            name: setTemplateName,
            languages: setSelectedLanguages,
          },
        }}
        workbenchProps={{
          ...args.workbenchProps,
          localesProps: {
            onChange: setSelectedLocale,
            selectedLocale,
            locales: [Locale.ENGLISH, Locale.HEBREW],
            onCreateLocale: (locale) => console.log('Create locale:', locale),
          },
          contentProps: {
            isDraft: true,
            headProps: {
              selectedFormat: headerFormat,
              onFormatChange: setHeaderFormat,
              value: {
                type: headerFormat,
                value: headerText,
                onChange: setHeaderText,
              },
            },
            bodyProps: {
              value: bodyText,
              onChange: setBodyText,
            },
            footerProps: {
              value: footerText,
              onChange: setFooterText,
            },
            buttonsProps: {
              value: buttons,
              onChange: setButtons,
            },
          },
          headerProps: {
            templateName,
            selectedCategory,
            setSelectedCategory,
            onNameChange: setTemplateName,
            errors: {},
          },
          formData: {
            header: {
              type: WhatsappTemplateComponentType.HEADER,
              format: headerFormat,
              text: headerText,
            },
            body: {
              type: WhatsappTemplateComponentType.BODY,
              text: bodyText,
            },
            footer: {
              type: WhatsappTemplateComponentType.FOOTER,
              text: footerText,
            },
            buttons: {
              type: WhatsappTemplateComponentType.BUTTONS,
              buttons,
            },
          },
        }}
      />
    );
  },
  args: {
    onGoBack: () => {},
    onSubmit: {
      label: 'Continue',
      onClick: () => {},
    },
    metadataProps: {
      categories,
      languages,
      formData: {
        category: WhatsappTemplateCategory.MARKETING,
        name: 'Sample Template',
        languages: [{ label: 'English', value: 'en' }],
      },
      onChange: {
        category: (category) => console.log('Category changed:', category),
        name: (name) => console.log('Name changed:', name),
        languages: (languages) => console.log('Languages changed:', languages),
      },
      onSubmit: (metadata) => console.log('Metadata submitted:', metadata),
      errors: {},
    },
    workbenchProps: {
      categories,
      localesProps: {
        onChange: (locale) => console.log('Locale changed:', locale),
        selectedLocale: Locale.ENGLISH,
        locales: [Locale.ENGLISH, Locale.HEBREW],
        onCreateLocale: (locale) => console.log('Create locale:', locale),
      },
      contentProps: {
        isDraft: true,
        headProps: {
          selectedFormat: WhatsappTemplateComponentFormat.TEXT,
          onFormatChange: (format) => console.log('Format changed:', format),
          value: {
            type: WhatsappTemplateComponentFormat.TEXT,
            value: 'Sample header text',
            onChange: (value) => console.log('Header changed:', value),
          },
        },
        bodyProps: {
          value: 'Sample body text',
          onChange: (value) => console.log('Body changed:', value),
        },
        footerProps: {
          value: 'Sample footer text',
          onChange: (value) => console.log('Footer changed:', value),
        },
        buttonsProps: {
          value: [
            {
              text: 'Visit Website',
              type: WhatsappTemplateButtonType.URL,
              url: 'https://example.com',
            },
            {
              text: 'Call Us',
              type: WhatsappTemplateButtonType.PHONE_NUMBER,
              phone_number: '+1234567890',
            },
          ],
          onChange: (buttons) => console.log('Buttons changed:', buttons),
        },
      },
      headerProps: {
        templateName: 'Sample Template',
        selectedCategory: WhatsappTemplateCategory.MARKETING,
        setSelectedCategory: (category) =>
          console.log('Category changed:', category),
        onNameChange: (name) => console.log('Name changed:', name),
        errors: {},
      },
      formData: {
        header: {
          type: WhatsappTemplateComponentType.HEADER,
          format: WhatsappTemplateComponentFormat.TEXT,
          text: 'Sample header text',
        },
        body: {
          type: WhatsappTemplateComponentType.BODY,
          text: 'Sample body text',
        },
        footer: {
          type: WhatsappTemplateComponentType.FOOTER,
          text: 'Sample footer text',
        },
        buttons: {
          type: WhatsappTemplateComponentType.BUTTONS,
          buttons: [
            {
              text: 'Visit Website',
              type: WhatsappTemplateButtonType.URL,
              url: 'https://example.com',
            },
            {
              text: 'Call Us',
              type: WhatsappTemplateButtonType.PHONE_NUMBER,
              phone_number: '+1234567890',
            },
          ],
        },
      },
    },
    isNewTemplate: true,
    pendingSubmit: false,
  },
};

export default meta;
type Story = StoryObj<typeof WhatsappTemplateBuilder>;

export const NewTemplate: Story = {
  args: {
    isNewTemplate: true,
  },
};

export const EditTemplate: Story = {
  args: {
    isNewTemplate: false,
  },
};
