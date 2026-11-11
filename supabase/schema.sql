-- Gym Bob's database schema for Supabase.
--
-- Run once: Supabase Dashboard → SQL Editor → New query → paste this whole
-- file → Run. Safe to re-run (everything is "if not exists").
--
-- Row Level Security is ON with no policies, so the public anon key can't read
-- or write anything. Only the Vercel functions in api/ write here, using the
-- server-only SUPABASE_SERVICE_ROLE_KEY. You view the data in Table Editor.

-- Contact form ("Find Gym Bob's" section)
create table if not exists public.contact_messages (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  message     text not null
);

-- "Build a custom plan" form in the Pricing section
create table if not exists public.plan_requests (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  plan        text not null
);

-- One row per completed Stripe Checkout (filled by api/stripe-webhook.ts).
-- No card data is ever stored — only Stripe IDs.
create table if not exists public.members (
  id                          bigint generated always as identity primary key,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),
  name                        text,
  email                       text not null,
  phone                       text,
  plan_id                     text not null,
  plan_name                   text not null,
  billing                     text not null check (billing in ('subscription', 'one_time')),
  amount_cents                integer,
  -- active / past_due / canceled / unpaid / paid (one-time) etc., mirrored from Stripe
  status                      text not null,
  stripe_customer_id          text,
  stripe_subscription_id      text unique,
  stripe_checkout_session_id  text not null unique
);

create index if not exists members_email_idx on public.members (email);

alter table public.contact_messages enable row level security;
alter table public.plan_requests    enable row level security;
alter table public.members          enable row level security;
