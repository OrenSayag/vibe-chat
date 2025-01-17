import { EventType } from '@monday-whatsapp/shared-types';
import { useEffect } from 'react';
import { useSocket } from '@monday-whatsapp/next-services';
import { useRouter } from 'next/navigation';

type Input = {
  subscriptionId: number;
};

export const useGreenApiInstanceStatusChange = ({ subscriptionId }: Input) => {
  const socket = useSocket({
    subscriptionId,
  });
  const router = useRouter();
  useEffect(() => {
    if (!socket) {
      return () => {};
    }
    socket.on(EventType.INSTANCE_STATE_CHANGED, (msg) => {
      router.refresh();
    });
    return () => socket.off(EventType.INSTANCE_STATE_CHANGED);
  }, [socket]);
};
