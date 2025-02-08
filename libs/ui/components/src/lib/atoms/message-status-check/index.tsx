import { FC } from 'react';
import { MessageStatus } from '@vibe-chat/shared-types';
import { CheckCheck, CircleAlert } from 'lucide-react';
import { Text } from '@vibe/core';

interface Props {
  className?: string;
  status: MessageStatus;
}

export const MessageStatusCheck: FC<Props> = ({ className, status }) => {
  return (
    <>
      <span>
        {status !== MessageStatus.FAILED && (
          <Text
            style={{
              color: status === MessageStatus.READ ? 'blue' : undefined,
              opacity: !(
                status === MessageStatus.READ ||
                status === MessageStatus.SENT ||
                status === MessageStatus.DELIVERED
              )
                ? '0%'
                : undefined,
            }}
          >
            <CheckCheck size={15} />
          </Text>
        )}
        <Text style={{ color: 'red' }}>
          {status === MessageStatus.FAILED && <CircleAlert size={15} />}
        </Text>
      </span>
    </>
  );
};
