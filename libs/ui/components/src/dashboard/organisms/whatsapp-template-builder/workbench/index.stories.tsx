import { Meta, StoryObj } from '@storybook/react';
import { Workbench } from '.';
import {
  ListItem as IListItem,
  WhatsappTemplateCategory,
  Locale,
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

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <Workbench categories={categories} localesProps={localesProps} />
      </div>
    );
  },
};
