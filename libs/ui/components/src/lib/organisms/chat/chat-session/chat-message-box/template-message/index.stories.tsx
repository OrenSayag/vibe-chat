import { Meta, StoryObj } from '@storybook/react';
import { TemplateMessage } from '.';
import { templates } from '../../../../../molecules/whatsapp-message-template-selector/story-assets';

const meta: Meta<typeof TemplateMessage> = {
  component: TemplateMessage,
  argTypes: {},
  args: {
    template: templates[0],
  },
};

export default meta;
type Story = StoryObj<typeof TemplateMessage>;

export const Primary: Story = {
  args: {},
};
