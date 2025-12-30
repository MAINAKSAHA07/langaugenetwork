/**
 * Seed Demo Data
 * Populates database with sample blogs, batches, and other content
 * Run: npm run pb:seed
 */

const { createAdminClient, collectionExists } = require('./admin-client.js');

/**
 * Sample blog posts
 */
const sampleBlogs = [
  {
    title: '5 Reasons to Learn French in 2025',
    slug: '5-reasons-to-learn-french-2025',
    content: '<h2>Why French?</h2><p>French is one of the most spoken languages globally, opening doors to countless opportunities in business, travel, and culture. Here are five compelling reasons to start your French learning journey this year.</p><h3>1. Career Opportunities</h3><p>French is an official language in 29 countries and is widely used in international organizations like the UN, UNESCO, and the Red Cross.</p><h3>2. Travel and Tourism</h3><p>Explore France, Switzerland, Canada, and many African nations with confidence.</p><h3>3. Cultural Enrichment</h3><p>Access French literature, cinema, art, and cuisine in its original form.</p><h3>4. Brain Benefits</h3><p>Learning a new language improves cognitive abilities and memory.</p><h3>5. Global Community</h3><p>Join over 300 million French speakers worldwide.</p>',
    excerpt: 'Discover why French is one of the most valuable languages to learn this year and how it can transform your career and life.',
    category: 'Tips',
    tags: ['French', 'Career', 'Travel', 'Language Learning'],
    published: true,
    publishedAt: '2025-01-15',
    author: 'The Language Network Team',
  },
  {
    title: 'How to Prepare for DELF/DALF Exams',
    slug: 'how-to-prepare-delf-dalf-exams',
    content: '<h2>Master Your French Certification</h2><p>The DELF (Diplôme d\'Études en Langue Française) and DALF (Diplôme Approfondi de Langue Française) are internationally recognized French proficiency certifications.</p><h3>Understanding the Exam Structure</h3><p>Both exams test four key skills: listening, reading, writing, and speaking. DELF covers A1-B2 levels, while DALF covers C1-C2 advanced levels.</p><h3>Study Tips</h3><ul><li>Practice regularly with authentic materials</li><li>Take mock tests under timed conditions</li><li>Work with a qualified instructor</li><li>Focus on your weak areas</li><li>Immerse yourself in French media</li></ul><h3>Registration and Resources</h3><p>Register through Alliance Française or authorized centers. Prepare with official materials and practice tests.</p>',
    excerpt: 'A comprehensive guide to preparing for DELF and DALF French proficiency exams with proven strategies and tips.',
    category: 'Tips',
    tags: ['French', 'DELF', 'DALF', 'Exam Preparation'],
    published: true,
    publishedAt: '2025-01-20',
    author: 'Expert French Instructors',
  },
  {
    title: 'Success Story: From Beginner to B2 in 8 Months',
    slug: 'success-story-beginner-to-b2-german',
    content: '<h2>Meet Priya\'s Journey</h2><p>Priya joined The Language Network with zero German knowledge and achieved B2 certification in just 8 months. Here\'s her inspiring story.</p><h3>The Beginning</h3><p>"I never thought I could learn German. It seemed so difficult with all the cases and grammar rules," says Priya, a software engineer from Mumbai.</p><h3>The Method</h3><p>Priya attended online classes 4 times a week, practiced daily with language apps, and joined our German conversation club every Saturday.</p><h3>The Breakthrough</h3><p>After 4 months, something clicked. "I started thinking in German. I could watch shows without subtitles. It became natural," she recalls.</p><h3>The Achievement</h3><p>Priya passed her Goethe B2 exam with excellent scores and recently secured a job in Munich.</p><blockquote>"The Language Network gave me not just language skills, but confidence and a new career path." - Priya Sharma</blockquote>',
    excerpt: 'Read how Priya went from complete beginner to B2 German certification in 8 months with dedication and the right guidance.',
    category: 'Success Stories',
    tags: ['German', 'Success Story', 'Student Experience', 'B2 Level'],
    published: true,
    publishedAt: '2025-02-01',
    author: 'Student Stories Team',
  },
  {
    title: 'Top 10 Spanish Phrases Every Traveler Should Know',
    slug: 'top-10-spanish-phrases-travelers',
    content: '<h2>Essential Spanish for Your Next Trip</h2><p>Planning a trip to Spain or Latin America? These 10 phrases will make your journey smoother and more enjoyable.</p><h3>1. Hola / Buenos días</h3><p>Hello / Good morning - The most basic greeting.</p><h3>2. ¿Cuánto cuesta?</h3><p>How much does it cost? - Essential for shopping and dining.</p><h3>3. ¿Dónde está...?</h3><p>Where is...? - Perfect for finding your way around.</p><h3>4. No entiendo</h3><p>I don\'t understand - Honest communication is key.</p><h3>5. ¿Habla inglés?</h3><p>Do you speak English? - A polite way to ask for help.</p><h3>6. La cuenta, por favor</h3><p>The bill, please - Important at restaurants.</p><h3>7. Gracias / De nada</h3><p>Thank you / You\'re welcome - Basic courtesy.</p><h3>8. Disculpe</h3><p>Excuse me - To get someone\'s attention politely.</p><h3>9. ¿Puedes ayudarme?</h3><p>Can you help me? - When you need assistance.</p><h3>10. Es delicioso</h3><p>It\'s delicious - Show appreciation for local cuisine.</p>',
    excerpt: 'Master these 10 essential Spanish phrases before your next trip to make the most of your travel experience.',
    category: 'Tips',
    tags: ['Spanish', 'Travel', 'Phrases', 'Beginner'],
    published: true,
    publishedAt: '2025-02-10',
    author: 'Travel & Language Team',
  },
  {
    title: 'The Benefits of Learning Japanese for Your Career',
    slug: 'benefits-learning-japanese-career',
    content: '<h2>Why Japanese Skills Matter in Business</h2><p>Japan is the world\'s third-largest economy, and Japanese language skills can significantly boost your career prospects.</p><h3>Business Opportunities</h3><p>Major Japanese companies like Toyota, Sony, Honda, and Panasonic operate globally. Knowing Japanese gives you a competitive edge in automotive, electronics, and technology sectors.</p><h3>Translation and Interpretation</h3><p>There\'s high demand for Japanese translators and interpreters, especially in technical and business fields.</p><h3>Tourism and Hospitality</h3><p>With millions of Japanese tourists worldwide, hotels and travel companies value Japanese-speaking staff.</p><h3>Tech Industry</h3><p>Japan leads in robotics, gaming, and animation. Japanese skills open doors to exciting tech careers.</p><h3>Cultural Exchange Programs</h3><p>Various programs offer opportunities to work and study in Japan, from JET Programme to corporate exchanges.</p>',
    excerpt: 'Explore how learning Japanese can open new career opportunities in business, technology, and international relations.',
    category: 'Career',
    tags: ['Japanese', 'Career', 'Business', 'Opportunities'],
    published: true,
    publishedAt: '2025-02-15',
    author: 'Career Development Team',
  },
];

