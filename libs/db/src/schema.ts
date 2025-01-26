import {
  ContactInfo,
  Message,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import {
  integer,
  json,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  info: json('info').$type<SubscriptionInfo>().notNull(),
});

export const subscriptionContacts = pgTable('subscription_contacts', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  info: json('info').$type<ContactInfo>().notNull(),
  subscriptionId: integer('subscription_id').references(() => subscriptions.id),
});

export const subscriptionMessages = pgTable('subscription_messages', {
  id: varchar('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  subscriptionId: integer('subscription_id')
    .references(() => subscriptions.id)
    .notNull(),
  contactId: integer('contact_id')
    .references(() => subscriptionContacts.id)
    .notNull(),
  message: json('info').$type<Message>().notNull(),
});
