import { Meta, StoryObj } from '@storybook/react';
import { MessageStatusCheck } from '.';
import { MessageStatus } from '@vibe-chat/shared-types';

const meta: Meta<typeof MessageStatusCheck> = {
  component: MessageStatusCheck,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof MessageStatusCheck>;

export const Sent: Story = {
  args: {
    status: MessageStatus.SENT,
  },
};

export const Read: Story = {
  args: {
    status: MessageStatus.READ,
  },
};
