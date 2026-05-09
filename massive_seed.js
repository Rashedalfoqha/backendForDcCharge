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
const User = require('./models/userAdmin');
const Transaction = require('./models/Transaction');
const Invoice = require('./models/Invoice');
const Subscription = require('./models/Subscription');
const Notification = require('./models/Notification');
const ActivityLog = require('./models/ActivityLog');
const Customer = require('./models/Customers');
const Charger = require('./models/chargers');
const Service = require('./models/productServicesSchema');

const seedMassiveData = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('--- 🚀 GENERATING PREMIUM DATASET WITH LOCAL ASSETS 🚀 ---');

    const models = [
      PageContent, Settings, Post, Message, Subscriber, Testimonial, FAQ, Partner,
      User, Transaction, Invoice, Subscription, Notification, ActivityLog, Customer, Charger, Service
    ];
    await Promise.all(models.map(m => m.deleteMany({})));

    await User.create([{ Email: 'admin@dccharge.jo', password: 'password123' }]);

    await Settings.create({
      siteName: 'EV Solution JO',
      logoUrl: 'https://i.ibb.co/Lz9PcCNs/Whats-App-Image-2025-12-17-at-01-33-54-ac1602cf.jpg',
      theme: { primaryColor: '#10b981', secondaryColor: '#0f172a', darkMode: true },
      contactEmail: 'hq@dccharge.jo',
      socialLinks: { 
        whatsapp: '962790085686', 
        facebook: 'https://www.facebook.com/EVSolutionJo',
        youtube: 'https://www.youtube.com/@EVSolutionJo',
        instagram: 'https://www.instagram.com/EVSolutionJo',
        linkedin: 'https://www.linkedin.com/company/evsolutionjo'
      }
    });

    const newsData = [];
    for(let i=1; i<=10; i++) {
      newsData.push({
        title: i === 1 ? 'Massive Expansion of Charging Network' : `EV Market Update Q${(i%4)+1} - 2024`,
        body: 'EV Solution JO is proud to announce the installation of 20 new ultra-fast DC charging stations across the desert highway, connecting Amman to Aqaba seamlessly.',
        language: i % 2 === 0 ? 'ar' : 'en',
        status: 'published',
        imageUrl: '/assets/hero.png', // Use our high-quality asset
        publishedDate: new Date(Date.now() - i * 86400000)
      });
    }
    await Post.insertMany(newsData);

    const pages = [
      {
        page: 'home', language: 'en', slug: 'home-en', title: 'Leading EV Solutions',
        sections: [
          { id: 'hero', type: 'hero', heading: 'The Future of EV Charging', content: ['Empowering Jordan with high-speed sustainable energy.'], image: '/assets/hero.png' },
          { id: 'stats', type: 'stats', heading: 'Impact', features: [{ name: 'Stations', value: 150 }, { name: 'Active Users', value: 12000 }] },
          { id: 'Our Story & Vision', type: 'story', heading: 'Vision 2030', content: ['Creating a green transportation ecosystem.'], image: '/assets/about.png' },
          { id: 'Why Choose Us?', type: 'features', heading: 'Why Us?', content: ['Certified expertise and 24/7 support.'], image: '/assets/hero.png' }
        ]
      },
      {
        page: 'home', language: 'ar', slug: 'home-ar', title: 'حلول شحن المركبات',
        sections: [
          { id: 'hero', type: 'hero', heading: 'مستقبل شحن السيارات', content: ['تمكين الأردن بالطاقة المستدامة عالية السرعة.'], image: '/assets/hero.png' },
          { id: 'stats', type: 'stats', heading: 'تأثيرنا', features: [{ name: 'محطة', value: 150 }, { name: 'مستخدم', value: 12000 }] },
          { id: 'Our Story & Vision', type: 'story', heading: 'رؤية 2030', content: ['إنشاء نظام نقل أخضر.'], image: '/assets/about.png' },
          { id: 'Why Choose Us?', type: 'features', heading: 'لماذا نحن؟', content: ['خبرة معتمدة ودعم متواصل.'], image: '/assets/hero.png' }
        ]
      }
    ];

    const otherSlugs = ['about-2', 'installation-services', 'products-and-services', 'exp-consulting-services-for-charging-stations', 'dc-chargers', 'ev-chargers-repair', 'ac-chargers'];
    for(const slug of otherSlugs) {
        pages.push({
            page: slug, language: 'en', slug: `${slug}-en`, title: slug.toUpperCase(),
            sections: [{ id: 'hero', heading: `Expert ${slug}`, content: ['Excellence in every detail.'], image: '/assets/about.png' }]
        });
        pages.push({
            page: slug, language: 'ar', slug: `${slug}-ar`, title: `خدمة ${slug}`,
            sections: [{ id: 'hero', heading: `خبرة في ${slug}`, content: ['التميز في كل التفاصيل.'], image: '/assets/about.png' }]
        });
    }

    await PageContent.insertMany(pages);
    console.log(`--- ✅ SEEDED ALL DATA WITH LOCAL ASSETS ✅ ---`);
    process.exit(0);
  } catch (err) {
    console.error('❌ SEEDING FAILED:', err);
    process.exit(1);
  }
};

seedMassiveData();
