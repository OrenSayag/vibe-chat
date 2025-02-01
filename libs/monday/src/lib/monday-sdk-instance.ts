import mondaySdk from 'monday-sdk-js';

const apiToken = process.env['DEV_API_TOKEN'];

export const monday = mondaySdk({
  apiToken,
});
