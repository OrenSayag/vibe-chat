import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';

interface Props {
  className?: string;
}

export const ChatLayout: FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn(className)}>ChatLayout works!</div>
    </>
  );
};
