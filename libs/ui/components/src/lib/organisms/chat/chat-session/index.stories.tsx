import { Meta, StoryObj } from '@storybook/react';
import { ChatSession } from '.';

const meta: Meta<typeof ChatSession> = {
  component: ChatSession,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatSession>;

export const Primary: Story = {
  args: {},
};
