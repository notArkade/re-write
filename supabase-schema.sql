-- Run this in your Supabase SQL Editor to create the necessary table

create table content_history (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  input_content text not null,
  twitter_output text,
  linkedin_output text,
  instagram_output text,
  youtube_output text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Optional: Enable Row Level Security (RLS) if you plan to expose Supabase directly to the frontend.
-- Since this MVP accesses Supabase from the backend API, RLS can be disabled for this table or we can keep it as is.
