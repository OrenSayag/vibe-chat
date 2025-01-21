import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { StatusMessage } from '@monday-whatsapp/shared-types';
import { CheckCheck } from 'lucide-react';
import { Text } from '@vibe/core';

interface Props {
  className?: string;
  status: StatusMessage;
}

export const MessageStatusCheck: FC<Props> = ({ className, status }) => {
  return (
    <>
      <span className={cn(className)}>
        <Text
          style={{
            color: status === StatusMessage.Delivered ? 'blue' : undefined,
            opacity: !(
              status === StatusMessage.Sent ||
              status === StatusMessage.Delivered
            )
              ? '0%'
              : undefined,
          }}
        >
          <CheckCheck size={15} />
        </Text>
      </span>
    </>
  );
};
