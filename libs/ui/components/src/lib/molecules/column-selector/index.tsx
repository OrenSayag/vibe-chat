import { FC, useMemo } from 'react';
import { Dropdown } from '@vibe/core';
import { BoardColumn, ListItem } from '@vibe-chat/shared-types';

interface Props {
  className?: string;
  columns: BoardColumn[];
  onSelect(id: string): void;
  selectedId?: string;
  type?: 'phone';
  pendingSelect?: boolean;
  placeholder?: string;
}

export const ColumnSelector: FC<Props> = ({
  className,
  columns,
  selectedId,
  onSelect,
  type,
  pendingSelect,
  placeholder,
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
          placeholder={placeholder}
          options={options}
          isOptionSelected={(o) => o.value == selectedId}
          onOptionSelect={(o) => onSelect(o.value)}
        />
      </div>
    </>
  );
};
