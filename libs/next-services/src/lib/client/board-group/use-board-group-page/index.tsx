import {
  Board,
  BoardItem,
  GetAuthState,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import { useEffect, useState } from 'react';
import { getItems } from '@monday-whatsapp/monday';
import { useBoardLevelAuth } from '@monday-whatsapp/next-services';

type Input = {
  subscriptionId: number;
  subscriptionInfo: SubscriptionInfo;
};

type Output = {
  onSendMessage(text: string): void;
  selectedPhoneColumn?: string;
  onSelectPhoneColumn(is: string): void;
  items?: BoardItem[];
  authState: GetAuthState;
  board?: Board;
};

export const useBoardGroupPage = ({
  subscriptionId,
  subscriptionInfo,
}: Input): Output => {
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
    board,
    authState,
    items,
    onSelectPhoneColumn: setSelectedPhoneColumn,
    selectedPhoneColumn,
    onSendMessage(text: string) {
      console.log(`Should send message: ${text}`);
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
