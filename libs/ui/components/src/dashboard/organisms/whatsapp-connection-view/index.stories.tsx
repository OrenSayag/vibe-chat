import { Meta, StoryObj } from '@storybook/react';
import { WhatsappConnectionView } from '.';

const meta: Meta<typeof WhatsappConnectionView> = {
  component: WhatsappConnectionView,
  argTypes: {},
  args: {
    whatsappBusinessAccountId: '1234567890',
    whatsappNumber: '1234567890',
    displayName: 'WhatsApp Connection',
    image: 'https://example.com/image.png',
  },
};

export default meta;
type Story = StoryObj<typeof WhatsappConnectionView>;

export const Primary: Story = {
  args: {},
};
