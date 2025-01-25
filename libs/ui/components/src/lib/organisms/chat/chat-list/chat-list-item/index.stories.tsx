import { Meta, StoryObj } from '@storybook/react';
import { ChatListItem } from '.';
import { ChatListItem as ChatListItemData } from '@monday-whatsapp/shared-types';
import {
  MessageDirection,
  MessageStatus,
} from 'libs/shared-types/src/lib/whatsapp.types';

const meta: Meta<typeof ChatListItem> = {
  component: ChatListItem,
  argTypes: {},
  args: {},
};

const outgoingChatMessage: ChatListItemData = {
  phoneNumberId: 'somephonenumberid',
  avatarSrc:
    'https://pps.whatsapp.net/v/t61.24694-24/439076101_965804545042779_7683015297817172094_n.jpg?ccb=11-4&oh=01_Q5AaIEEef2buVf7H4d6FmnykDTPCYFOyi5i68MqzGknY1_T_&oe=679C3C2F&_nc_sid=5e03e0&_nc_cat=102',
  name: 'Oren',
  latestMessage: {
    type: 'text',
    text: {
      body: 'hello',
    },
    timestamp: '1737352566',
    status: MessageStatus.SENT,
    from: 'somephonenumberid',
    direction: MessageDirection.INCOMING,
    id: '2093482390',
  },
};

const incomingChatMessage: ChatListItemData = {
  phoneNumberId: '972504506225@c.us',
  avatarSrc:
    'https://pps.whatsapp.net/v/t61.24694-24/362291313_1502482213898085_5283722348083602419_n.jpg?ccb=11-4&oh=01_Q5AaIBoEZ3t1kXpOLLv0mkTQTk7bKEd7q8oWSHtyoO1zxIvv&oe=679B0550&_nc_sid=5e03e0&_nc_cat=107',
  name: 'Ilay',
  latestMessage: {
    type: 'text',
    text: {
      body: 'hello',
    },
    timestamp: '1737352566',
    status: MessageStatus.SENT,
    from: 'somephonenumberid',
    direction: MessageDirection.INCOMING,
    id: '2093482390',
  },
};

export default meta;
type Story = StoryObj<typeof ChatListItem>;

export const Outcoming: Story = {
  args: {
    item: { ...outgoingChatMessage },
  },
};
export const Incoming: Story = {
  args: {
    item: { ...incomingChatMessage },
  },
};
