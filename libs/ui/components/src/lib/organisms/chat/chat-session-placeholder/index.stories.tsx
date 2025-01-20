import { Meta, StoryObj } from '@storybook/react';
import { ChatSessionPlaceholder } from '.';

const meta: Meta<typeof ChatSessionPlaceholder> = {
  component: ChatSessionPlaceholder,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatSessionPlaceholder>;

export const Primary: Story = {
  args: {},
};
