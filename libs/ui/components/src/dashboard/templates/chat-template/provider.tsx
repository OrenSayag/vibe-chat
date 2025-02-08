'use client';

import { CSSProperties, FC } from 'react';
import { useChat } from '@monday-whatsapp/next-services';
import { ChatLayout } from '@monday-whatsapp/components';

type Props = {
  style?: CSSProperties;
  subscriptionId: string;
};

export const ChatTemplateProvider: FC<Props> = ({
  style = {},
  subscriptionId,
}) => {
  const chatProps = useChat({
    subscriptionId,
  });
  return (
    <>
      <div
        style={{
          ...style,
          height: '100%',
        }}
      >
        <ChatLayout {...chatProps} />
      </div>
    </>
  );
};
