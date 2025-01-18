import { Meta, StoryObj } from '@storybook/react';
import { ColumnSelector } from '.';
import { BoardColumn } from '@monday-whatsapp/shared-types';
import { useState } from 'react';

const meta: Meta<typeof ColumnSelector> = {
  component: ColumnSelector,
  argTypes: {},
  args: {
    columns: [
      {
        type: 'phone',
        id: '21234',
        name: 'Phone',
      },
      {
        type: 'text',
        id: '2123334',
        name: 'Name',
      },
    ] as BoardColumn[],
  },
  render(args) {
    const [selectedValue, setSelectedValue] = useState();
    return (
      <ColumnSelector
        {...args}
        onSelect={setSelectedValue}
        selectedId={selectedValue}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof ColumnSelector>;

export const Primary: Story = {
  args: {},
};
export const PhoneOnly: Story = {
  args: {
    type: 'phone',
  },
};
