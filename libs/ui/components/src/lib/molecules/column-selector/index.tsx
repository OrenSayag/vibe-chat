import { FC, useMemo } from 'react';
import { Dropdown } from '@vibe/core';
import { BoardColumn, ListItem } from '@monday-whatsapp/shared-types';

interface Props {
  className?: string;
  columns: BoardColumn[];
  onSelect(id: string): void;
  selectedId?: string;
  type?: 'phone';
  pendingSelect?: boolean;
}

export const ColumnSelector: FC<Props> = ({
  className,
  columns,
  selectedId,
  onSelect,
  type,
  pendingSelect,
}) => {
  const options = useMemo<ListItem[]>(() => {
    let filtered = columns;
    switch (type) {
      case 'phone':
        filtered = columns.filter((c) => c.type === 'phone');
    }
    return filtered.map((c) => ({
      label: c.title,
      value: c.id,
    }));
  }, [type, columns]);
  return (
    <>
      <div>
        <Dropdown
          defaultValue={[options.find((o) => o.value == selectedId)].filter(
            Boolean
          )}
          isLoading={pendingSelect}
          disabled={pendingSelect}
          placeholder={'Select a phone column'}
          options={options}
          isOptionSelected={(o) => o.value == selectedId}
          onOptionSelect={(o) => onSelect(o.value)}
        />
      </div>
    </>
  );
};
