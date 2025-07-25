'use client';

import { FC } from 'react';
import { cn } from '@vibe-chat/ui-utils';
import { Heading } from '@vibe/core';
import { Board, ChatProps } from '@vibe-chat/shared-types';
import { ColumnSelector } from '../../molecules/column-selector';
import { ChatLayout } from '../../organisms/chat/chat-layout';

interface Props {
  className?: string;
  board: Board;
  onSelectDefaultPhoneColumn(id: string): void;
  pendingSelectDefaultPhoneColumn?: boolean;
  chatProps: ChatProps;
}

export const BoardTemplate: FC<Props> = ({
  className,
  board,
  pendingSelectDefaultPhoneColumn,
  onSelectDefaultPhoneColumn,
  chatProps,
}) => {
  return (
    <>
      <div
        style={{
          height: '100%',
        }}
      >
        <ChatLayout {...chatProps} />
      </div>
    </>
  );
};

function Settings({
  board,
  onSelectDefaultPhoneColumn,
  pendingSelectDefaultPhoneColumn,
}: {
  board: Props['board'];
  onSelectDefaultPhoneColumn: Props['onSelectDefaultPhoneColumn'];
  pendingSelectDefaultPhoneColumn?: Props['pendingSelectDefaultPhoneColumn'];
}) {
  return (
    <div>
      <Heading type={'h3'}>Default phone column:</Heading>
      <ColumnSelector
        type={'phone'}
        columns={board.columns}
        onSelect={onSelectDefaultPhoneColumn}
        selectedId={board.defaultPhoneColumnId}
        pendingSelect={pendingSelectDefaultPhoneColumn}
      />
    </div>
  );
}
