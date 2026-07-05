-- Hardening Phase 3-7: raise public-assets upload limit to 5 MB.

update storage.buckets
set
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'public-assets';
