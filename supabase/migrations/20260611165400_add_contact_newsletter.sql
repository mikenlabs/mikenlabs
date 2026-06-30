-- CONTACT SUBMISSIONS
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.contact_submissions TO authenticated;
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read contact submissions"
  ON public.contact_submissions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact submissions"
  ON public.contact_submissions FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- NEWSLETTER SUBSCRIBERS
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.newsletter_subscribers TO authenticated;
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON public.newsletter_subscribers FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete subscribers"
  ON public.newsletter_subscribers FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
