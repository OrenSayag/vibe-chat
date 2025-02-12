import { CSSProperties, FC, ReactNode } from 'react';
import { Text } from '@vibe/core';

type Props = {
  style?: CSSProperties;
  children: ReactNode;
  isOptional?: boolean;
};

export const SectionLabel: FC<Props> = ({
  style = {},
  children,
  isOptional = false,
}) => {
  return (
    <>
      <div
        style={{
          ...style,
          display: 'flex',
          gap: '0.5em',
          alignItems: 'end',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{children}</Text>
        {isOptional && <Text type="text2">Optional</Text>}
      </div>
    </>
  );
};
