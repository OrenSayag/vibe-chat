'use client';

import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Heading } from '@vibe/core';
import { Board } from '@monday-whatsapp/shared-types';
import { ColumnSelector } from '../../molecules/column-selector';

interface Props {
  className?: string;
  board: Board;
  onSelectDefaultPhoneColumn(id: string): void;
  pendingSelectDefaultPhoneColumn?: boolean;
}

export const BoardTemplate: FC<Props> = ({
  className,
  board,
  pendingSelectDefaultPhoneColumn,
  onSelectDefaultPhoneColumn,
}) => {
  return (
    <>
      <div className={cn(className)}>
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
      </div>
    </>
  );
};
