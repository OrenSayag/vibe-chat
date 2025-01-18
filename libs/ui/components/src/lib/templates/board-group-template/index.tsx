import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { BoardColumn, BoardItem } from '@monday-whatsapp/shared-types';
import { Box, Text } from '@vibe/core';
import { ColumnSelector } from '../../molecules/column-selector';
import { SingleMessageSender } from '../../molecules/single-message-sender';

interface Props {
  className?: string;
  items: BoardItem[];
  boardColumns: BoardColumn[];
  onSendMessage(text: string): void;
  selectedPhoneColumn?: string;
  onSelectPhoneColumn(id: string): void;
}

export const BoardGroupTemplate: FC<Props> = ({
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
        <PhoneColumnSelector
          onSelectPhoneColumn={onSelectPhoneColumn}
          cols={boardColumns}
          selectedPhoneColumn={selectedPhoneColumn}
        />
        <SingleMessageSender className={'w-full'} onSend={onSendMessage} />
        <ItemsList items={items} phoneColumnId={selectedPhoneColumn} />
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
      {phoneColumnId && (
        <Text>Send message to {items.length} items in group</Text>
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
  selectedPhoneColumn?: Props['selectedPhoneColumn'];
  onSelectPhoneColumn: Props['onSelectPhoneColumn'];
  cols: BoardColumn[];
}) {
  return (
    <div>
      <Box marginBottom={'small'}>
        <Text>Will send message to group items based on phone column:</Text>
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
