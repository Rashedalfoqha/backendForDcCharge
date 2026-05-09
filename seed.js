const mongoose = require('mongoose');
require('dotenv').config();

const PageContent = require('./models/pageContent');
const Post = require('./models/postNewsSchema');
const Brand = require('./models/brand');
const Service = require('./models/productServicesSchema');
const Charger = require('./models/chargers');
const Customer = require('./models/Customers');
const Settings = require('./models/settings');
const Partner = require('./models/partners');
const Testimonial = require('./models/testimonials');
const FAQ = require('./models/faq');
const Gallery = require('./models/gallery');

const seedData = async () => {
  try {
    console.log('Connecting to DB for seeding...');
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected!');

    // 1. Settings
    await Settings.deleteMany({});
    await Settings.create({
      siteName: 'DC Charge Jordan',
      logoUrl: 'https://via.placeholder.com/200x80?text=DC+Logo',
      contactEmail: 'info@dccharge.jo',
      contactPhone: '+962 79 000 0000',
      socialLinks: {
        facebook: 'https://facebook.com/dccharge',
        instagram: 'https://instagram.com/dccharge',
        whatsapp: 'https://wa.me/962790000000'
      }
    });

    // 2. Partners
    await Partner.deleteMany({});
    await Partner.create([
      { name: 'Tesla', logoUrl: 'https://via.placeholder.com/150?text=Tesla', websiteUrl: 'https://tesla.com', order: 1 },
      { name: 'ABB', logoUrl: 'https://via.placeholder.com/150?text=ABB', websiteUrl: 'https://abb.com', order: 2 }
    ]);

    // 3. FAQs
    await FAQ.deleteMany({});
    await FAQ.create([
      { 
        question: { en: 'How long does it take to charge?', ar: 'كم يستغرق الشحن؟' },
        answer: { en: 'It depends on the charger type (AC vs DC).', ar: 'يعتمد ذلك على نوع الشاحن.' },
        category: 'Charging'
      }
    ]);

    // 4. Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.create([
      {
        name: { en: 'Ahmad Salem', ar: 'أحمد سالم' },
        position: { en: 'EV Owner', ar: 'مالك سيارة كهربائية' },
        comment: { en: 'Great service and fast installation!', ar: 'خدمة ممتازة وتركيب سريع!' },
        rating: 5,
        imageUrl: 'https://via.placeholder.com/100?text=User'
      }
    ]);

    // 5. Page Content (Home)
    await PageContent.deleteMany({ page: 'home' });
    await PageContent.create({
      page: 'home',
      language: 'en',
      title: 'Home - DC Charge',
      sections: [
        {
          id: 'hero',
          heading: 'Charge Your EV Anywhere',
          subheading: 'Reliable charging solutions for Jordan',
          content: 'Find charging stations, monitor your charge, and pay seamlessly with our mobile app.',
          buttonText: 'Get Started',
          image: 'https://via.placeholder.com/800x600?text=Hero+Image'
        }
      ]
    });

    // 6. Services
    await Service.deleteMany({});
    await Service.create([
      {
        language: 'en',
        title: 'Home Installation',
        description: 'Professional installation of home EV chargers with warranty.',
        imageUrl: ['https://via.placeholder.com/400x300?text=Home+Install']
      }
    ]);

    // 7. Chargers
    await Charger.deleteMany({});
    await Charger.create([
      {
        language: 'en',
        mainTitle: 'DC Fast Chargers',
        title: '60kW Rapid Charger',
        description: 'Ultra-fast charging for commercial locations.',
        imageUrl: ['https://via.placeholder.com/400x300?text=Charger+60kW']
      }
    ]);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
