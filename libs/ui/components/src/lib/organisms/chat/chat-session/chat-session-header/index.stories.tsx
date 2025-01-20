import { Meta, StoryObj } from '@storybook/react';
import { ChatSessionHeader } from '.';

const meta: Meta<typeof ChatSessionHeader> = {
  component: ChatSessionHeader,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatSessionHeader>;

export const Primary: Story = {
  args: {},
};
