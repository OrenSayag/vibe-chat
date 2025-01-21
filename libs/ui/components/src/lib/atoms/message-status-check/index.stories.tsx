import { Meta, StoryObj } from '@storybook/react';
import { MessageStatusCheck } from '.';
import { StatusMessage } from '@monday-whatsapp/shared-types';

const meta: Meta<typeof MessageStatusCheck> = {
  component: MessageStatusCheck,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof MessageStatusCheck>;

export const Sent: Story = {
  args: {
    status: StatusMessage.Sent,
  },
};

export const Delivered: Story = {
  args: {
    status: StatusMessage.Delivered,
  },
};
