import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { MessageStatus } from '@monday-whatsapp/shared-types';
import { CheckCheck } from 'lucide-react';
import { Text } from '@vibe/core';

interface Props {
  className?: string;
  status: MessageStatus;
}

export const MessageStatusCheck: FC<Props> = ({ className, status }) => {
  return (
    <>
      <span className={cn(className)}>
        <Text
          style={{
            color: status === MessageStatus.READ ? 'blue' : undefined,
            opacity: !(
              status === MessageStatus.SENT ||
              status === MessageStatus.DELIVERED
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
