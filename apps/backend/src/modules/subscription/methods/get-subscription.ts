import { getSubscription as _getSubscription } from '@monday-whatsapp/db';

type Input =
  | {
      type: 'mondayAccountId';
      accountId: string;
    }
  | {
      type: 'subscriptionId';
      id: string;
    };

export const getSubscription = (input: Input) => {
  return _getSubscription(input);
};
