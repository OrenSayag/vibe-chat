import { Meta, StoryObj } from '@storybook/react';
import { ChatMessageBox } from './index';

const meta: Meta<typeof ChatMessageBox> = {
  component: ChatMessageBox,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatMessageBox>;

export const Primary: Story = {
  args: {},
};
