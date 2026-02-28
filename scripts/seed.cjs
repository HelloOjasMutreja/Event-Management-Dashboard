const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qsyzhvvhjwnvhtdbimin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzeXpodnZoandudmh0ZGJpbWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMDI4MjEsImV4cCI6MjA4Nzg3ODgyMX0.3adCQM7QbxpLlgTg-YFUYP3IaQwcNw8tS48MLED256s'
);

const ADMIN_ID = 'a19277cc-6c7a-4209-bcbd-3d2d4c97db7b';

const events = [
  {
    title: 'Introduction to Machine Learning',
    description: 'Dive into the fundamentals of machine learning in this hands-on workshop. We\'ll cover supervised and unsupervised learning, build simple models with scikit-learn, and explore real-world datasets. Perfect for beginners who want to get started with ML. Bring your laptop with Python 3.x installed.',
    date: '2025-07-15',
    time: '14:00',
    location: 'CS Building, Room 301',
    capacity: 60,
    registered_count: 47,
    category: 'workshop',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Annual Tech Hackathon 2025',
    description: 'Our flagship 48-hour hackathon is back! Form teams of 3-5 and build innovative solutions to real-world problems. This year\'s themes: Sustainable Tech, HealthTech, and EdTech. Prizes worth $5,000 for top 3 teams. Meals, snacks, and energy drinks provided. Mentors from Google, Microsoft, and Amazon will be available.',
    date: '2025-08-02',
    time: '09:00',
    location: 'Innovation Hub, Main Campus',
    capacity: 200,
    registered_count: 178,
    category: 'competition',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Data Visualization with D3.js',
    description: 'Learn how to create stunning, interactive data visualizations using D3.js. This workshop covers SVG basics, scales, axes, transitions, and responsive design patterns. By the end, you\'ll build a complete interactive dashboard. Prior JavaScript knowledge required.',
    date: '2025-07-22',
    time: '16:00',
    location: 'Digital Arts Lab, Floor 2',
    capacity: 40,
    registered_count: 38,
    category: 'workshop',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Summer Social Mixer',
    description: 'Meet fellow club members and make new connections at our annual summer mixer! Enjoy food, drinks, lawn games, and live music from campus bands. Open to all majors — bring a friend! This is the perfect opportunity to network informally and find project partners for the upcoming semester.',
    date: '2025-07-18',
    time: '18:00',
    location: 'Campus Garden & Amphitheater',
    capacity: 150,
    registered_count: 89,
    category: 'social',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1529543544282-ea57407bc2e3?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'The Future of AI in Healthcare',
    description: 'Join Dr. Sarah Chen (Stanford AI Lab) for an insightful seminar on how artificial intelligence is transforming healthcare. Topics include medical imaging analysis, drug discovery, personalized medicine, and the ethical considerations of AI in clinical settings. Q&A session follows.',
    date: '2025-07-25',
    time: '10:00',
    location: 'Auditorium A, Lecture Hall Complex',
    capacity: 300,
    registered_count: 215,
    category: 'seminar',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Competitive Programming Bootcamp',
    description: 'Sharpen your algorithmic thinking in this intensive 3-day bootcamp. Covers dynamic programming, graph algorithms, number theory, and advanced data structures. Practice with problems from Codeforces, LeetCode, and past ICPC regionals. Ideal for students preparing for coding competitions and technical interviews.',
    date: '2025-08-10',
    time: '09:00',
    location: 'CS Building, Lab 204',
    capacity: 50,
    registered_count: 12,
    category: 'workshop',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Spring Coding Challenge',
    description: 'Our spring coding challenge was a massive success! Over 120 participants competed in 5 rounds of problem-solving. Congratulations to Team "Binary Wizards" for taking first place. Check the results page for full rankings and solution write-ups.',
    date: '2025-04-15',
    time: '10:00',
    location: 'Online (HackerRank)',
    capacity: 150,
    registered_count: 124,
    category: 'competition',
    status: 'completed',
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Web Development with React & Next.js',
    description: 'A comprehensive full-day workshop on modern web development. We\'ll build a production-ready application using React 19, Next.js 15, TypeScript, and Tailwind CSS. Topics include Server Components, App Router, authentication, database integration, and deployment to Vercel.',
    date: '2025-07-30',
    time: '09:30',
    location: 'Innovation Hub, Workshop Room B',
    capacity: 45,
    registered_count: 45,
    category: 'workshop',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Blockchain & Web3 Fundamentals',
    description: 'Explore the world of decentralized technology. This seminar covers blockchain architecture, smart contracts with Solidity, DeFi protocols, and the current state of Web3. Presented by industry professionals from Ethereum Foundation. No prior blockchain knowledge needed.',
    date: '2025-08-05',
    time: '15:00',
    location: 'Business School, Room 105',
    capacity: 80,
    registered_count: 34,
    category: 'seminar',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Open Source Contribution Night',
    description: 'Join us for a collaborative evening of open-source contributions! We\'ll guide you through finding beginner-friendly issues, understanding Git workflows, and making your first PR. Maintainers from popular projects will be online to review contributions in real time.',
    date: '2025-07-20',
    time: '19:00',
    location: 'Library Co-Working Space',
    capacity: 35,
    registered_count: 28,
    category: 'social',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Cloud Architecture Deep Dive',
    description: 'Advanced seminar on designing scalable cloud systems. Draft event — speaker confirmation pending. Will cover AWS, GCP, and Azure patterns including microservices, serverless, event-driven architectures, and cost optimization strategies.',
    date: '2025-09-01',
    time: '11:00',
    location: 'TBD',
    capacity: 100,
    registered_count: 0,
    category: 'seminar',
    status: 'draft',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    created_by: ADMIN_ID,
  },
  {
    title: 'Game Dev Jam — Cancelled',
    description: 'Unfortunately, our planned Game Development Jam has been cancelled due to venue scheduling conflicts. We are working on rescheduling for next semester. Apologies for the inconvenience — stay tuned for updates!',
    date: '2025-06-20',
    time: '10:00',
    location: 'Media Lab, Floor 3',
    capacity: 60,
    registered_count: 42,
    category: 'competition',
    status: 'cancelled',
    image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    created_by: ADMIN_ID,
  },
];

async function seed() {
  // Sign in first
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@clubevents.com',
    password: '.sQ2JlHF28/+',
  });

  if (authError) {
    console.error('Auth failed:', authError.message);
    process.exit(1);
  }
  console.log('Signed in as:', authData.user.email);

  // Clear existing events
  const { error: deleteError } = await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) console.log('Delete warning:', deleteError.message);
  else console.log('Cleared existing events');

  // Insert new events
  const { data, error } = await supabase.from('events').insert(events).select();
  if (error) {
    console.error('Insert failed:', error.message);
    process.exit(1);
  }

  console.log(`Successfully inserted ${data.length} events:`);
  data.forEach((e) => console.log(`  - [${e.status}] ${e.title} (${e.registered_count}/${e.capacity})`));
  process.exit(0);
}

seed();
