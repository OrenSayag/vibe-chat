import { Meta, StoryObj } from '@storybook/react';
import { UnConfiguredAccountTemplate } from '.';

const meta: Meta<typeof UnConfiguredAccountTemplate> = {
  component: UnConfiguredAccountTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof UnConfiguredAccountTemplate>;

export const Primary: Story = {
  args: {},
};
