import { Meta, StoryObj } from '@storybook/react';
import { ItemTemplate } from '.';

const meta: Meta<typeof ItemTemplate> = {
  component: ItemTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ItemTemplate>;

export const Primary: Story = {
  args: {},
};