/**
 * Sample batches
 */
const sampleBatches = [
  {
    language: 'French',
    level: 'A1',
    mode: 'Online',
    startDate: '2025-03-01',
    endDate: '2025-05-31',
    schedule: 'Mon/Wed/Fri 6:00-7:30 PM',
    capacity: 15,
    enrolled: 8,
    price: 15000,
    instructor: 'Sophie Martin',
    status: 'upcoming',
    description: 'Beginner French course covering basics: greetings, introductions, numbers, and everyday conversations.',
  },
  {
    language: 'German',
    level: 'B1',
    mode: 'Hybrid',
    startDate: '2025-03-05',
    endDate: '2025-06-05',
    schedule: 'Tue/Thu/Sat 7:00-8:30 PM',
    capacity: 12,
    enrolled: 10,
    price: 18000,
    instructor: 'Hans Mueller',
    status: 'upcoming',
    description: 'Intermediate German focusing on complex grammar, conversational skills, and exam preparation.',
  },
  {
    language: 'Spanish',
    level: 'A2',
    mode: 'Online',
    startDate: '2025-02-15',
    endDate: '2025-05-15',
    schedule: 'Mon/Thu 5:30-7:00 PM',
    capacity: 20,
    enrolled: 15,
    price: 14000,
    instructor: 'Maria Garcia',
    status: 'ongoing',
    description: 'Elementary Spanish building on A1 foundations with emphasis on practical communication.',
  },
  {
    language: 'Japanese',
    level: 'Beginner',
    mode: 'Online',
    startDate: '2025-03-10',
    endDate: '2025-06-10',
    schedule: 'Wed/Fri 8:00-9:30 PM',
    capacity: 15,
    enrolled: 5,
    price: 16000,
    instructor: 'Yuki Tanaka',
    status: 'upcoming',
    description: 'Introduction to Japanese: Hiragana, Katakana, basic grammar, and essential phrases.',
  },
  {
    language: 'Korean',
    level: 'A1',
    mode: 'Offline',
    startDate: '2025-03-15',
    endDate: '2025-06-15',
    schedule: 'Sat/Sun 10:00-12:00 PM',
    capacity: 10,
    enrolled: 7,
    price: 17000,
    instructor: 'Kim Min-jun',
    status: 'upcoming',
    description: 'Beginner Korean with focus on Hangul, pronunciation, and K-culture immersion.',
  },
  {
    language: 'Mandarin',
    level: 'Beginner',
    mode: 'Online',
    startDate: '2025-02-20',
    endDate: '2025-05-20',
    schedule: 'Tue/Thu/Sat 6:30-8:00 PM',
    capacity: 12,
    enrolled: 9,
    price: 16500,
    instructor: 'Li Wei',
    status: 'ongoing',
    description: 'Chinese basics: Pinyin, tones, characters, and everyday conversations.',
  },
  {
    language: 'English',
    level: 'B2',
    mode: 'Hybrid',
    startDate: '2025-03-01',
    endDate: '2025-05-30',
    schedule: 'Mon/Wed/Fri 4:00-5:30 PM',
    capacity: 18,
    enrolled: 12,
    price: 13000,
    instructor: 'Sarah Johnson',
    status: 'upcoming',
    description: 'Upper-intermediate English for professional and academic contexts, IELTS preparation.',
  },
  {
    language: 'French',
    level: 'B2',
    mode: 'Online',
    startDate: '2025-01-15',
    endDate: '2025-04-15',
    schedule: 'Tue/Thu 7:00-8:30 PM',
    capacity: 10,
    enrolled: 10,
    price: 19000,
    instructor: 'Pierre Dubois',
    status: 'ongoing',
    description: 'Advanced French conversation, literature, and DELF B2 exam preparation.',
  },
];

