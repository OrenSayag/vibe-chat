import { ListItem, NewChatModalProps } from '@vibe-chat/shared-types';
import { useEffect, useState, useTransition } from 'react';
import { getCurrentBoardItems } from '@vibe-chat/monday';

type Input = {
  onNewChat(phoneNumber: string): void;
};

type Output = NewChatModalProps & {
  onOpen(): void;
};

export const useNewChatModal = ({ onNewChat }: Input): Output => {
  const [active, setActive] = useState<boolean>();
  const { error, pending, contacts } = useGetBoardContacts();
  return {
    active,
    contacts,
    onClose() {
      setActive(false);
    },
    onConfirm(phoneNumber: string) {
      onNewChat(phoneNumber.replace(`+`, ''));
      setActive(false);
    },
    pendingGetContacts: pending,
    errorGetContacts: error,
    onOpen() {
      setActive(true);
    },
  };
};

function useGetBoardContacts() {
  const [contacts, setContacts] = useState<NewChatModalProps['contacts']>();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string>();
  const action = async () => {
    try {
      const boardItems = await getCurrentBoardItems({
        columnTypeFilter: ['phone'],
      });
      const contacts: ListItem[] = [];
      boardItems.forEach((bi) => {
        const { name, column_values } = bi;
        column_values.forEach((column) => {
          if (column.type !== 'phone' || !column.value) {
            return;
          }
          contacts.push({
            label: name,
            value: JSON.parse(column.value).phone,
          });
        });
      });
      setContacts(contacts);
    } catch (error) {
      console.log(error);
      console.log('Error getting board contact list');
      setError('Error getting board contact list');
    }
  };
  const onGetBoardContacts = () => {
    start(() => {
      return action();
    });
  };
  useEffect(() => {
    onGetBoardContacts();
  }, []);
  return {
    pending,
    error,
    contacts,
  };
}
