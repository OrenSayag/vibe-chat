import { Meta, StoryObj } from '@storybook/react';
import { ChatList } from './index';
import {
  ChatListItem as ChatListItemData,
  WhatsappMessageType,
} from '@monday-whatsapp/shared-types';
import { useState } from 'react';
import {
  MessageDirection,
  MessageStatus,
} from 'libs/shared-types/src/lib/whatsapp/whatsapp.types';

const outgoingChatMessage: ChatListItemData = {
  phoneNumberId: 'somephonenumberid',
  avatarSrc:
    'https://pps.whatsapp.net/v/t61.24694-24/439076101_965804545042779_7683015297817172094_n.jpg?ccb=11-4&oh=01_Q5AaIEEef2buVf7H4d6FmnykDTPCYFOyi5i68MqzGknY1_T_&oe=679C3C2F&_nc_sid=5e03e0&_nc_cat=102',
  name: 'Oren',
  latestMessage: {
    message: {
      type: WhatsappMessageType.TEXT,
      text: {
        body: 'hello',
      },
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
    message: {
      type: WhatsappMessageType.TEXT,
      text: {
        body: 'hello',
      },
    },
    timestamp: '1603059201',
    status: MessageStatus.SENT,
    from: 'somephonenumberid',
    direction: MessageDirection.INCOMING,
    id: '2093482390',
  },
};

const meta: Meta<typeof ChatList> = {
  component: ChatList,
  argTypes: {},
  render(args) {
    const [selectedId, setSelectedId] = useState(args.selectedChatId);
    return (
      <ChatList
        {...args}
        selectedChatId={selectedId}
        onSelectChat={setSelectedId}
      />
    );
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatList>;

export const Primary: Story = {
  args: {
    list: [outgoingChatMessage, incomingChatMessage],
  },
};

export const Selected: Story = {
  args: {
    list: [outgoingChatMessage, incomingChatMessage],
    selectedChatId: incomingChatMessage.phoneNumberId,
  },
};
