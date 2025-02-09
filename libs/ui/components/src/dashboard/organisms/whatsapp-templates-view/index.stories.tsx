import { Meta, StoryObj } from '@storybook/react';
import { WhatsappTemplatesView } from '.';

const meta: Meta<typeof WhatsappTemplatesView> = {
  component: WhatsappTemplatesView,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof WhatsappTemplatesView>;

export const Primary: Story = {
  args: {},
};
