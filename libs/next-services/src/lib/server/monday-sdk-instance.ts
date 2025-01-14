import mondaySdk from 'monday-sdk-js';

export const monday = mondaySdk({
  apiToken:
    process.env.NODE_ENV !== 'production'
      ? process.env['DEV_API_TOKEN']
      : undefined,
});
