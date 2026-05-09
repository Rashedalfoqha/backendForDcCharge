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
    console.log('--- 🚀 GENERATING ENTERPRISE-GRADE PRODUCTION DATASET 🚀 ---');

    // Clean existing data
    const models = [
      PageContent, Settings, Post, Message, Subscriber, Testimonial, FAQ, Partner,
      User, Transaction, Invoice, Subscription, Notification, ActivityLog, Customer, Charger, Service
    ];
    await Promise.all(models.map(m => m.deleteMany({})));

    console.log('CLEANED ALL TABLES. STARTING SEEDING...');

    // 1. ADMINS & ROLES
    const admins = await User.create([
      { Email: 'admin@dccharge.jo', password: 'password123' }, // Roles aren't fully implemented in model, but we seed anyway
      { Email: 'moderator@dccharge.jo', password: 'password123' },
      { Email: 'support@dccharge.jo', password: 'password123' }
    ]);
    const adminId = admins[0]._id;

    // 2. SETTINGS
    await Settings.create({
      siteName: 'DC Charge Middle East',
      logoUrl: 'https://i.ibb.co/Lz9PcCNs/Whats-App-Image-2025-12-17-at-01-33-54-ac1602cf.jpg',
      theme: { primaryColor: '#10b981', secondaryColor: '#0f172a', darkMode: true },
      contactEmail: 'hq@dccharge.jo',
      socialLinks: { whatsapp: '962790000000', facebook: 'https://fb.com/dccharge' },
      mainMenu: [
        { label: { en: 'Home', ar: 'الرئيسية' }, link: '/', order: 1 },
        { label: { en: 'Services', ar: 'الخدمات' }, link: '/products-and-services', order: 2 },
        { label: { en: 'About', ar: 'من نحن' }, link: '/about', order: 3 },
        { label: { en: 'Contact', ar: 'اتصل بنا' }, link: '/contact', order: 4 }
      ]

    });

    // 3. 50+ REALISTIC TRANSACTIONS (Last 30 days)
    const transactions = [];
    const paymentMethods = ['credit_card', 'paypal', 'apple_pay', 'bank_transfer'];
    const statuses = ['completed', 'completed', 'completed', 'failed', 'pending'];
    const types = ['charging', 'subscription', 'hardware', 'service'];

    for(let i=0; i<100; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        transactions.push({
            amount: Math.floor(Math.random() * 500) + 10,
            currency: 'JOD',
            status: statuses[Math.floor(Math.random() * statuses.length)],
            type: types[Math.floor(Math.random() * types.length)],
            paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
            description: `Transaction ${i+1} for EV Charging services`,
            reference: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            createdAt: date
        });
    }
    await Transaction.insertMany(transactions);

    // 4. 20+ INVOICES
    const invoices = [];
    for(let i=0; i<40; i++) {
        const amount = Math.floor(Math.random() * 1000) + 50;
        invoices.push({
            invoiceNumber: `INV-2026-${1000 + i}`,
            amount: amount,
            tax: amount * 0.16,
            total: amount * 1.16,
            status: i % 5 === 0 ? 'unpaid' : 'paid',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            items: [{ description: 'Monthly Subscription', quantity: 1, price: amount }]
        });
    }
    await Invoice.insertMany(invoices);

    // 5. SUBSCRIPTIONS
    const subs = [];
    const plans = ['basic', 'premium', 'enterprise'];
    for(let i=0; i<50; i++) {
        subs.push({
            plan: plans[Math.floor(Math.random() * plans.length)],
            status: i % 10 === 0 ? 'expired' : 'active',
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });
    }
    await Subscription.insertMany(subs);

    // 6. NOTIFICATIONS
    const notifs = [
      { title: 'New Customer Registered', message: 'A new user from Amman just joined the platform.', type: 'success' },
      { title: 'System Update Scheduled', message: 'Maintenance scheduled for Sunday at 2:00 AM.', type: 'info' },
      { title: 'Payment Failed', message: 'Invoice #INV-2026-1045 payment was declined.', type: 'error' },
      { title: 'Low Charger Capacity', message: 'Station #7 in Irbid is reporting low power throughput.', type: 'warning' }
    ];
    await Notification.insertMany(notifs);

    // 7. ACTIVITY LOGS
    const activities = [
      { adminId, action: 'LOGIN', module: 'AUTH', details: 'Admin logged in from IP 192.168.1.1' },
      { adminId, action: 'UPDATE_SETTINGS', module: 'SETTINGS', details: 'Primary color changed to Emerald 500' },
      { adminId, action: 'DELETE_POST', module: 'NEWS', details: 'Draft post #45 removed' },
      { adminId, action: 'EXPORT_DATA', module: 'REPORTS', details: 'Financial report for Q1 2026 exported' }
    ];
    await ActivityLog.insertMany(activities);

    // 8. MESSAGES & SUBSCRIBERS
    const messages = [];
    for(let i=0; i<30; i++) {
        messages.push({
            name: `Client ${i}`,
            email: `client${i}@example.com`,
            subject: i % 3 === 0 ? 'Technical Issue' : 'Business Inquiry',
            message: 'I am interested in installing 5 DC fast chargers at my mall in Aqaba. Please send a quote.',
            isRead: i > 10
        });
    }
  await Message.insertMany(messages);

    const newsletters = [];
    for(let i=0; i<150; i++) {
        newsletters.push({ email: `user_${i}@jordan-mail.com` });
    }
    await Subscriber.insertMany(newsletters);

    // 9. NEWS POSTS (Rich content)
    await Post.create([
      { title: 'Expanding Fast Charging Network to Aqaba', body: 'We are proud to announce 10 new 150kW chargers in Aqaba city center.', language: 'en', status: 'published', imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7' },
      { title: 'توسيع شبكة الشحن السريع إلى العقبة', body: 'نفخر بالإعلان عن 10 شواحن سريعة جديدة بقدرة 150 كيلووات في وسط مدينة العقبة.', language: 'ar', status: 'published', imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7' },
      { title: 'EV Sales in Jordan Reach Record Highs', body: 'Over 40% of new car registrations in 2026 are electric vehicles.', language: 'en', status: 'published', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3' }
    ]);

    // 10. CHARGERS & SERVICES
    await Charger.create([
      { language: 'en', mainTitle: 'DC Fast Charger', title: '150kW Ultra Speed', description: 'Dual connectors, CCS2 standard.', imageUrl: ['https://images.unsplash.com/photo-1620216533935-1f9e99279471'] },
      { language: 'ar', mainTitle: 'شاحن سريع DC', title: '150 كيلووات سرعة فائقة', description: 'موصلات مزدوجة، معيار CCS2.', imageUrl: ['https://images.unsplash.com/photo-1620216533935-1f9e99279471'] }
    ]);

    // 11. PAGE CONTENT (CRITICAL FOR FRONTEND)
    const pages = [
      {
        page: 'home',
        language: 'en',
        slug: 'home-en',
        title: 'Leading EV Charging Solutions',
        sections: [
          { id: 'hero', type: 'hero', heading: 'The Future of EV Charging is Here', content: 'We provide the fastest, most reliable charging network in the Middle East.', ctaText: 'Join the Revolution', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7' },
          { id: 'stats', type: 'stats', heading: 'Our Growth', features: [{ name: 'Stations', value: 120 }, { name: 'Happy Clients', value: 5000 }, { name: 'Energy Saved', value: 95000 }] }
        ]
      },
      {
        page: 'home',
        language: 'ar',
        slug: 'home-ar',
        title: 'حلول شحن المركبات الكهربائية الرائدة',
        sections: [
          { id: 'hero', type: 'hero', heading: 'مستقبل شحن السيارات الكهربائية هنا', content: 'نحن نوفر شبكة الشحن الأسرع والأكثر موثوقية في الشرق الأوسط.', ctaText: 'انضم إلى الثورة', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7' },
          { id: 'stats', type: 'stats', heading: 'نمونا', features: [{ name: 'محطات', value: 120 }, { name: 'عملاء سعداء', value: 5000 }, { name: 'طاقة موفرة', value: 95000 }] }
        ]
      },
      {
        page: 'installation-services',
        language: 'en',
        slug: 'installation-services-en',
        title: 'Professional Installation Services',
        sections: [
          { id: 'main', type: 'services', heading: 'Home & Business Setup', content: 'Our certified technicians ensure a seamless installation experience.', image: ['https://images.unsplash.com/photo-1563986768609-322da13575f3'] }
        ]
      },
      {
        page: 'installation-services',
        language: 'ar',
        slug: 'installation-services-ar',
        title: 'خدمات التركيب الاحترافية',
        sections: [
          { id: 'main', type: 'services', heading: 'تجهيزات المنازل والأعمال', content: 'يضمن فنيونا المعتمدون تجربة تركيب سلسة.', image: ['https://images.unsplash.com/photo-1563986768609-322da13575f3'] }
        ]
      }
    ];
    await PageContent.insertMany(pages);



    console.log('--- ✅ MASSIVE SEEDING SUCCESSFUL! YOUR DASHBOARD IS NOW ALIVE 🔥 ---');
    process.exit(0);
  } catch (err) { 
    console.error('❌ SEEDING FAILED:', err); 
    process.exit(1); 
  }
};

seedMassiveData();
