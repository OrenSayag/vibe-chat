import { FC } from 'react';
import { cn } from '@vibe-chat/ui-utils';
import {
  SingleMessageSender,
  SingleMessageSenderProps,
} from '@vibe-chat/components';

interface Props {
  className?: string;
  singleMessageSenderProps: SingleMessageSenderProps;
}

export const ItemTemplate: FC<Props> = ({
  className,
  singleMessageSenderProps,
}) => {
  return (
    <>
      <div className={cn(className)}>
        <SingleMessageSender {...singleMessageSenderProps} />
      </div>
    </>
  );
};
