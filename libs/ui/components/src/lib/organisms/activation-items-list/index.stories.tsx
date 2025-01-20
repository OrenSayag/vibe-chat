import { Meta, StoryObj } from '@storybook/react';
import { ActivationItemsList } from '.';

const meta: Meta<typeof ActivationItemsList> = {
  component: ActivationItemsList,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ActivationItemsList>;

export const Primary: Story = {
  args: {
    activatedItems: [
      {
        label: 'workspace 1',
        value: {
          activationDate: new Date().toISOString(),
          id: 'workspace-1',
        },
      },
    ],
    deactivatedItems: [
      {
        label: 'workspace 2',
        value: {
          id: 'workspace-2',
        },
      },
    ],
  },
};

export const Multiple: Story = {
  args: {
    activatedItems: [],
    deactivatedItems: [
      {
        label: 'workspace 1',
        value: {
          id: 'workspace-1',
        },
      },
      {
        label: 'workspace 2',
        value: {
          id: 'workspace-2',
        },
      },
      {
        label: 'workspace 3',
        value: {
          id: 'workspace-3',
        },
      },
    ],
  },
};
