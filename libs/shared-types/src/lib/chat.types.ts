import { Message } from './whatsapp.types';

export type ChatListItem = {
  avatarSrc?: string;
  isGroup?: boolean;
  phoneNumberId: string;
  displayPhoneNumber?: string;
  contactName?: string;
  name: string;
  latestMessage: Message;
};

export type ChatHistory = {
  history: Message[];
  contact: Omit<ChatListItem, 'latestMessage'>;
};
