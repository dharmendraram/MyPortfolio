-- ============================================================================
-- 1. Create Portfolio Items Table (if not exists)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.portfolio_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    company TEXT DEFAULT 'Personal',
    username TEXT DEFAULT '',
    password TEXT DEFAULT '',
    image TEXT,
    technology TEXT[],
    github TEXT DEFAULT '',
    link TEXT DEFAULT '',
    description TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
DROP POLICY IF EXISTS "Public can read portfolio items" ON public.portfolio_items;
CREATE POLICY "Public can read portfolio items"
    ON public.portfolio_items FOR SELECT
    USING (true);

-- Only authenticated users can insert, update, or delete portfolio items.
DROP POLICY IF EXISTS "Allow manage portfolio items" ON public.portfolio_items;
CREATE POLICY "Allow manage portfolio items"
    ON public.portfolio_items FOR ALL
    TO authenticated
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================================
-- 2. Seed All 11 Portfolio Items
-- ============================================================================
INSERT INTO public.portfolio_items (
    id,
    title,
    category,
    company,
    username,
    password,
    image,
    technology,
    github,
    link,
    description,
    order_index
)
VALUES
(
    'proj-1',
    'National Incubation and Research Center (NIRC) Website',
    'Full Stack Developer',
    'Company',
    '',
    '',
    '/portfolio/nirc-website.png',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Python & Django'],
    '',
    'https://nirc.com.np/',
    'A leading software development company dedicated to delivering cutting-edge digital solutions.',
    1
),
(
    'proj-2',
    'Hospital Management System (HMS)',
    'Core Designer & Lead Developer',
    'Company',
    'demo_user',
    'demo',
    '/portfolio/hms.png',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Django'],
    '',
    'https://hamrohms.nirc.com.np/login/',
    'A comprehensive digital platform designed to streamline hospital operations, including patient registration, medical record management, and administrative workflows. Developed by Me & NIRC Team to enhance healthcare service efficiency.',
    2
),
(
    'proj-3',
    'Government With People (GWP)',
    'Core Front-End Developer',
    'Company',
    'p.demo',
    '@dminP@ssw0rd',
    '/portfolio/gwp.png',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Java Grails'],
    '',
    'https://gwp.nirc.com.np/',
    'A comprehensive digital platform designed for local municipalities to provide citizens with easy access to information, online services, and community updates. The website enhances transparency, efficiency, and engagement between the Palika and its residents. Developed by Me & NIRC Team.',
    3
),
(
    'proj-4',
    'प्रदेश अनुसन्धान तथा प्रशिक्षण प्रतिष्ठान',
    'Front-End Developer',
    'Company',
    '',
    '',
    '/portfolio/pratishthan.png',
    ARRAY['React.js', 'TailWind CSS', 'JavaScript', 'Django REST framework API'],
    '',
    'https://training.nirc.com.np/',
    'An official digital platform developed for the Government of Nepal''s Provincial Research and Training Institute to deliver training programs, research resources, and institutional information. The system improves accessibility, transparency, and digital learning for government officials and trainees. Developed collaboratively with the NIRC team.',
    4
),
(
    'proj-5',
    'Akriti Advertising – Creative Advertising & Marketing Solutions',
    'Full Stack Developer',
    'Personal',
    '',
    '',
    '/portfolio/akarti.png',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Django'],
    '',
    'https://akritiadvertising.com.np/',
    'Akriti Advertising provides creative advertising and promotional solutions designed to help businesses build their brand presence, reach their target audience, and effectively promote their products and services.',
    5
),
(
    'proj-6',
    'Rakmina Recruitment & Migration Platform',
    'Lead Front-End Developer',
    'Company',
    '',
    '',
    '/portfolio/rakmina.png',
    ARRAY['Next.js', 'TailWind CSS', 'Django rest framework API'],
    '',
    'https://rakmina.lt/',
    'A professional recruitment and migration portal that connects Nepali talent with global career opportunities, offering end-to-end support from job search to visa processing.',
    6
),
(
    'proj-7',
    'BrandWave — Digital Agency in Biratnagar | Web, Marketing & Event Services',
    'Full Stack Developer',
    'Personal',
    '',
    '',
    '/portfolio/brandwave.png',
    ARRAY['HTML', 'Bootstrap', 'JavaScript'],
    '',
    'https://brandwave.com.np/',
    'BrandWave is a premier digital agency in Biratnagar, Nepal, offering website development, digital marketing, meta ads, branding, and event shooting services to elevate your brand.',
    7
),
(
    'proj-8',
    'Portfolio Website',
    'Full Stack Developer',
    'Personal',
    '',
    '',
    '/portfolio/personal.png',
    ARRAY['React.js', 'TailWind CSS', 'JavaScript'],
    'https://github.com/dharmendraram/MyPortfolio',
    'http://dharmendraram.com.np/',
    'A personal portfolio website, showcasing my interests, knowledge, experiences, skills and projects that I have done. In this digital era it has been mandatory to have digital existence. It becomes even more necessary for the people in IT field. Personal portfolio website the resume of this digital world.',
    8
),
(
    'proj-9',
    'KIEC – Study Abroad & Immigration Services | Your Global Gateway',
    'Full Stack Developer',
    'Personal',
    '',
    '',
    '/portfolio/kic.png',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Django'],
    '',
    'https://kiceducation.edu.np/',
    'KIEC guides students and professionals in achieving global education and migration goals — from university selection to visa support and pre-departure readiness.',
    9
),
(
    'proj-10',
    'Aarambha Foundation',
    'Front-End Developer',
    'Personal',
    '',
    '',
    '/portfolio/aarambha.png',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Django REST framework API'],
    '',
    'https://aarambhafoundation.org.np/',
    'A purpose-driven digital platform focused on promoting quality education, better health, and a safe, nurturing environment for children across the nation. The platform supports initiatives that amplify children’s voices, protect their rights, and create equal opportunities for learning, growth, and well-being.',
    10
),
(
    'proj-11',
    'StartupGhar',
    'Full Stack Developer',
    'Personal',
    '',
    '',
    '/portfolio/startupghar.png',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Django'],
    '',
    'https://startupghar.com/',
    'StartupGhar is an innovative digital platform designed to support startups and businesses through modern IT solutions. The platform focuses on delivering scalable web applications, efficient system integration, and user-friendly digital experiences that help organizations grow, innovate, and succeed in the digital era.',
    11
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    company = EXCLUDED.company,
    username = EXCLUDED.username,
    password = EXCLUDED.password,
    image = EXCLUDED.image,
    technology = EXCLUDED.technology,
    github = EXCLUDED.github,
    link = EXCLUDED.link,
    description = EXCLUDED.description,
    order_index = EXCLUDED.order_index;
