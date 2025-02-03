import { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '.';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {},
};

export const SelectedItem: Story = {
  args: {
    selectedPath: '/chats',
  },
};
