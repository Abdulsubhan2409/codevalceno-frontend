ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_full_name_len CHECK (char_length(full_name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contact_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT contact_company_len CHECK (company IS NULL OR char_length(company) <= 120),
  ADD CONSTRAINT contact_phone_len CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT contact_project_type_len CHECK (char_length(project_type) BETWEEN 1 AND 60),
  ADD CONSTRAINT contact_budget_range_len CHECK (char_length(budget_range) BETWEEN 1 AND 60),
  ADD CONSTRAINT contact_message_len CHECK (char_length(message) BETWEEN 10 AND 4000);