'use server';

import {
  apiKeyHeaderName,
  BackendBaseResponse,
} from '@monday-whatsapp/shared-types';

type Input = {
  path: string;
  options: RequestInit;
  isFileUpload?: boolean;
  userId?: string;
};

export const sendRequestToServer = async <T>({
  options,
  path,
  isFileUpload = false,
  userId,
}: Input): Promise<BackendBaseResponse<T>> => {
  const baseUrl = process.env['BACKEND_BASE_URL'];
  const apiKey = process.env['BACKEND_API_KEY'];
  const url = `${baseUrl}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(!isFileUpload && { 'Content-Type': 'application/json' }),
      [apiKeyHeaderName]: apiKey!,
      'User-ID': userId ?? '',
      ...options.headers,
    },
  });

  if (!res.ok) {
    console.error('Failed request to backend:', {
      status: res.status,
      statusText: res.statusText,
    });
  }

  return res.json();
};
