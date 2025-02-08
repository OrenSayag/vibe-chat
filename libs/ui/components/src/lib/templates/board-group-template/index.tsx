import { FC } from 'react';
import { cn } from '@vibe-chat/ui-utils';
import {
  SingleMessageSender,
  SingleMessageSenderProps,
} from '../../organisms/single-message-sender';

interface Props {
  className?: string;
  singleMessageSenderProps: SingleMessageSenderProps;
}

export const BoardGroupTemplate: FC<Props> = ({
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
