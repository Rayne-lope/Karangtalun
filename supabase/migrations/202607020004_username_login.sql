-- Migration to add username and email columns to public.profiles for username-based login.
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text UNIQUE;

-- Synchronize email from auth.users to public.profiles for existing users.
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;

-- Automatically set a default username based on the email prefix for existing users.
UPDATE public.profiles
SET username = split_part(email, '@', 1)
WHERE username IS NULL AND email IS NOT NULL;

-- Create policy to allow anonymous users to query profiles for username-based login lookup
DROP POLICY IF EXISTS "profiles_select_public" ON public.profiles;
CREATE POLICY "profiles_select_public"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

