import {
  ContactInfo,
  Message,
  OrganizationUserRole,
  SubscriptionInfo,
} from '@vibe-chat/shared-types';
import {
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';
import { nanoid } from 'nanoid';

export const subscriptions = pgTable('subscriptions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid(6)),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  info: json('info').$type<SubscriptionInfo>().notNull(),
});

export const subscriptionContacts = pgTable('subscription_contacts', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  info: json('info').$type<ContactInfo>().notNull(),
  subscriptionId: text('subscription_id').references(() => subscriptions.id),
});

export const organizationUserRoleEnum = pgEnum(
  'role',
  Object.values(OrganizationUserRole) as [string, ...string[]]
);

export const subscriptionsUsers = pgTable('subscriptions_users', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  subscriptionId: text('subscription_id').references(() => subscriptions.id),
  role: organizationUserRoleEnum().notNull(),
});

export const subscriptionMessages = pgTable('subscription_messages', {
  id: varchar('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  subscriptionId: text('subscription_id')
    .references(() => subscriptions.id)
    .notNull(),
  contactId: integer('contact_id')
    .references(() => subscriptionContacts.id)
    .notNull(),
  message: json('info').$type<Message>().notNull(),
});

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  password: text('password').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  filename: text('image'),
});

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  key: text('key').notNull(), // S3/Minio key
  bucket: text('bucket').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;
