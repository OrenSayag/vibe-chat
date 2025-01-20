import { Meta, StoryObj } from '@storybook/react';
import { ChatSessionCurrentDateIndicator } from '.';

const meta: Meta<typeof ChatSessionCurrentDateIndicator> = {
  component: ChatSessionCurrentDateIndicator,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatSessionCurrentDateIndicator>;

export const Primary: Story = {
  args: {},
};
