'use client';

import { FC } from 'react';
import { Text } from '@vibe/core';

interface Props {
  className?: string;
}

const NotFound: FC<Props> = ({ className }) => {
  return (
    <>
      <Text>404 not found</Text>
    </>
  );
};

export default NotFound;
