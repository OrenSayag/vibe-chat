import { Meta, StoryObj } from '@storybook/react';
import { ActivationItemsList } from '.';
import { subDays, subMonths } from 'date-fns';

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
          activationDate: new Date().toISOString(),
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
          activationDate: new Date().toISOString(),
          id: 'workspace-1',
        },
      },
      {
        label: 'workspace 2',
        value: {
          activationDate: subMonths(new Date(), 2).toISOString(),
          id: 'workspace-2',
        },
      },
      {
        label: 'workspace 3',
        value: {
          activationDate: subDays(new Date(), 3).toISOString(),
          id: 'workspace-3',
        },
      },
    ],
  },
};
