import { Meta, StoryObj } from '@storybook/react';
import { Locales } from '.';
import { Locale } from '@vibe-chat/shared-types';
import { useState } from 'react';

const exampleLocales: Locale[] = [Locale.ENGLISH, Locale.HEBREW];
const meta: Meta<typeof Locales> = {
  component: Locales,
  argTypes: {},
  args: {},
  render: (args) => {
    const [selectedLocale, setSelectedLocale] = useState<Locale>(
      Locale.ENGLISH
    );
    const [locales, setLocales] = useState<Locale[]>(
      args.locales || exampleLocales
    );

    return (
      <Locales
        style={{ border: '1px solid #ccc' }}
        onChange={(locale: string) => {
          console.log('Locale changed to:', locale);
          setSelectedLocale(locale as Locale);
        }}
        selectedLocale={selectedLocale}
        locales={locales}
        onCreateLocale={(locale: Locale) => {
          console.log('Locale created:', locale);
          setLocales((prevLocales) => [...prevLocales, locale]);
        }}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof Locales>;

export const Primary: Story = {};

export const SingleLocale: Story = {
  args: {
    locales: [Locale.ENGLISH],
  },
};
