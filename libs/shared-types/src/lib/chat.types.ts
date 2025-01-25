import { Message } from './whatsapp.types';
import { BackendBaseResponse, baseGetListParams } from './app.types';
import { z } from 'zod';

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
  onSend(txt: string): void;
  disabled?: boolean;
  type?: 'text-area' | 'text';
};

export type ChatSessionProps = {
  className?: string;
} & (
  | {
      type: 'available';
      history: ChatHistory;
      headerProps: ChatSessionHeaderProps;
      messageInputAndActionProps: MessageInputAndActionProps;
      onLoadMore(): void;
    }
  | {
      type: 'error' | 'loading';
    }
);

export type ChatProps = {
  className?: string;
  listProps: ChatListProps;
  sessionProps?: ChatSessionProps;
  loading?: boolean;
  error?: boolean;
};
