import { Meta, StoryObj } from '@storybook/react';
import { ChatSession } from '.';
import {
  ChatListItem as ChatListItemData,
  MessageDirection,
  MessageStatus,
} from '@monday-whatsapp/shared-types';

const outgoingChatMessage: ChatListItemData = {
  phoneNumberId: '972542090500@c.us',
  avatarSrc:
    'https://pps.whatsapp.net/v/t61.24694-24/439076101_965804545042779_7683015297817172094_n.jpg?ccb=11-4&oh=01_Q5AaIEEef2buVf7H4d6FmnykDTPCYFOyi5i68MqzGknY1_T_&oe=679C3C2F&_nc_sid=5e03e0&_nc_cat=102',
  name: 'Oren',
  latestMessage: {
    type: 'text',
    text: {
      body: 'hello',
    },
    timestamp: '1603059201',
    status: MessageStatus.SENT,
    from: 'somephonenumberid',
    direction: MessageDirection.OUTGOING,
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
    timestamp: '1603059201',
    status: MessageStatus.SENT,
    from: 'somephonenumberidww',
    direction: MessageDirection.INCOMING,
    id: '2093482390',
  },
};

const meta: Meta<typeof ChatSession> = {
  component: ChatSession,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    messageInputAndActionProps: {
      onSend(txt: string) {
        alert(`Send message: ${txt}`);
      },
    },
    headerProps: {
      name: 'Ilay Dayyan',
      avatarSrc:
        'https://pps.whatsapp.net/v/t61.24694-24/362291313_1502482213898085_5283722348083602419_n.jpg?ccb=11-4&oh=01_Q5AaIBoEZ3t1kXpOLLv0mkTQTk7bKEd7q8oWSHtyoO1zxIvv&oe=679B0550&_nc_sid=5e03e0&_nc_cat=107',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatSession>;

export const Primary: Story = {
  args: {
    history: {
      contact: {
        phoneNumberId: '972504506225@c.us',
        avatarSrc:
          'https://pps.whatsapp.net/v/t61.24694-24/362291313_1502482213898085_5283722348083602419_n.jpg?ccb=11-4&oh=01_Q5AaIBoEZ3t1kXpOLLv0mkTQTk7bKEd7q8oWSHtyoO1zxIvv&oe=679B0550&_nc_sid=5e03e0&_nc_cat=107',
        name: 'Ilay',
      },
      history: [
        outgoingChatMessage.latestMessage,
        incomingChatMessage.latestMessage,
      ],
    },
  },
};
