import { Meta, StoryObj } from '@storybook/react';
import { ChatLayout } from '.';

const meta: Meta<typeof ChatLayout> = {
  component: ChatLayout,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatLayout>;

export const Primary: Story = {
  args: {},
};
