import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';

interface Props {
  className?: string;
}

export const BoardGroupTemplate: FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn(className)}>BoardGroupTemplate works!</div>
    </>
  );
};
