import { Meta, StoryObj } from '@storybook/react';
import { BoardTemplate } from '.';

const meta: Meta<typeof BoardTemplate> = {
  component: BoardTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof BoardTemplate>;

export const Primary: Story = {
  args: {},
};
