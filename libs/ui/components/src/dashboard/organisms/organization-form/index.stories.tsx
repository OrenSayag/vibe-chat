import { Meta, StoryObj } from '@storybook/react';
import { OrganizationForm } from '.';
import { NextIntlClientProvider } from 'next-intl';
import { i18nStorybookMessagesEn } from '../../assets/i18n-storybook/en';

const meta: Meta<typeof OrganizationForm> = {
  component: OrganizationForm,
  argTypes: {},
  args: { onSubmit: console.log },
  render(args) {
    return (
      <>
        <NextIntlClientProvider
          locale={'en'}
          messages={i18nStorybookMessagesEn}
        >
          <OrganizationForm {...args} />
        </NextIntlClientProvider>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof OrganizationForm>;

export const Primary: Story = {
  args: {},
};
