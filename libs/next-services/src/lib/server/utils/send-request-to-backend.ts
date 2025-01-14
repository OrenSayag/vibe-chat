'use server';

import {
  apiKeyHeaderName,
  BackendBaseResponse,
} from '@monday-whatsapp/shared-types';

type Input = {
  path: string;
  options: RequestInit;
};

export const sendRequestToServer = async <T>({
  options,
  path,
}: Input): Promise<BackendBaseResponse<T>> => {
  const baseUrl = process.env['BACKEND_BASE_URL'];
  const apiKey = process.env['BACKEND_API_KEY'];
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      [apiKeyHeaderName]: apiKey!,
      ...options.headers,
    },
  });
  return await res.json();
};
