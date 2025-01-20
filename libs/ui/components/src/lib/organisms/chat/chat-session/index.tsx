import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';

interface Props {
  className?: string;
}

export const ChatSession: FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn(className)}>ChatSession works!</div>
    </>
  );
};
