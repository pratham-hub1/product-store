// Central product inventory.
// Each product follows the schema required by the practical:
//   id, name, category, price, quantity (available stock), image
// plus a `description` and `rating` used on the Product Details page.

export const products = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 55000,
    quantity: 12,
    image: '/products/laptop.svg',
    rating: 4.6,
    description:
      'A lightweight 14-inch ultrabook with a full-HD display, 16 GB RAM and a fast SSD. Built for students and professionals who need reliable everyday performance.',
  },
  {
    id: 2,
    name: 'Mouse',
    category: 'Electronics',
    price: 800,
    quantity: 40,
    image: '/products/mouse.svg',
    rating: 4.4,
    description:
      'An ergonomic optical mouse with a 1600 DPI sensor and silent-click buttons. Comfortable for long working sessions.',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 3200,
    quantity: 25,
    image: '/products/keyboard.svg',
    rating: 4.7,
    description:
      'A compact tenkeyless mechanical keyboard with tactile switches, per-key backlighting and a durable aluminium frame.',
  },
  {
    id: 4,
    name: 'Monitor',
    category: 'Electronics',
    price: 14500,
    quantity: 15,
    image: '/products/monitor.svg',
    rating: 4.5,
    description:
      'A 24-inch IPS monitor with a 75 Hz refresh rate, slim bezels and an adjustable stand. Great for coding and design work.',
  },
  {
    id: 5,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 2499,
    quantity: 30,
    image: '/products/headphones.svg',
    rating: 4.3,
    description:
      'Over-ear wireless headphones with active noise cancellation and up to 30 hours of playback on a single charge.',
  },
  {
    id: 6,
    name: 'Chair',
    category: 'Furniture',
    price: 4500,
    quantity: 8,
    image: '/products/chair.svg',
    rating: 4.2,
    description:
      'A sturdy study chair with a cushioned seat, breathable backrest and a powder-coated steel frame.',
  },
  {
    id: 7,
    name: 'Study Desk',
    category: 'Furniture',
    price: 7800,
    quantity: 6,
    image: '/products/desk.svg',
    rating: 4.4,
    description:
      'A spacious writing desk with a scratch-resistant laminate top and a built-in cable-management channel.',
  },
  {
    id: 8,
    name: 'Bookshelf',
    category: 'Furniture',
    price: 6200,
    quantity: 9,
    image: '/products/bookshelf.svg',
    rating: 4.1,
    description:
      'A five-tier open bookshelf that holds books, files and decor without taking up much floor space.',
  },
  {
    id: 9,
    name: 'Notebook',
    category: 'Stationery',
    price: 100,
    quantity: 120,
    image: '/products/notebook.svg',
    rating: 4.5,
    description:
      'A 200-page ruled notebook with a soft-touch cover and thick, bleed-resistant paper.',
  },
  {
    id: 10,
    name: 'Gel Pen',
    category: 'Stationery',
    price: 150,
    quantity: 200,
    image: '/products/pen.svg',
    rating: 4.6,
    description:
      'A pack of five smooth-writing gel pens with quick-dry ink and a comfortable rubber grip.',
  },
  {
    id: 11,
    name: 'Sticky Notes',
    category: 'Stationery',
    price: 60,
    quantity: 180,
    image: '/products/sticky-notes.svg',
    rating: 4.3,
    description:
      'Bright, repositionable sticky notes that stick cleanly and peel off without leaving residue.',
  },
  {
    id: 12,
    name: 'Backpack',
    category: 'Accessories',
    price: 1299,
    quantity: 22,
    image: '/products/backpack.svg',
    rating: 4.4,
    description:
      'A water-resistant 25 L backpack with a padded laptop sleeve and multiple organiser pockets.',
  },
  {
    id: 13,
    name: 'Desk Lamp',
    category: 'Accessories',
    price: 899,
    quantity: 35,
    image: '/products/lamp.svg',
    rating: 4.5,
    description:
      'An LED desk lamp with three brightness levels and a flexible arm for focused, eye-friendly light.',
  },
  {
    id: 14,
    name: 'Water Bottle',
    category: 'Accessories',
    price: 499,
    quantity: 60,
    image: '/products/bottle.svg',
    rating: 4.2,
    description:
      'An insulated stainless-steel bottle that keeps drinks cold for 24 hours and hot for 12.',
  },
]

// Unique category list, derived from the products so it never goes stale.
export const categories = ['All', ...new Set(products.map((p) => p.category))]

// Helper used by the Product Details page and Cart.
export const getProductById = (id) => products.find((p) => p.id === Number(id))
