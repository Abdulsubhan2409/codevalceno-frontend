CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  project_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) can submit the contact form
CREATE POLICY "Anyone can submit a contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No one can read submissions through the public API (owner reads via Cloud dashboard)
-- Intentionally no SELECT/UPDATE/DELETE policies => default deny.

CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);