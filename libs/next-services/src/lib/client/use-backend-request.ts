import { useTransition } from 'react';
import { BackendBaseResponse } from '@vibe-chat/shared-types';

type Input<ResponseData, RequestInput> = {
  apiCall(input: RequestInput): Promise<BackendBaseResponse<ResponseData>>;
  onError?(err?: unknown): void;
  onSuccess?(data: ResponseData): void;
  onErrorToast?: {
    active: true;
    message?: string;
  };
  onSuccessToast?: {
    active: true;
    message?: string;
  };
};

export const useBackendRequest = <
  ResponseData = undefined,
  RequestInput = undefined
>({
  apiCall,
  onError,
  onSuccessToast,
  onErrorToast,
  onSuccess,
}: Input<ResponseData, RequestInput>) => {
  const [pending, startTransition] = useTransition();
  const action = async (input: RequestInput): Promise<void> => {
    const res = await apiCall(input);
    if (!res || !res.success) {
      onError?.(res);
      if (onErrorToast) {
        if (onErrorToast.message) {
          toast({
            title: onErrorToast.message,
            className: 'bg-red-700',
          });
        } else {
          toastApiRes(res);
        }
      }
      return;
    }
    onSuccess?.(res.data);
    if (onSuccessToast) {
      if (onSuccessToast.message) {
        toast({
          title: onSuccessToast.message,
          className: 'bg-green-700',
        });
      } else {
        toastApiRes(res);
      }
    }
  };
  const startAction = (input: RequestInput) => {
    startTransition(() => action(input));
  };
  return {
    pending,
    startAction,
  };
};

function toast(input: unknown) {
  console.log('toast: not implemented');
}
function toastApiRes(input: unknown) {
  console.log('toast: not implemented');
}
