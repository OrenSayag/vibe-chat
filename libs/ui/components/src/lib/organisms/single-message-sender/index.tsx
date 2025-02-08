'use client';
import { FC } from 'react';
import { cn } from '@vibe-chat/ui-utils';
import { BoardColumn, BoardItem } from '@vibe-chat/shared-types';
import { Box, Text } from '@vibe/core';
import { ColumnSelector } from '../../molecules/column-selector';
import { MessageInputAndAction } from '../../molecules/message-input-and-action';

export interface SingleMessageSenderProps {
  className?: string;
  items?: BoardItem[];
  boardColumns?: BoardColumn[];
  onSendMessage(text: string): void;
  selectedPhoneColumn?: string;
  onSelectPhoneColumn(id: string): void;
}

export const SingleMessageSender: FC<SingleMessageSenderProps> = ({
  className,
  items,
  onSendMessage,
  boardColumns,
  onSelectPhoneColumn,
  selectedPhoneColumn,
}) => {
  if (items?.length === 0) {
    return <NoItems />;
  }
  return (
    <>
      <div className={cn(className)}>
        {boardColumns && (
          <PhoneColumnSelector
            onSelectPhoneColumn={onSelectPhoneColumn}
            cols={boardColumns}
            selectedPhoneColumn={selectedPhoneColumn}
          />
        )}
        <MessageInputAndAction
          className={'w-full'}
          onSend={onSendMessage}
          disabled={!boardColumns?.some((bc) => bc.id == selectedPhoneColumn)}
        />
        <ItemsList items={items!} phoneColumnId={selectedPhoneColumn} />
      </div>
    </>
  );
};

function ItemsList({
  items,
  className,
  phoneColumnId,
}: {
  items: BoardItem[];
  className?: string;
  phoneColumnId?: string;
}) {
  return (
    <div className={cn(className)}>
      {!phoneColumnId && (
        <Text>To send a message, please select a phone column</Text>
      )}
      {phoneColumnId && items.length > 1 && (
        <Text>Send message to {items.length} items</Text>
      )}
    </div>
  );
}

function NoItems() {
  return (
    <Box>
      <Text>This group has no items. Cannot send message</Text>
    </Box>
  );
}

function PhoneColumnSelector({
  selectedPhoneColumn,
  cols,
  onSelectPhoneColumn,
}: {
  selectedPhoneColumn?: SingleMessageSenderProps['selectedPhoneColumn'];
  onSelectPhoneColumn: SingleMessageSenderProps['onSelectPhoneColumn'];
  cols: BoardColumn[];
}) {
  return (
    <div>
      <Box marginBottom={'small'}>
        <Text>Will send message based on phone column:</Text>
      </Box>
      <ColumnSelector
        type={'phone'}
        columns={cols}
        onSelect={onSelectPhoneColumn}
        selectedId={selectedPhoneColumn}
      />
    </div>
  );
}
