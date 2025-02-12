import { Meta, StoryObj } from '@storybook/react';
import { Content } from '.';

const meta: Meta<typeof Content> = {
  component: Content,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Content>;

export const Primary: Story = {
  args: {},
};
