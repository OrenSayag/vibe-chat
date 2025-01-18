import { Meta, StoryObj } from '@storybook/react';
import { MessageInputAndAction } from '.';

const meta: Meta<typeof MessageInputAndAction> = {
  component: MessageInputAndAction,
  argTypes: {},
  args: {
    onSend: console.log,
  },
};

export default meta;
type Story = StoryObj<typeof MessageInputAndAction>;

export const Primary: Story = {
  args: {},
};
