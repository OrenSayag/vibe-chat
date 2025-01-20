import {
  Board,
  BoardItem,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import { useEffect, useState } from 'react';
import {
  extractBoardItemPhoneByColumn,
  getItem,
  monday,
} from '@monday-whatsapp/monday';
import { useBoardLevelAuth } from '@monday-whatsapp/next-services';
import { useSendTextMessage } from '../../green-api/use-send-text-message';
import { phoneNumberToGreenChatId } from '@monday-whatsapp/utils';

type Input = {
  subscriptionId?: number;
  subscriptionInfo?: SubscriptionInfo;
};

export const useItemPage = ({ subscriptionId, subscriptionInfo }: Input) => {
  const { board, authState } = useBoardLevelAuth({
    subscriptionInfo,
  });

  const { items } = useItem();

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

function useItem() {
  const [items, setItems] = useState<BoardItem[]>();
  useEffect(() => {
    monday.get('context').then((res) => {
      const { itemId } = res.data as any;
      getItem({ itemId })
        .then(({ item }) => setItems([item]))
        .catch((e) => {
          console.log('Error getting item.');
          console.log(e);
        });
    });
  }, []);
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
