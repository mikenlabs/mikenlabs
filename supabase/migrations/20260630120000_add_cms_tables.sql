-- ============ COURSES / TRAINING PROGRAMS ============
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text NOT NULL DEFAULT 'Code2',
  duration text,
  mode text DEFAULT 'Online',
  level text DEFAULT 'Beginner',
  color text DEFAULT 'from-blue-500 to-blue-700',
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.courses TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Admins manage courses" ON public.courses FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER courses_updated_at BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ BLOG POSTS ============
CREATE TABLE public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  category text,
  tags text[] NOT NULL DEFAULT '{}',
  author text,
  featured_image text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  read_time text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blogs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blogs TO authenticated;
GRANT ALL ON public.blogs TO service_role;

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published blogs" ON public.blogs FOR SELECT USING (published = true);
CREATE POLICY "Admins manage blogs" ON public.blogs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER blogs_updated_at BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ TESTIMONIALS ============
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  company text,
  content text NOT NULL,
  rating int NOT NULL DEFAULT 5,
  avatar_url text,
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ GALLERY ============
CREATE TABLE public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text,
  description text,
  image_url text,
  category text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gallery TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery TO authenticated;
GRANT ALL ON public.gallery TO service_role;

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery" ON public.gallery FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER gallery_updated_at BEFORE UPDATE ON public.gallery
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ PARTNERS ============
CREATE TABLE public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website text,
  logo_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.partners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Admins manage partners" ON public.partners FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER partners_updated_at BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ PRODUCTS: add image & urls columns if missing ============
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS live_url text;
