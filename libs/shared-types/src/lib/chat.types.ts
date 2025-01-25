import { Message, WhatsappMessageType } from './whatsapp.types';
import { BackendBaseResponse, GetListState } from './app.types';
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
  onSend(txt: string): void;
  disabled?: boolean;
  type?: 'text-area' | 'text';
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

export type ChatProps = {
  className?: string;
  listProps: ChatListProps;
  sessionProps?: ChatSessionProps;
  loading?: boolean;
  error?: boolean;
};

export const GET_CHAT_LIST_RESULTS_PER_PAGE = 25;

export const GET_CHAT_SESSION_HISTORY_RESULTS_PER_PAGE = 100;

export const messageType = z.union([
  z.literal(WhatsappMessageType.TEXT),
  z.literal(WhatsappMessageType.DOCUMENT),
]);

export const sendMessageRequestBodySchema = z.object({
  to: z.string(),
  text: z.object({
    body: z.string(),
  }),
});

export type SendMessageRequestBody = z.infer<
  typeof sendMessageRequestBodySchema
>;
