import { Meta, StoryObj } from '@storybook/react';
import { WorkspaceTemplate } from '.';

const meta: Meta<typeof WorkspaceTemplate> = {
  component: WorkspaceTemplate,
  argTypes: {},
  args: {
    activatedWorkspaceIds: ['123', '1234', '12345'],
  },
};

export default meta;
type Story = StoryObj<typeof WorkspaceTemplate>;

export const NotAllowed: Story = {
  args: {
    subscriptionId: 'subscription-1',
  },
};
export const Allowed: Story = {
  args: {
    subscriptionId: '123',
  },
};
