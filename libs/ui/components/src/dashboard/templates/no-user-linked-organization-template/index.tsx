'use client';

import { CSSProperties, FC } from 'react';
import { Flex, Heading } from '@vibe/core';

type Props = {
  style?: CSSProperties;
};

export const NoUserLinkedOrganizationTemplate: FC<Props> = ({ style = {} }) => {
  return (
    <>
      <Flex
        justify={'center'}
        align={'center'}
        style={{
          ...style,
          height: '100vh',
        }}
      >
        <Heading type={'h1'}>You have no linked organization.</Heading>
      </Flex>
    </>
  );
};
