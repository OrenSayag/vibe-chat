export type ChatListItem = {
  avatarSrc?: string;
  isGroup?: boolean;
  chatId: string;
  name: string;
  // latestMessage: ChatMessage;
};

export type ChatHistory = {
  // history: ChatMessage[];
  contact: Omit<ChatListItem, 'latestMessage'>;
};
