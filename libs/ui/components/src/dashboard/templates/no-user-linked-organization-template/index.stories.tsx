import { Meta, StoryObj } from '@storybook/react';
import { NoUserLinkedOrganizationTemplate } from '.';

const meta: Meta<typeof NoUserLinkedOrganizationTemplate> = {
  component: NoUserLinkedOrganizationTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof NoUserLinkedOrganizationTemplate>;

export const Primary: Story = {
  args: {},
};
