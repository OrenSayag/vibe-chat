import {
  ChatHistory,
  ChatListItem,
  EventType,
  Message,
  SendMessageRequest,
  UpdateMessageStatusEventPayload,
} from '@vibe-chat/shared-types';
import { useSocket } from '@vibe-chat/next-services';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Input = {
  list: ChatListItem[];
  sessionHistory?: ChatHistory;
  subscriptionId?: string;
};

type Output = {
  list: ChatListItem[];
  sessionHistory?: ChatHistory;
  sendMessage(input: SendMessageRequest): void;
};

export const useChatEvents = ({
  list,
  sessionHistory,
  subscriptionId,
}: Input): Output => {
  const socket = useSocket({
    subscriptionId,
  });
  const [updatedList, setUpdatedList] = useState(list);
  const [updatedHistory, setUpdatedHistory] = useState(sessionHistory);

  useEffect(() => {
    setUpdatedList(list);
  }, [list]);

  useEffect(() => {
    setUpdatedHistory(sessionHistory);
  }, [sessionHistory]);

  const updateHistory = useCallback(
    (message: Message) => {
      if (!updatedHistory?.history) {
        return;
      }
      const currHistory: ChatHistory = JSON.parse(
        JSON.stringify(updatedHistory)
      );
      const existingMessage = currHistory.history.find(
        (r) => r.id === message.id
      );
      if (existingMessage) {
        currHistory.history = currHistory!.history.map((m) => {
          if (m.id === message.id) {
            return message;
          }
          return m;
        });
      } else {
        currHistory.history = [message, ...currHistory.history];
      }
      setUpdatedHistory(currHistory);
    },
    [sessionHistory, updatedHistory]
  );

  const updateList = useCallback(
    (payload: UpdateMessageStatusEventPayload) => {
      if (!updatedList) {
        return;
      }
      const item = updatedList.find(
        (item) => item.phoneNumberId === payload.contactPhoneNumberId
      );
      if (item) {
        setUpdatedList((prev) =>
          updatedList.map((it) => {
            if (it.phoneNumberId === item.phoneNumberId) {
              return { ...it, latestMessage: payload.message };
            }
            return it;
          })
        );
      } else {
        setUpdatedList((prev) => [
          {
            latestMessage: payload.message,
            phoneNumberId: payload.contactPhoneNumberId,
            name: payload.contactPhoneNumberId,
          },
          ...prev,
        ]);
      }
    },
    [list, updatedList]
  );

  const sortedList = useMemo(() => {
    return updatedList.sort((a, b) => {
      const aVal = Number(a.latestMessage?.timestamp ?? 0);
      const bVal = Number(b.latestMessage?.timestamp ?? 0);
      return bVal - aVal;
    });
  }, [updatedList]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(
      EventType.UPDATE_MESSAGE_STATUS,
      (data: { data: UpdateMessageStatusEventPayload }) => {
        console.log('Received event UPDATE_MESSAGE_STATUS');
        console.log({
          data,
        });
        updateHistory(data.data.message);
        updateList(data.data);
      }
    );

    return () => {
      socket.off(EventType.UPDATE_MESSAGE_STATUS);
    };
  }, [socket, updateHistory]);

  const sendMessage = useCallback(
    (input: SendMessageRequest) => {
      if (!socket || !updatedHistory?.contact) {
        return;
      }
      socket.emit(
        EventType.SEND_MESSAGE,
        { ...input, to: updatedHistory.contact.phoneNumberId },
        (res: Message) => {
          setUpdatedHistory((prev) => {
            if (!prev) {
              return;
            }
            return {
              ...prev,
              history: [res, ...prev.history],
            };
          });
        }
      );
    },
    [socket, updatedHistory?.contact.phoneNumberId]
  );
  return {
    list: sortedList,
    sessionHistory: updatedHistory,
    sendMessage,
  };
};
