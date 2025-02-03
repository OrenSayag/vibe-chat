import { Meta, StoryObj } from '@storybook/react';
import { Header } from '.';
import { headerProps } from './story-assets';

const meta: Meta<typeof Header> = {
  component: Header,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  args: headerProps,
};
