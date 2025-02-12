import { Meta, StoryObj } from '@storybook/react';
import { Workbench } from '.';
import {
  ListItem as IListItem,
  WhatsappTemplateCategory,
  Locale,
  WhatsappTemplateComponentFormat,
  WhatsappTemplateButtonType,
  TemplateBuilderWorkbenchContentProps,
  WhatsappContentForm,
  WhatsappTemplateComponentType,
} from '@vibe-chat/shared-types';
import { useState } from 'react';

const categories: IListItem<WhatsappTemplateCategory>[] = [
  { label: 'Marketing', value: WhatsappTemplateCategory.MARKETING },
  { label: 'Sales', value: WhatsappTemplateCategory.SHIPPING_UPDATE },
  { label: 'Support', value: WhatsappTemplateCategory.ISSUE_RESOLUTION },
];

const exampleLocales: Locale[] = [Locale.ENGLISH, Locale.HEBREW];

const meta: Meta<typeof Workbench> = {
  component: Workbench,
  argTypes: {},
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Workbench>;

export const Primary: Story = {
  render: () => {
    const [selectedLocale, setSelectedLocale] = useState<Locale>(
      Locale.ENGLISH
    );
    const [headerFormat, setHeaderFormat] =
      useState<WhatsappTemplateComponentFormat>(
        WhatsappTemplateComponentFormat.TEXT
      );
    const [headerText, setHeaderText] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [footerText, setFooterText] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [selectedCategory, setSelectedCategory] =
      useState<WhatsappTemplateCategory>(WhatsappTemplateCategory.MARKETING);
    const [buttons, setButtons] = useState<
      Array<{
        text: string;
        type: WhatsappTemplateButtonType;
        phone_number?: string;
        url?: string;
        navigate_screen?: string;
      }>
    >([]);

    const localesProps = {
      onChange: (locale: string) => {
        console.log('Locale changed to:', locale);
        setSelectedLocale(locale as Locale);
      },
      selectedLocale,
      locales: exampleLocales,
      onCreateLocale: (locale: Locale) =>
        console.log('Locale created:', locale),
    };

    const contentProps: TemplateBuilderWorkbenchContentProps = {
      headProps: {
        selectedFormat: headerFormat,
        onFormatChange: setHeaderFormat,
        pendingSave: false,
        canPublish: true,
        onSave: (data, isDraft) =>
          console.log('Saving template:', { data, isDraft }),
        value:
          headerFormat === WhatsappTemplateComponentFormat.TEXT
            ? {
                type: WhatsappTemplateComponentFormat.TEXT,
                value: headerText,
                onChange: setHeaderText,
              }
            : headerFormat === WhatsappTemplateComponentFormat.LOCATION
            ? {
                type: WhatsappTemplateComponentFormat.LOCATION,
              }
            : {
                type: headerFormat,
                value: '', // mediaId would go here
                onChange: (mediaId: string) =>
                  console.log('Media ID changed:', mediaId),
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
    };

    const headerProps = {
      templateName,
      selectedCategory,
      setSelectedCategory,
      onNameChange: setTemplateName,
      errors: {},
    };

    const formData: Partial<WhatsappContentForm> = {
      header:
        headerFormat === WhatsappTemplateComponentFormat.TEXT
          ? {
              type: WhatsappTemplateComponentType.HEADER,
              format: WhatsappTemplateComponentFormat.TEXT,
              text: headerText,
            }
          : headerFormat === WhatsappTemplateComponentFormat.IMAGE
          ? {
              type: WhatsappTemplateComponentType.HEADER,
              format: WhatsappTemplateComponentFormat.IMAGE,
            }
          : headerFormat === WhatsappTemplateComponentFormat.DOCUMENT
          ? {
              type: WhatsappTemplateComponentType.HEADER,
              format: WhatsappTemplateComponentFormat.DOCUMENT,
            }
          : headerFormat === WhatsappTemplateComponentFormat.LOCATION
          ? {
              type: WhatsappTemplateComponentType.HEADER,
              format: WhatsappTemplateComponentFormat.LOCATION,
            }
          : undefined,
      body: {
        type: WhatsappTemplateComponentType.BODY,
        text: bodyText,
      },
      footer: footerText
        ? {
            type: WhatsappTemplateComponentType.FOOTER,
            text: footerText,
          }
        : undefined,
      buttons:
        buttons.length > 0
          ? {
              type: WhatsappTemplateComponentType.BUTTONS,
              buttons,
            }
          : undefined,
    };

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <Workbench
          categories={categories}
          localesProps={localesProps}
          contentProps={contentProps}
          headerProps={headerProps}
          formData={formData}
        />
      </div>
    );
  },
};
