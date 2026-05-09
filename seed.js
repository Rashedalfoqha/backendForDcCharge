const mongoose = require('mongoose');
require('dotenv').config();

const PageContent = require('./models/pageContent');
const Settings = require('./models/settings');
const Post = require('./models/postNewsSchema');
const Message = require('./models/messages');
const Subscriber = require('./models/subscribers');
const Testimonial = require('./models/testimonials');
const FAQ = require('./models/faq');
const Partner = require('./models/partners');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('--- GENERATING MASSIVE PRODUCTION DATASET ---');

    await Promise.all([
      PageContent.deleteMany({}), Settings.deleteMany({}), Post.deleteMany({}),
      Message.deleteMany({}), Subscriber.deleteMany({}), Testimonial.deleteMany({}),
      FAQ.deleteMany({}), Partner.deleteMany({})
    ]);

    // 1. SETTINGS & ANALYTICS MOCK
    await Settings.create({
      siteName: 'DC Charge Jordan',
      logoUrl: 'https://i.ibb.co/Lz9PcCNs/Whats-App-Image-2025-12-17-at-01-33-54-ac1602cf.jpg',
      theme: { primaryColor: '#16a34a', secondaryColor: '#1e293b', darkMode: true },
      mainMenu: [
        { label: { en: 'Home', ar: 'الرئيسية' }, link: '/', order: 1 },
        { label: { en: 'Stations', ar: 'المحطات' }, link: '/stations', order: 2 },
        { label: { en: 'News', ar: 'الأخبار' }, link: '/news', order: 3 },
        { label: { en: 'Services', ar: 'الخدمات' }, link: '/services', order: 4 }
      ],
      contactEmail: 'support@dccharge.jo',
      socialLinks: { whatsapp: '962790085686', facebook: 'https://fb.com/dccharge' }
    });

    // 2. 15+ REALISTIC MESSAGES
    const messages = [];
    for(let i=1; i<=15; i++) {
      messages.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        subject: i % 2 === 0 ? 'Installation Inquiry' : 'App Support',
        message: `This is a realistic message ${i} regarding the charging stations. We need more chargers in Irbid.`,
        isRead: i > 5
      });
    }
    await Message.create(messages);

    // 3. 25+ SUBSCRIBERS
    const subs = [];
    for(let i=1; i<=25; i++) {
      subs.push({ email: `subscriber${i}@domain.jo` });
    }
    await Subscriber.create(subs);

    // 4. RICH NEWS POSTS
    await Post.create([
      { title: 'Jordan Power Grid Update 2026', body: 'The national grid is now 100% ready for the EV boom.', language: 'en', status: 'published', imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7' },
      { title: 'تحديث شبكة الكهرباء الأردنية 2026', body: 'الشبكة الوطنية الآن جاهزة بنسبة 100٪ لطفرة السيارات الكهربائية.', language: 'ar', status: 'published', imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7' }
    ]);

    // 5. PAGE SECTIONS
    await PageContent.create({
      page: 'home',
      slug: '/',
      sections: [
        { id: 'hero', type: 'hero', order: 1, isVisible: true, heading: { en: 'Empowering Future', ar: 'تمكين المستقبل' }, content: { en: 'Seamless charging.', ar: 'شحن سلس.' }, image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7' },
        { id: 'stats', type: 'stats', order: 2, isVisible: true, items: [{ label: { en: 'Active Users', ar: 'مستخدم نشط' }, value: '24,500' }, { label: { en: 'Revenue', ar: 'الأرباح' }, value: '$120k' }] }
      ]
    });

    console.log('--- MASSIVE SEEDING SUCCESSFUL 🔥🚀 ---');
    process.exit(0);
  } catch (err) { console.error(err); process.exit(1); }
};
seedData();
