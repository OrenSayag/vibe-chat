import { Meta, StoryObj } from '@storybook/react';
import { Chat } from '.';

const meta: Meta<typeof Chat> = {
  component: Chat,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Chat>;

export const Primary: Story = {
  args: {},
};
