import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle({
  connection: {
    host: process.env['DB_HOST'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    user: process.env['DB_USER'],
  },
});
