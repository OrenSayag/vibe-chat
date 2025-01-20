import {
  Board,
  BoardItem,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import { useEffect, useState } from 'react';
import {
  extractBoardItemPhoneByColumn,
  getItems,
} from '@monday-whatsapp/monday';
import { useBoardLevelAuth } from '@monday-whatsapp/next-services';
import { useSendTextMessage } from '../../green-api/use-send-text-message';
import { phoneNumberToGreenChatId } from '@monday-whatsapp/utils';

type Input = {
  subscriptionId?: number;
  subscriptionInfo?: SubscriptionInfo;
};

export const useBoardGroupPage = ({
  subscriptionId,
  subscriptionInfo,
}: Input) => {
  const { board, groupId, authState } = useBoardLevelAuth({
    subscriptionInfo,
  });

  const { items } = useItems({
    boardId: board?.id.toString(),
    groupId,
  });

  const { selectedPhoneColumn, setSelectedPhoneColumn } = usePhoneColumn({
    board,
  });

  const { sendTextMessage } = useSendTextMessage({
    subscriptionId,
  });

  return {
    authState,
    singleMessageSenderProps: {
      boardColumns: board?.columns,
      items,
      onSelectPhoneColumn: setSelectedPhoneColumn,
      selectedPhoneColumn,
      onSendMessage(text: string) {
        if (!items || !selectedPhoneColumn) {
          return;
        }
        const phoneNumbers = items.map((it) =>
          extractBoardItemPhoneByColumn({
            columnId: selectedPhoneColumn,
            boardItem: it,
          })
        );
        const chatIds = phoneNumbers
          .filter(Boolean)
          .map((phoneNumber) => phoneNumberToGreenChatId(phoneNumber!));
        sendTextMessage({
          message: text,
          chatIds,
        });
      },
    },
  };
};

function useItems({
  groupId,
  boardId,
}: {
  groupId?: string;
  boardId?: string;
}) {
  const [items, setItems] = useState<BoardItem[]>();
  useEffect(() => {
    if (!groupId || !boardId) {
      return;
    }
    getItems({ groupId, boardId })
      .then(({ items }) => setItems(items))
      .catch((e) => {
        console.log('Error getting items.');
        console.log(e);
      });
  }, [groupId, boardId]);
  return {
    items,
  };
}

function usePhoneColumn({ board }: { board?: Board }) {
  const [selectedPhoneColumn, setSelectedPhoneColumn] = useState<string>();
  useEffect(() => {
    if (!selectedPhoneColumn && board?.defaultPhoneColumnId) {
      setSelectedPhoneColumn(board.defaultPhoneColumnId);
    }
  }, [board?.defaultPhoneColumnId]);
  return {
    selectedPhoneColumn,
    setSelectedPhoneColumn,
  };
}
