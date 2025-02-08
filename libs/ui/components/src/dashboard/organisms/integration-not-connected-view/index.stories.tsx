import { Meta, StoryObj } from '@storybook/react';
import { IntegrationNotConnectedView } from '.';

const meta: Meta<typeof IntegrationNotConnectedView> = {
  component: IntegrationNotConnectedView,
  argTypes: {},
  args: {
    onConnect: () => {
      alert('connect');
    },
  },
};

export default meta;
type Story = StoryObj<typeof IntegrationNotConnectedView>;

export const Primary: Story = {
  args: {},
};
