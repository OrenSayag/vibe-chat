import { Meta, StoryObj } from '@storybook/react';
import { ChatLayout } from '.';
import {
  ChatHistory,
  ChatListItem as ChatListItemData,
  MessageType,
  StatusMessage,
  TypeMessage,
} from '@monday-whatsapp/shared-types';
import { useMemo, useState } from 'react';

const outgoingChatMessage: ChatListItemData = {
  chatId: '972542090500@c.us',
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

const sessions: ChatHistory[] = [
  {
    history: [
      incomingChatMessage.latestMessage,
      outgoingChatMessage.latestMessage,
    ],
    contact: {
      chatId: '972504506225@c.us',
      avatarSrc:
        'https://pps.whatsapp.net/v/t61.24694-24/362291313_1502482213898085_5283722348083602419_n.jpg?ccb=11-4&oh=01_Q5AaIBoEZ3t1kXpOLLv0mkTQTk7bKEd7q8oWSHtyoO1zxIvv&oe=679B0550&_nc_sid=5e03e0&_nc_cat=107',
      name: 'Ilay',
    },
  },
  {
    history: [
      incomingChatMessage.latestMessage,
      outgoingChatMessage.latestMessage,
    ],
    contact: {
      chatId: '972542090500@c.us',
      avatarSrc:
        'https://pps.whatsapp.net/v/t61.24694-24/439076101_965804545042779_7683015297817172094_n.jpg?ccb=11-4&oh=01_Q5AaIEEef2buVf7H4d6FmnykDTPCYFOyi5i68MqzGknY1_T_&oe=679C3C2F&_nc_sid=5e03e0&_nc_cat=102',
      name: 'Oren',
    },
  },
];

const meta: Meta<typeof ChatLayout> = {
  component: ChatLayout,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
  render(args) {
    const [selectedChatId, setSelectedChatId] = useState(
      args.listProps.selectedChatId
    );
    const session = useMemo(
      () => sessions.find((s) => s.contact.chatId == selectedChatId),
      [selectedChatId]
    );
    return (
      <ChatLayout
        {...args}
        listProps={{
          ...args.listProps,
          onSelectChat: setSelectedChatId,
          selectedChatId,
        }}
        sessionProps={
          session
            ? {
                history: session,
                headerProps: {
                  name: session.contact.name,
                  avatarSrc: session.contact.avatarSrc,
                },
                messageInputAndActionProps: {
                  onSend(txt: string) {},
                },
              }
            : undefined
        }
      />
    );
  },
  args: {
    listProps: {
      list: [outgoingChatMessage, incomingChatMessage],
      selectedChatId: incomingChatMessage.chatId,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatLayout>;

export const Primary: Story = {
  args: {},
};
