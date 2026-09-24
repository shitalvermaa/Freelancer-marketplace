// Populates the database with demo users, projects and a portfolio,
// so the app isn't empty on first run.
// Run with: node seed.js

require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Project = require('./models/Project');

async function seed() {
  await connectDB();

  await Promise.all([User.deleteMany({}), Project.deleteMany({})]);

  const hashed = await bcrypt.hash('password123', 10);

  const client = await User.create({
    name: 'Tech Solutions',
    email: 'client@test.com',
    password: hashed,
    role: 'Client',
    profession: 'Business Client'
  });

  const freelancer = await User.create({
    name: 'Amit Sharma',
    email: 'amit@test.com',
    password: hashed,
    role: 'Freelancer',
    profession: 'Full Stack Developer',
    skills: ['MERN Stack', 'Next.js', 'TypeScript'],
    about: 'I build scalable web applications with clean code architecture.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500',
    portfolio: [
      {
        title: 'E-commerce Dashboard',
        description: 'Admin dashboard built with React + Node for an online store.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
        link: ''
      }
    ]
  });

  await Project.create([
    {
      title: 'Build React Portfolio Website',
      category: 'Web Development',
      budget: '₹15,000',
      duration: '7 Days',
      client: client._id,
      description: 'Need a React developer urgently.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
    },
    {
      title: 'Modern Mobile UI Design',
      category: 'UI/UX Design',
      budget: '₹8,000',
      duration: '5 Days',
      client: client._id,
      description: 'Design a clean mobile app layout.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'
    }
  ]);

  console.log('Seed complete!');
  console.log('Client login   -> client@test.com / password123');
  console.log('Freelancer login -> amit@test.com / password123');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
