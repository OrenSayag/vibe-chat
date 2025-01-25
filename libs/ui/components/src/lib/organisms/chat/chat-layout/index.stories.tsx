import { Meta, StoryObj } from '@storybook/react';
import { ChatLayout } from '.';
import {
  ChatHistory,
  ChatListItem as ChatListItemData,
  MessageDirection,
  MessageStatus,
} from '@monday-whatsapp/shared-types';
import { useMemo, useState } from 'react';

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
    type: 'text',
    text: {
      body: 'hello',
    },
    timestamp: '1737352566',
    status: MessageStatus.SENT,
    from: 'somephonenumberidww',
    direction: MessageDirection.INCOMING,
    id: '2093482390',
  },
};

const sessions: ChatHistory[] = [
  {
    history: [
      incomingChatMessage.latestMessage,
      outgoingChatMessage.latestMessage,
    ],
    contact: {
      phoneNumberId: '972504506225@c.us',
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
      phoneNumberId: '972542090500@c.us',
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
      () => sessions.find((s) => s.contact.phoneNumberId == selectedChatId),
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
      selectedChatId: incomingChatMessage.phoneNumberId,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatLayout>;

export const Primary: Story = {
  args: {},
};
