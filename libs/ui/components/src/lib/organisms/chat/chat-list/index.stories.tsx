import { Meta, StoryObj } from '@storybook/react';
import { ChatList } from './index';

const meta: Meta<typeof ChatList> = {
  component: ChatList,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatList>;

export const Primary: Story = {
  args: {},
};
