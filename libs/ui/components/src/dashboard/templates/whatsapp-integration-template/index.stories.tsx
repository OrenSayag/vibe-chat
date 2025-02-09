import { Meta, StoryObj } from '@storybook/react';
import { WhatsappIntegrationTemplate } from '.';

const meta: Meta<typeof WhatsappIntegrationTemplate> = {
  component: WhatsappIntegrationTemplate,
  argTypes: {},
  args: {
    connectionViewProps: {
      whatsappBusinessAccountId: '1234567890',
      whatsappNumber: '1234567890',
      displayName: 'WhatsApp Connection',
      image: 'https://example.com/image.png',
    },
  },
};

export default meta;
type Story = StoryObj<typeof WhatsappIntegrationTemplate>;

export const Primary: Story = {
  args: {},
};
