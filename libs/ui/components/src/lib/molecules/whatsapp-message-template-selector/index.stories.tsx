import { Meta, StoryObj } from '@storybook/react';
import { WhatsappMessageTemplateSelector } from '.';
import { templates } from './story-assets';
import { useState } from 'react';

const meta: Meta<typeof WhatsappMessageTemplateSelector> = {
  component: WhatsappMessageTemplateSelector,
  argTypes: {},
  args: {
    templates,
  },
  render: (args) => {
    const [selectedTemplateName, setSelectedTemplateName] =
      useState<string>('');

    return (
      <WhatsappMessageTemplateSelector
        {...args}
        selectedTemplateName={selectedTemplateName}
        onSelect={(t) => setSelectedTemplateName(t.name)}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof WhatsappMessageTemplateSelector>;

export const Primary: Story = {
  args: {},
};
export const Loading: Story = {
  args: {
    loading: true,
  },
};
export const Error: Story = {
  args: {
    error: true,
  },
};
