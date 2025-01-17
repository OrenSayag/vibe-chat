import mondaySdk from 'monday-sdk-js';
import { getDevToken } from './get-dev-token';

export const monday = mondaySdk({
  apiToken: getDevToken(),
});
