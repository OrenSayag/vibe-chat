import { CSSProperties, FC, ReactNode } from 'react';
import { Box, List, ListItem } from '@vibe/core';

type Props = {
  style?: CSSProperties;
  items: {
    label: ReactNode;
    selected?: boolean;
    onClick?(): void;
  }[];
};

export const Menu: FC<Props> = ({ style, items }) => {
  return (
    <Box rounded={'medium'} backgroundColor={'allgreyBackgroundColor'}>
      <List style={{ width: '100%' }}>
        {items.map((item, i) => (
          <ListItem
            key={`menu-item-${i}`}
            selected={item.selected}
            onClick={item.onClick}
          >
            <Box
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '.4em',
              }}
            >
              {item.label}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
