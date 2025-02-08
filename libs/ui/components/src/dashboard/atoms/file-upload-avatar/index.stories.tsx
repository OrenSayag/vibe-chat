import { Meta, StoryObj } from '@storybook/react';
import { FileUploadAvatar } from '.';

const meta: Meta<typeof FileUploadAvatar> = {
  component: FileUploadAvatar,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof FileUploadAvatar>;

export const Primary: Story = {
  args: {
    onChange() {
      console.log('upload file');
    },
  },
};