/**
 * Main seed function
 */
async function seedData() {
  console.log('🌱 Starting data seeding...\n');

  let pb;
  try {
    // Authenticate as admin
    pb = await createAdminClient();

    let blogsCreated = 0;
    let batchesCreated = 0;

    // Check if collections exist
    const hasBlogsCollection = await collectionExists(pb, 'blogs');
    const hasBatchesCollection = await collectionExists(pb, 'batches');

    if (!hasBlogsCollection || !hasBatchesCollection) {
      console.log('❌ Collections not found. Please run: npm run pb:setup first\n');
      process.exit(1);
    }

    // Seed blogs
    console.log('📝 Seeding blog posts...');
    for (const blog of sampleBlogs) {
      try {
        // Check if blog with same slug exists
        const existing = await pb.collection('blogs').getList(1, 1, {
          filter: `slug = "${blog.slug}"`,
        });

        if (existing.items.length > 0) {
          console.log(`⏭️  Skipping blog: ${blog.title} (already exists)`);
          continue;
        }

        await pb.collection('blogs').create(blog);
        console.log(`✅ Created blog: ${blog.title}`);
        blogsCreated++;
      } catch (error) {
        console.error(`❌ Failed to create blog "${blog.title}":`, error.message);
      }
    }

    console.log('');

    // Seed batches
    console.log('📅 Seeding batches...');
    for (const batch of sampleBatches) {
      try {
        // Check if similar batch exists
        const existing = await pb.collection('batches').getList(1, 1, {
          filter: `language = "${batch.language}" && level = "${batch.level}" && startDate = "${batch.startDate}"`,
        });

        if (existing.items.length > 0) {
          console.log(`⏭️  Skipping batch: ${batch.language} ${batch.level} (already exists)`);
          continue;
        }

        await pb.collection('batches').create(batch);
        console.log(`✅ Created batch: ${batch.language} ${batch.level} (${batch.mode})`);
        batchesCreated++;
      } catch (error) {
        console.error(`❌ Failed to create batch "${batch.language} ${batch.level}":`, error.message);
      }
    }

    console.log('');

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Seeding Summary:');
    console.log(`   📝 Blogs created: ${blogsCreated}/${sampleBlogs.length}`);
    console.log(`   📅 Batches created: ${batchesCreated}/${sampleBatches.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🎉 Data seeding complete!');
    console.log('\nYou can now:');
    console.log('  1. Visit the admin panel at: http://localhost:5173/admin');
    console.log('  2. View blogs at: http://localhost:5173/blog');
    console.log('  3. View batches at: http://localhost:5173/batches');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedData().catch(console.error);
}

module.exports = { seedData };

