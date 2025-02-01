import { Meta, StoryObj } from '@storybook/react';
import { MessageInputAndAction } from '.';
import { templates } from '../whatsapp-message-template-selector/story-assets';

const meta: Meta<typeof MessageInputAndAction> = {
  component: MessageInputAndAction,
  argTypes: {},
  args: {
    onSend: console.log,
    templateSelectorProps: {
      templates,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageInputAndAction>;

export const Primary: Story = {
  args: {},
};
