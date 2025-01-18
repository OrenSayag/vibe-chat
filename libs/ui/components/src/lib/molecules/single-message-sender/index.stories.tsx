import { Meta, StoryObj } from '@storybook/react';
import { SingleMessageSender } from '.';

const meta: Meta<typeof SingleMessageSender> = {
  component: SingleMessageSender,
  argTypes: {},
  args: {
    onSend: console.log,
  },
};

export default meta;
type Story = StoryObj<typeof SingleMessageSender>;

export const Primary: Story = {
  args: {},
};
