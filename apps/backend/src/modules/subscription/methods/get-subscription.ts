import { getSubscription as _getSubscription } from '@monday-whatsapp/db';

type Input =
  | {
      type: 'accountId';
      accountId: string;
    }
  | {
      type: 'subscriptionId';
      id: number;
    };

export const getSubscription = (input: Input) => {
  return _getSubscription(input);
};
