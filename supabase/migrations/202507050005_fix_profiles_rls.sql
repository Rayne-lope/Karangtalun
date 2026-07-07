-- ============================================================
-- Migration 005: Fix over-permissive profiles RLS policy
-- VULN-01 / VULN-04: profiles_select_public exposes all columns
-- (full_name, email, role, username, avatar_url) to anyone.
-- ============================================================

-- 1. Drop the over-permissive public read policy that exposed all rows/columns.
DROP POLICY IF EXISTS "profiles_select_public" ON public.profiles;

-- 2. Create a secure RPC that returns ONLY the email for a given username.
--    SECURITY DEFINER means it runs with elevated privileges, but we
--    intentionally return only the one column needed for login.
--    This prevents direct table access by anon users entirely.
CREATE OR REPLACE FUNCTION public.get_email_by_username(p_username text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT email
  FROM public.profiles
  WHERE username = p_username
    AND role = 'admin'   -- only allow lookup of admin accounts
  LIMIT 1;
$$;

-- Revoke from public, grant only to anon (needed for pre-auth login lookup)
REVOKE ALL ON FUNCTION public.get_email_by_username(text) FROM public;
GRANT EXECUTE ON FUNCTION public.get_email_by_username(text) TO anon, authenticated;

-- 3. Re-add a narrow anon read policy — only needed columns via a view is ideal,
--    but since Postgres RLS doesn't support column-level restriction natively,
--    we restrict via the RPC above and remove table-level anon SELECT entirely.
--    The existing policies cover:
--      - profiles_select_own  → authenticated users can read their own row
--      - profiles_select_admin → admins can read all rows
--    Anon users have NO direct table access; they use the RPC above.

-- 4. Verify: the anon role should have no direct SELECT on profiles now.
--    (No new policy needed — existing own + admin policies are sufficient.)
