import { Meta, StoryObj } from '@storybook/react';
import { SubscriptionTemplate } from '.';

const meta: Meta<typeof SubscriptionTemplate> = {
  component: SubscriptionTemplate,
  argTypes: {},
  args: {
    activatedWorkspaces: [
      {
        label: 'workspace 1',
        value: {
          activationDate: new Date().toISOString(),
          id: 'workspace-1',
        },
      },
    ],
    deactivatedWorkspaces: [
      {
        label: 'workspace 2',
        value: {
          id: 'workspace-2',
        },
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SubscriptionTemplate>;

export const Primary: Story = {
  args: {},
};
