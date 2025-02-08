import { Board, BoardItem, SubscriptionInfo } from '@vibe-chat/shared-types';
import { useEffect, useState } from 'react';
import { extractBoardItemPhoneByColumn, getItems } from '@vibe-chat/monday';
import { useBoardLevelAuth } from '@vibe-chat/next-services';
import { phoneNumberToGreenChatId } from '@vibe-chat/utils';

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
        alert('onSendMessage: not implemented');
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
