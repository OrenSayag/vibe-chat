'use client';

import { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@vibe-chat/ui-utils';

import { Button as VibesButton } from '@vibe/core';

type Props = ComponentPropsWithoutRef<typeof VibesButton> & {
  className?: string;
};

export const Button: FC<Props> = ({ className, ...props }) => {
  return (
    <>
      <VibesButton className={cn(className)} {...props} />
    </>
  );
};
