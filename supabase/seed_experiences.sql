-- ============================================================================
-- 1. Create Experiences Table (if not exists)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.experiences (
    id TEXT PRIMARY KEY,
    company TEXT NOT NULL,
    logo TEXT,
    title TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT,
    skills TEXT[],
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
DROP POLICY IF EXISTS "Public can read experiences" ON public.experiences;
CREATE POLICY "Public can read experiences"
    ON public.experiences FOR SELECT
    USING (true);

-- Allow manage experiences (insert, update, delete)
DROP POLICY IF EXISTS "Allow manage experiences" ON public.experiences;
CREATE POLICY "Allow manage experiences"
    ON public.experiences FOR ALL
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- 2. Seed All 3 Experiences
-- ============================================================================
INSERT INTO public.experiences (
    id,
    company,
    logo,
    title,
    period,
    description,
    skills,
    order_index
)
VALUES
(
    'exp-1',
    'National Incubation & Research Center',
    '/assets/nirc.png',
    'Full-Stack Developer',
    'Jul 2025 - Present',
    'Developed dynamic and scalable web applications using the MERN stack, handling both frontend and backend development. Collaborated with cross-functional teams to build responsive UI, implement RESTful APIs, and optimize application performance in an agile environment.',
    ARRAY['HTML', 'CSS', 'JavaScript', 'React JS', 'TypeScript', 'Node JS', 'Tailwind CSS', 'MySQL', 'Python & Django', 'Java Grails'],
    1
),
(
    'exp-2',
    'National Incubation & Research Center',
    '/assets/nirc.png',
    'Front-End Developer',
    'Oct 2023 - Jul 2024',
    'Designed and implemented responsive, user-friendly interfaces using modern frontend technologies. Collaborated with designers and backend developers to deliver seamless user experiences. Optimized web applications for performance, accessibility, and cross-browser compatibility.',
    ARRAY['HTML', 'CSS', 'JavaScript', 'React JS', 'Next JS', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'Git/GitHub/GitLab'],
    2
),
(
    'exp-3',
    'Swoyambhu International College, Lagankhel, Lalitpur',
    '/assets/tu.png',
    'Bachelor in Computer Application (BCA) at Tribhuvan University',
    '2020 - 2025',
    'Completed a Bachelor’s degree in Computer Application with a strong focus on software development, web technologies, databases, and practical project work. Gained hands-on experience through academic projects and collaborative learning.',
    ARRAY[]::TEXT[],
    3
)
ON CONFLICT (id) DO UPDATE SET
    company = EXCLUDED.company,
    logo = EXCLUDED.logo,
    title = EXCLUDED.title,
    period = EXCLUDED.period,
    description = EXCLUDED.description,
    skills = EXCLUDED.skills,
    order_index = EXCLUDED.order_index;

