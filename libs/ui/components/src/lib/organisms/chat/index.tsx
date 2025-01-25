import { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { ChatLayout } from './chat-layout';

interface Props {
  className?: string;
  data: ComponentPropsWithoutRef<typeof ChatLayout>;
}

export const Chat: FC<Props> = ({ className, data }) => {
  return (
    <>
      <div className={cn(className)}>
        <ChatLayout {...data} />
      </div>
    </>
  );
};
