import { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from '.';
import { headerProps } from '../../molecules/header/story-assets';

const meta: Meta<typeof MainLayout> = {
  component: MainLayout,
  argTypes: {},
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Primary: Story = {
  args: {
    headerProps,
  },
};
