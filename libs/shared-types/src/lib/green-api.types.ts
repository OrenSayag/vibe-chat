import { BackendBaseResponse } from './app.types';

export enum GreenApiInstanceStatus {
  CONNECTED = 'authorized',
  NOT_CONNECTED = 'notAuthorized',
  BLOCKED = 'blocked',
  SLEEP_MODE = 'sleepMode',
  YELLOW_CARD = 'yellowCard',
  STARTING = 'starting',
  MISSING_GREEN_API_INSTANCE_INFO = 'missing-green-api-instance-info',
  INVALID_GREEN_API_INSTANCE_INFO = 'invalid-green-api-instance-info',
}

export type GreenApiInstanceInfo = {
  instanceId: string;
  token: string;
};

export const mondayStorageGreenApiTokenKey = (instanceId: string) =>
  `green-api-token-${instanceId}`;

export type GreenApiInstanceState = {
  wid: string;
  status:
    | 'authorized'
    | 'notAuthorized'
    | 'sleepMode'
    | 'starting'
    | 'blocked'
    | 'yellowCard';
};

export const instanceStateAppStatusMap: Record<
  GreenApiInstanceState['status'],
  GreenApiInstanceStatus
> = {
  authorized: GreenApiInstanceStatus.CONNECTED,
  blocked: GreenApiInstanceStatus.BLOCKED,
  notAuthorized: GreenApiInstanceStatus.NOT_CONNECTED,
  sleepMode: GreenApiInstanceStatus.SLEEP_MODE,
  starting: GreenApiInstanceStatus.STARTING,
  yellowCard: GreenApiInstanceStatus.CONNECTED,
};

export type LogoutResponse = BackendBaseResponse<undefined>;

export type GetQrCodeResponse = BackendBaseResponse<{ qr: string }>;

export type GreenApiNotification = {
  typeWebhook: 'stateInstanceChanged' | string;
  stateInstance: 'notAuthorized' | 'authorized' | string;
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
};
export type GetNotificationResponse = BackendBaseResponse<
  GreenApiNotification | undefined
>;

enum MessageType {
  Incoming = 'incoming',
  Outgoing = 'outgoing',
}

enum StatusMessage {
  NoAccount = 'noAccount',
  NotInGroup = 'notInGroup',
  Pending = 'pending',
  Sent = 'sent',
  Delivered = 'delivered',
  Read = 'read',
  YellowCard = 'yellowCard',
}

enum TypeMessage {
  TextMessage = 'textMessage',
  ImageMessage = 'imageMessage',
  VideoMessage = 'videoMessage',
  DocumentMessage = 'documentMessage',
  AudioMessage = 'audioMessage',
  StickerMessage = 'stickerMessage',
  ReactionMessage = 'reactionMessage',
  LocationMessage = 'locationMessage',
  ContactMessage = 'contactMessage',
  ExtendedTextMessage = 'extendedTextMessage',
  PollMessage = 'pollMessage',
  PollUpdateMessage = 'pollUpdateMessage',
  IncomingBlock = 'incomingBlock',
  QuotedMessage = 'quotedMessage',
  ButtonsMessage = 'buttonsMessage',
  TemplateMessage = 'templateMessage',
  ListMessage = 'listMessage',
  ButtonsResponseMessage = 'buttonsResponseMessage',
  TemplateButtonsReplyMessage = 'templateButtonsReplyMessage',
  ListResponseMessage = 'listResponseMessage',
}

interface Location {
  nameLocation: string;
  address: string;
  latitude: number;
  longitude: number;
  jpegThumbnail: string;
  isForwarded: boolean;
  forwardingScore: number;
}

interface Contact {
  displayName: string;
  vcard: string;
  isForwarded: boolean;
  forwardingScore: number;
}

interface ExtendedTextMessage {
  text: string;
  description: string;
  title: string;
  previewType: string;
  jpegThumbnail: string;
  forwardingScore: number;
  isForwarded: boolean;
  stanzaId: string;
  participant: string;
}

interface ExtendedTextMessageData {
  text: string;
}

interface PollMessageData {
  name: string;
  options: { optionName: string }[];
  votes: { optionName: string; optionVoters: string[] }[];
  multipleAnswers: boolean;
}

interface QuotedMessage {
  stanzaId: string;
  participant: string;
  typeMessage: TypeMessage;
}

interface MessageBase {
  type: MessageType;
  idMessage: string;
  timestamp: number;
  typeMessage: TypeMessage;
  chatId: string;
  isForwarded: boolean;
  forwardingScore: number;
  textMessage?: string;
  downloadUrl?: string;
  caption?: string;
  fileName?: string;
  jpegThumbnail?: string;
  mimeType?: string;
  isAnimated?: boolean;
  location?: Location;
  contact?: Contact;
  extendedTextMessage?: ExtendedTextMessage;
  extendedTextMessageData?: ExtendedTextMessageData;
  pollMessageData?: PollMessageData;
  quotedMessage?: QuotedMessage;
}

export interface IncomingMessage extends MessageBase {
  senderId: string;
  senderName: string;
  senderContactName: string;
  chatState?: string;
}

export interface OutgoingMessage extends MessageBase {
  statusMessage: StatusMessage;
  sendByApi: boolean;
}

export type ChatMessage = IncomingMessage | OutgoingMessage;
