'use client';

import { FC, useMemo, useState } from 'react';
import { NewChatModalProps } from '@vibe-chat/shared-types';
import {
  Box,
  Button,
  Dropdown,
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  TextField,
} from '@vibe/core';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';

export const NewChatModal: FC<NewChatModalProps> = ({
  onClose,
  active,
  onConfirm,
  pendingGetContacts,
  contacts,
  errorGetContacts,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const validPhoneNumber = useMemo(() => {
    return parsePhoneNumber(phoneNumber)?.isValid();
  }, [phoneNumber]);
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
            <Text type="text2">
              Select a board contact or enter phone number
            </Text>
          }
        />
        <ModalContent>
          <div
            style={{
              width: '15em',
              height: '30vh',
              marginTop: '1em',
            }}
          >
            <div>
              <Dropdown
                disabled={Boolean(errorGetContacts)}
                options={contacts}
                defaultValue={[
                  contacts?.find(
                    (c) => c.value === phoneNumber.replace(`+`, '')
                  ),
                ].filter(Boolean)}
                isLoading={pendingGetContacts}
                placeholder={
                  errorGetContacts
                    ? 'Error getting contacts. Please try later'
                    : contacts && contacts.length === 0
                    ? 'No contacts'
                    : 'Select a contact'
                }
                onChange={(o) => {
                  if (!o) {
                    return;
                  }
                  setPhoneNumber(`+${o.value}`);
                }}
              />
            </div>
            <Box marginTop={'medium'}>
              <PhoneInput
                inputComponent={TextField}
                value={phoneNumber}
                onChange={(val) => setPhoneNumber(val ?? '')}
              />
            </Box>
          </div>
        </ModalContent>
        <ModalFooter>
          <Box>
            <Flex gap={'medium'} justify={'end'}>
              <Button
                onClick={() => onConfirm(phoneNumber)}
                disabled={!validPhoneNumber}
              >
                New Chat
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Flex>
          </Box>
        </ModalFooter>
      </Modal>
    </>
  );
};
