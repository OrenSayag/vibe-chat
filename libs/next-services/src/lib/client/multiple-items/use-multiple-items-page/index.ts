import {
  Board,
  BoardItem,
  GetAuthState,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import { useEffect, useState } from 'react';
import {
  extractBoardItemPhoneByColumn,
  getItemsByIds,
  monday,
} from '@monday-whatsapp/monday';
import { useBoardLevelAuth } from '@monday-whatsapp/next-services';
import { useSendTextMessage } from '../../green-api/use-send-text-message';
import { phoneNumberToGreenChatId } from '@monday-whatsapp/utils';
import { SingleMessageSenderProps } from '@monday-whatsapp/components';

type Input = {
  subscriptionId: number;
  subscriptionInfo: SubscriptionInfo;
};

type Output = {
  singleMessageSenderProps: SingleMessageSenderProps;
  authState: GetAuthState;
};

export const useMultipleItemsPage = ({
  subscriptionId,
  subscriptionInfo,
}: Input): Output => {
  const { board, groupId, authState } = useBoardLevelAuth({
    subscriptionInfo,
  });

  const { items } = useItems();

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

function useItems() {
  const [items, setItems] = useState<BoardItem[]>();
  useEffect(() => {
    monday.get('context').then((res) => {
      const ids = (res.data as any).selectedPulsesIds;
      getItemsByIds({ ids })
        .then(({ items }) => setItems(items))
        .catch((e) => {
          console.log('Error getting items.');
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
