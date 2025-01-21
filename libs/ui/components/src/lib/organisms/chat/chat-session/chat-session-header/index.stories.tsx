import { Meta, StoryObj } from '@storybook/react';
import { ChatSessionHeader } from '.';

const meta: Meta<typeof ChatSessionHeader> = {
  component: ChatSessionHeader,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatSessionHeader>;

export const Primary: Story = {
  args: {
    name: 'Ilay Dayyan',
    avatarSrc:
      'https://pps.whatsapp.net/v/t61.24694-24/362291313_1502482213898085_5283722348083602419_n.jpg?ccb=11-4&oh=01_Q5AaIBoEZ3t1kXpOLLv0mkTQTk7bKEd7q8oWSHtyoO1zxIvv&oe=679B0550&_nc_sid=5e03e0&_nc_cat=107',
  },
};
