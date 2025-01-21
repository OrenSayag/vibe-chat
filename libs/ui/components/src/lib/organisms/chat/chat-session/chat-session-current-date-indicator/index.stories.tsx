import { Meta, StoryObj } from '@storybook/react';
import { ChatSessionCurrentDateIndicator } from '.';
import { subDays, subMonths, subYears } from 'date-fns';

const meta: Meta<typeof ChatSessionCurrentDateIndicator> = {
  component: ChatSessionCurrentDateIndicator,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatSessionCurrentDateIndicator>;

export const Today: Story = {
  args: {
    timestamp: Date.now() / 1_000,
  },
};

export const Yesterday: Story = {
  args: {
    timestamp: subDays(new Date(), 1).getTime() / 1_000,
  },
};
export const ThisWeek: Story = {
  args: {
    timestamp: subDays(new Date(), 3).getTime() / 1_000,
  },
};
export const ThisYear: Story = {
  args: {
    timestamp: subMonths(new Date(), 1).getTime() / 1_000,
  },
};
export const BeforeThisYear: Story = {
  args: {
    timestamp: subYears(new Date(), 3).getTime() / 1_000,
  },
};
