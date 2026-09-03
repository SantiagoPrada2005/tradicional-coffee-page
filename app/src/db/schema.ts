import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const campaignLinks = sqliteTable('campaign_links', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  targetPath: text('target_path').notNull().default('/'),
  utmSource: text('utm_source').notNull(),
  utmMedium: text('utm_medium').notNull(),
  utmCampaign: text('utm_campaign').notNull(),
  utmContent: text('utm_content'),
  utmTerm: text('utm_term'),
  tag: text('tag'),
  clicksCount: integer('clicks_count').notNull().default(0),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  createdBy: text('created_by').default('admin'),
});

export const analyticsEvents = sqliteTable('analytics_events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: text('session_id').notNull(),
  eventType: text('event_type').notNull(), // 'pageview', 'view_content', 'add_to_cart', 'initiate_checkout', 'purchase'
  path: text('path').notNull(),
  referrer: text('referrer'),
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  utmContent: text('utm_content'),
  utmTerm: text('utm_term'),
  tag: text('tag'),
  deviceType: text('device_type'),
  country: text('country'),
  city: text('city'),
  value: real('value').default(0),
  metadata: text('metadata'), // JSON serialized payload
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type CampaignLink = typeof campaignLinks.$inferSelect;
export type NewCampaignLink = typeof campaignLinks.$inferInsert;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;
