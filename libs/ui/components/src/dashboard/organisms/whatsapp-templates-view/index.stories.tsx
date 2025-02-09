import { Meta, StoryObj } from '@storybook/react';
import {
  WhatsappTemplateCategory,
  WhatsappTemplateStatus,
} from '@vibe-chat/shared-types';
import { WhatsappTemplatesView } from '.';

const meta: Meta<typeof WhatsappTemplatesView> = {
  component: WhatsappTemplatesView,
  argTypes: {},
  args: {
    listProps: {
      templates: [],
      onEditTemplate: () => {},
      onDeleteTemplate: () => {},
      onCreateTemplate: () => {},
    },
  },
};

export default meta;
type Story = StoryObj<typeof WhatsappTemplatesView>;

export const Primary: Story = {
  args: {
    listProps: {
      templates: [
        {
          id: '1',
          name: 'Template 1',
          status: WhatsappTemplateStatus.APPROVED,
          language: 'en',
          category: WhatsappTemplateCategory.PAYMENT_UPDATE,
          components: [],
          parameter_format: 'POSITIONAL',
        },
      ],
    },
  },
};

export const Empty: Story = {
  args: {
    listProps: {
      templates: [],
    },
  },
};
