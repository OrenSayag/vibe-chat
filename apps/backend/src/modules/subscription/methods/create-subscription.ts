import { createSubscription as _createSubscription } from '@monday-whatsapp/db';

type Input = {
  accountId: string;
};

export const createSubscription = ({ accountId }: Input) => {
  return _createSubscription({ accountId });
};
