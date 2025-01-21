import { Meta, StoryObj } from '@storybook/react';
import { ChatMessageBox } from './index';
import {
  ChatListItem as ChatListItemData,
  MessageType,
  StatusMessage,
  TypeMessage,
} from '@monday-whatsapp/shared-types';
import { ThemeProvider } from '@vibe/core';

const outgoingChatMessage: ChatListItemData = {
  chatId: '972504506225@c.us',
  avatarSrc:
    'https://pps.whatsapp.net/v/t61.24694-24/439076101_965804545042779_7683015297817172094_n.jpg?ccb=11-4&oh=01_Q5AaIEEef2buVf7H4d6FmnykDTPCYFOyi5i68MqzGknY1_T_&oe=679C3C2F&_nc_sid=5e03e0&_nc_cat=102',
  name: 'Oren',
  latestMessage: {
    type: 'outgoing' as MessageType.Outgoing,
    idMessage: 'BAE5F8A1D06487A4',
    timestamp: 1737352566,
    typeMessage: 'extendedTextMessage' as TypeMessage.ExtendedTextMessage,
    chatId: '972504506225@c.us',
    textMessage: 'test multiple items view',
    extendedTextMessage: {
      text: 'test multiple items view',
      description: '',
      title: '',
      previewType: 'None',
      jpegThumbnail: '',
      forwardingScore: 0,
      isForwarded: false,
    },
    statusMessage: 'delivered' as StatusMessage.Delivered,
    sendByApi: true,
  },
};

const incomingChatMessage: ChatListItemData = {
  chatId: '972504506225@c.us',
  avatarSrc:
    'https://pps.whatsapp.net/v/t61.24694-24/362291313_1502482213898085_5283722348083602419_n.jpg?ccb=11-4&oh=01_Q5AaIBoEZ3t1kXpOLLv0mkTQTk7bKEd7q8oWSHtyoO1zxIvv&oe=679B0550&_nc_sid=5e03e0&_nc_cat=107',
  name: 'Ilay',
  latestMessage: {
    type: MessageType.Incoming,
    idMessage: 'C43426CEDA1743500A19106890D26E6B',
    timestamp: 1737358862,
    typeMessage: TypeMessage.QuotedMessage,
    chatId: '972504506225@c.us',
    extendedTextMessage: {
      text: 'נייייססס',
      stanzaId: '3EB00B2B56AE04DBDFF520',
      participant: '972542090500@c.us',
    },
    senderId: '972504506225@c.us',
    senderName: 'Ilay',
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
