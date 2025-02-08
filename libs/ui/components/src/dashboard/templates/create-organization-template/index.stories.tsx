import { Meta, StoryObj } from '@storybook/react';
import { CreateOrganizationTemplate } from '.';

const meta: Meta<typeof CreateOrganizationTemplate> = {
  component: CreateOrganizationTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof CreateOrganizationTemplate>;

export const Primary: Story = {
  args: {},
};
