import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import {
  SingleMessageSender,
  SingleMessageSenderProps,
} from '@monday-whatsapp/components';

interface Props {
  className?: string;
  singleMessageSenderProps: SingleMessageSenderProps;
}

export const MultipleItemsTemplate: FC<Props> = ({
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
