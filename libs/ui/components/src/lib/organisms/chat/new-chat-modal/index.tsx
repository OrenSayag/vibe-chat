import { FC } from 'react';
import { NewChatModalProps } from '@monday-whatsapp/shared-types';
import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@vibe/core';

export const NewChatModal: FC<NewChatModalProps> = ({
  onClose,
  active,
  onConfirm,
}) => {
  return (
    <>
      <Modal
        id="modal-basic"
        show={Boolean(active)}
        onClose={onClose}
        title={'New Chat'}
      >
        <ModalHeader
          title="New Chat"
          description={
            <Text type="text1">Select existing contact or message new</Text>
          }
        />
        <ModalContent>
          <Text>some content</Text>
        </ModalContent>
        <ModalFooter>
          <Flex gap={'medium'} justify={'end'}>
            <Button onClick={() => onConfirm('somephonenumbreid')}>
              New Chat
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Flex>
        </ModalFooter>
      </Modal>
    </>
  );
};
