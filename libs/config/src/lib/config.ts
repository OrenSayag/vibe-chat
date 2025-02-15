export const BACKEND_API_KEY = process.env['BACKEND_API_KEY'] || '';
export const BACKEND_BASE_URL = process.env['BACKEND_BASE_URL'] || '';
export const NEXT_PUBLIC_BACKEND_WEBSOCKET_BASE_URL =
  process.env['NEXT_PUBLIC_BACKEND_WEBSOCKET_BASE_URL'] || '';

export const DB_HOST = process.env['DB_HOST'] || '';
export const DB_PASSWORD = process.env['DB_PASSWORD'] || '';
export const DB_NAME = process.env['DB_NAME'] || '';
export const DB_USER = process.env['DB_USER'] || '';

export const GREEN_API_BASE_URL =
  process.env['GREEN_API_BASE_URL'] || 'https://7105.api.greenapi.com/';

export const WEBHOOK_URL_TOKEN = process.env['WEBHOOK_URL_TOKEN'] || '';
export const WHATSAPP_CLOUD_API_TOKEN =
  process.env['WHATSAPP_CLOUD_API_TOKEN'] || '';
export const WHATSAPP_CLOUD_API_VERSION =
  process.env['WHATSAPP_CLOUD_API_VERSION'] || 'v21.0';
export const WHATSAPP_CLOUD_API_BASE_URL =
  process.env['WHATSAPP_CLOUD_API_BASE_URL'] || 'https://graph.facebook.com/';

export const WHATSAPP_BUSINESS_API_VERSION =
  process.env['WHATSAPP_BUSINESS_API_VERSION'] || 'v21.0';
export const WHATSAPP_BUSINESS_API_BASE_URL =
  process.env['WHATSAPP_BUSINESS_API_BASE_URL'] ||
  'https://graph.facebook.com/';

export const DEV_MONDAY_API_TOKEN = process.env['DEV_MONDAY_API_TOKEN'] || '';

export const AUTH_SECRET = process.env['AUTH_SECRET'] || 'somesecret';
export const AUTH_DRIZZLE_URL =
  process.env['AUTH_DRIZZLE_URL'] ||
  'postgres://postgres:postgres@127.0.0.1:5432/db';

export const MINIO_ENDPOINT =
  process.env['MINIO_ENDPOINT'] || 'http://localhost:9000';
export const MINIO_BUCKET_NAME =
  process.env['MINIO_BUCKET_NAME'] || 'your-bucket-name';
export const MINIO_ACCESS_KEY =
  process.env['MINIO_ACCESS_KEY'] || 'your-access-key';
export const MINIO_SECRET_KEY =
  process.env['MINIO_SECRET_KEY'] || 'your-secret-key';
