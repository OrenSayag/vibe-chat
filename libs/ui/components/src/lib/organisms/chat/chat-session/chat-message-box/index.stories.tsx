import { Meta, StoryObj } from '@storybook/react';
import { ChatMessageBox } from './index';
import {
  ChatListItem as ChatListItemData,
  MessageDirection,
  MessageStatus,
  WhatsappMessageType,
} from '@vibe-chat/shared-types';
import { templates } from '../../../../molecules/whatsapp-message-template-selector/story-assets';

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

const meta: Meta<typeof ChatMessageBox> = {
  component: ChatMessageBox,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatMessageBox>;

export const Incoming: Story = {
  args: {
    message: incomingChatMessage.latestMessage,
  },
};

export const Outgoing: Story = {
  args: {
    message: outgoingChatMessage.latestMessage,
  },
};

export const Template: Story = {
  args: {
    message: {
      id: 'someid',
      message: {
        type: WhatsappMessageType.TEMPLATE,
        template: {
          name: templates[0].name,
          language: {
            code: templates[0].language,
          },
        },
      },
      from: 'me',
      timestamp: outgoingChatMessage.latestMessage!.timestamp,
      direction: MessageDirection.OUTGOING,
      status: MessageStatus.DELIVERED,
    },
    template: templates[0],
  },
};
