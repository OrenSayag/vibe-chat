import { Message } from './whatsapp/whatsapp.types';
import { BackendBaseResponse, GetListState, ListItem } from './app.types';
import { z } from 'zod';
import { CSSProperties } from 'react';
import { WhatsappMessage } from './whatsapp/whatsapp-messages.types';

export type ChatListItem = {
  avatarSrc?: string;
  isGroup?: boolean;
  phoneNumberId: string;
  displayPhoneNumber?: string;
  contactName?: string;
  name: string;
  latestMessage?: Message;
};

export type ChatHistory = {
  history: Message[];
  contact: Omit<ChatListItem, 'latestMessage'>;
};

export const getChatListParamsSchema = z.object({
  subscriptionId: z
    .string()
    .refine((s) => !Number.isNaN(Number(s)))
    .transform((s) => Number(s)),
});

export type GetChatListParams = z.infer<typeof getChatListParamsSchema>;

export type GetChatListResponse = BackendBaseResponse<{
  list: ChatListItem[];
  hasMore?: boolean;
}>;

export const getChatSessionParamsSchema = z.object({
  subscriptionId: z
    .string()
    .refine((s) => !Number.isNaN(Number(s)))
    .transform((s) => Number(s)),
  phoneNumberId: z.string().min(1),
});

export type GetChatSessionParams = z.infer<typeof getChatSessionParamsSchema>;

export type GetChatSessionResponse = BackendBaseResponse<{
  hasMore?: boolean;
  history: ChatHistory;
}>;

export type ChatListProps = {
  className?: string;
  onLoadMore?(): void;
  list: ChatListItem[];
  selectedChatId?: string;
  onSelectChat(id: string): void;
  state: GetListState;
};

export type ChatSessionHeaderProps = {
  className?: string;
  avatarSrc?: string;
  name: string;
  lastSeen?: number;
  isOnline?: boolean;
};

export type MessageInputAndActionProps = {
  className?: string;
  onSend(input: WhatsappMessage): void;
  disabled?: boolean;
  type?: 'text-area' | 'text';
  style?: CSSProperties;
  templatesOnly?: boolean;
  templates: {}[];
};

export type ChatSessionProps = {
  className?: string;
} & (
  | {
      state: 'available';
      history: ChatHistory;
      headerProps: ChatSessionHeaderProps;
      messageInputAndActionProps: MessageInputAndActionProps;
      onLoadMore(): void;
    }
  | {
      state: 'error' | 'loading';
    }
);

export type ChatMasterHeaderProps = {
  onNewChat(): void;
};

export type ChatProps = {
  className?: string;
  listProps: ChatListProps;
  sessionProps?: ChatSessionProps;
  loading?: boolean;
  error?: boolean;
  masterHeaderProps: ChatMasterHeaderProps;
  newChatModalProps: NewChatModalProps;
};

export const GET_CHAT_LIST_RESULTS_PER_PAGE = 25;

export const GET_CHAT_SESSION_HISTORY_RESULTS_PER_PAGE = 100;

export type NewChatModalProps = {
  onClose(): void;
  onConfirm(phoneNumberId: string): void;
  active?: boolean;
  contacts?: ListItem[];
  pendingGetContacts?: boolean;
  errorGetContacts?: string;
};
