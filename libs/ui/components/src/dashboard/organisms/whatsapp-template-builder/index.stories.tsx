import { Meta, StoryObj } from '@storybook/react';
import { WhatsappTemplateBuilder } from '.';

const meta: Meta<typeof WhatsappTemplateBuilder> = {
  component: WhatsappTemplateBuilder,
  argTypes: {},
  args: {
    onGoBack: () => {},
    onSubmit: {
      label: 'Continue',
      onClick: () => {},
    },
  },
};

export default meta;
type Story = StoryObj<typeof WhatsappTemplateBuilder>;

export const Primary: Story = {
  args: {},
};
