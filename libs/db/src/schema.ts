import { int, json, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import {
  GreenApiInstanceInfo,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';

export const subscriptions = mysqlTable('subscriptions', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  info: json('info').$type<SubscriptionInfo>().notNull(),
  greenApiInfo: json('green_api_info').$type<GreenApiInstanceInfo>(),
});
