type Input = {
  path: string;
  options?: RequestInit;
};

export const sendRequestToWhatsappGraph = async ({ path, options }: Input) => {
  const baseUrl = process.env['WHATSAPP_CLOUD_API_BASE_URL']!;
  const version = process.env['WHATSAPP_CLOUD_API_VERSION']!;
  const token = process.env['WHATSAPP_CLOUD_API_TOKEN']!;
  const url = `${baseUrl}${version}/${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    console.log({
      failedWhatsappRequestMessageBody: await res.json(),
    });
    throw new Error('Failed to send request to whatsapp cloud api');
  }

  return res;
};
