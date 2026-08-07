const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Ticket = require('../models/Ticket');
const Cart = require('../models/Cart');

dotenv.config({ path: '../.env' });

const initialProducts = [
  {
    name: 'Vitamin C Brightening Serum',
    category: 'Skincare',
    price: 34.99,
    stock: 25,
    description: 'Advanced antioxidant formula enriched with 15% pure Vitamin C and Hyaluronic Acid to brighten skin and fade dark spots.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Sunscreen SPF50 Ultra Shield',
    category: 'Skincare',
    price: 26.50,
    stock: 4, // Low stock demo!
    description: 'Lightweight broad-spectrum daily sun protection with zero white cast and matte satin finish.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Hydrating Botanical Face Wash',
    category: 'Skincare',
    price: 22.00,
    stock: 18,
    description: 'Gentle foaming facial cleanser infused with Green Tea and Aloe Vera to cleanse without drying.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Deep Moisture Gel Cream',
    category: 'Skincare',
    price: 38.00,
    stock: 3, // Low stock demo!
    description: '72-hour continuous hydration gel moisturizer powered by Ceramide complex and Rose Water extracts.',
    image: 'https://images.unsplash.com/photo-1608248597263-000796df9c11?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Clarifying Rose Essence Toner',
    category: 'Skincare',
    price: 24.00,
    stock: 30,
    description: 'Balancing skin toner with Niacinamide and organic Rose Petals to refine pores and refresh complexion.',
    image: 'https://images.unsplash.com/photo-1567928269937-ae146e45b428?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Velvet Matte Silk Lipstick',
    category: 'Makeup',
    price: 28.00,
    stock: 15,
    description: 'Richly pigmented classic nude lipstick with a comfortable non-drying velvet satin finish.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Volumizing Waterproof Mascara',
    category: 'Makeup',
    price: 19.99,
    stock: 22,
    description: 'Dramatic length and volume lash booster brush with smudge-proof 24h wear formula.',
    image: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Precision Liquid Eyeliner',
    category: 'Makeup',
    price: 16.50,
    stock: 2, // Low stock demo!
    description: 'Ultra-fine felt tip waterproof eyeliner pen for precise winged lines that stay intense all day.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Luminous Glow Liquid Foundation',
    category: 'Makeup',
    price: 42.00,
    stock: 14,
    description: 'Medium buildable coverage foundation that seamlessly blends for a radiant, natural glow.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Flawless Finish Compact Powder',
    category: 'Makeup',
    price: 29.50,
    stock: 19,
    description: 'Silky micro-powder compact that sets makeup, absorbs excess oil, and leaves a soft focus blur.',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Pore-Blurring Smooth Primer',
    category: 'Makeup',
    price: 31.00,
    stock: 12,
    description: 'Weightless skin-smoothing primer canvas that extends makeup longevity and minimizes pore appearance.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Micellar Water Makeup Remover',
    category: 'Makeup',
    price: 18.00,
    stock: 40,
    description: 'Effortlessly dissolves stubborn waterproof makeup while soothing sensitive skin with Cucumber extract.',
    image: 'https://images.unsplash.com/photo-1556228722-d119139265f2?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Nourishing Argan Hair Serum',
    category: 'Hair Care',
    price: 32.00,
    stock: 15,
    description: 'Luxurious leave-in hair oil formula that tames frizz, restores shine, and protects against heat damage.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Rose & Vanilla Parfum Deluxe',
    category: 'Fragrance',
    price: 85.00,
    stock: 8,
    description: 'An enchanting bouquet of Damascus Rose, Creamy Vanilla, and warm Amber undertones in an elegant crystal bottle.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
  },
];

const seedData = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/glowbeauty';
    await mongoose.connect(connStr);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Ticket.deleteMany({});
    await Cart.deleteMany({});

    // Create Admin
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const customerPassword = await bcrypt.hash('customer123', salt);

    const adminUser = await User.create({
      name: 'GlowBeauty Admin',
      email: 'admin@glowbeauty.com',
      password: adminPassword,
      phone: '+1 800 555 0199',
      address: '100 Luxury Boulevard, Suite 500, New York, NY',
      role: 'admin',
    });

    const customerUser = await User.create({
      name: 'Fatema Zarin Borsha',
      email: 'borsha@gmail.com',
      password: customerPassword,
      phone: '01954739426',
      address: 'dhaka,bangladesh',
      role: 'customer',
    });

    console.log('Default Accounts Created:');
    console.log('Admin: admin@glowbeauty.com / admin123');
    console.log('Customer: borsha@gmail.com / customer123');

    // Create Products
    const createdProducts = await Product.insertMany(initialProducts);
    console.log(`Inserted ${createdProducts.length} products.`);

    // Create initial demo order for customer
    const demoOrder = await Order.create({
      userId: customerUser._id,
      products: [
        {
          productId: createdProducts[0]._id,
          name: createdProducts[0].name,
          image: createdProducts[0].image,
          price: createdProducts[0].price,
          quantity: 1,
        },
        {
          productId: createdProducts[5]._id,
          name: createdProducts[5].name,
          image: createdProducts[5].image,
          price: createdProducts[5].price,
          quantity: 2,
        },
      ],
      shippingAddress: customerUser.address,
      phone: customerUser.phone,
      totalPrice: createdProducts[0].price + createdProducts[5].price * 2,
      status: 'Processing',
    });

    console.log('Created Demo Order:', demoOrder._id);

    // Create initial demo support ticket
    await Ticket.create({
      userId: customerUser._id,
      subject: 'Inquiry regarding shipping delivery time',
      message: 'Hello, I placed an order yesterday and would like to confirm when it will be dispatched.',
      reply: 'Hello Fatema Zarin Borsha, your order is currently being processed by our fulfillment team and will ship tomorrow!',
      status: 'Open',
    });

    console.log('Created Demo Support Ticket');
    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error.message);
    process.exit(1);
  }
};

seedData();
