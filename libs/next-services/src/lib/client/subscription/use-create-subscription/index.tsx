import { useRouter } from 'next/navigation';
import { createSubscription } from '../../../server/subscription/create-subscription';
import { useBackendRequest } from '../../use-backend-request';
import { useState } from 'react';
import { useLocale } from 'next-intl';

export const useCreateSubscription = () => {
  const router = useRouter();
  const locale = useLocale();
  const [error, setError] = useState<string>('');
  const { pending, startAction } = useBackendRequest({
    apiCall: createSubscription,
    onSuccess: ({ id }) => {
      console.log(`Created subscription with id ${id}`);
      router.push(`/${locale}/dashboard/${id}`);
    },
    onError: () => {
      setError('Failed to create subscription');
    },
  });

  const onCreate = (input: Parameters<typeof createSubscription>[0]) => {
    setError('');
    startAction(input);
  };

  return {
    createSubscription: onCreate,
    pendingCreateSubscription: pending,
    error,
  };
};
