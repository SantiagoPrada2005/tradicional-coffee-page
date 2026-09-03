-- Cloudflare D1 Database Schema for Tradicional Coffee Analytics & Campaigns

-- Table 1: Campaign links with UTM parameters, tags and click counter
CREATE TABLE IF NOT EXISTS campaign_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  target_path TEXT NOT NULL DEFAULT '/',
  utm_source TEXT NOT NULL,
  utm_medium TEXT NOT NULL,
  utm_campaign TEXT NOT NULL,
  utm_content TEXT,
  utm_term TEXT,
  tag TEXT,
  clicks_count INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT DEFAULT 'admin'
);

-- Table 2: First-party analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'pageview', 'view_content', 'add_to_cart', 'initiate_checkout', 'purchase'
  path TEXT NOT NULL,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  tag TEXT,
  device_type TEXT, -- 'mobile', 'desktop', 'tablet'
  country TEXT,
  city TEXT,
  value REAL DEFAULT 0, -- Monetary value in COP for purchases/orders
  metadata TEXT, -- JSON payload for contents, products, etc.
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid analytical aggregations
CREATE INDEX IF NOT EXISTS idx_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_campaign ON analytics_events(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_events_tag ON analytics_events(tag);
CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_links_slug ON campaign_links(slug);
