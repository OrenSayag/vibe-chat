import {
  ContactInfo,
  Message,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import { integer, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

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
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  subscriptionId: integer('subscription_id').references(() => subscriptions.id),
  contactId: integer('contact_id').references(() => subscriptionContacts.id),
  message: json('info').$type<Message>().notNull(),
});
