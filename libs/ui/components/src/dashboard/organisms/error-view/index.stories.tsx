import { Meta, StoryObj } from '@storybook/react';
import { ErrorView } from '.';

const meta: Meta<typeof ErrorView> = {
  component: ErrorView,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ErrorView>;

export const Primary: Story = {
  args: {},
};
