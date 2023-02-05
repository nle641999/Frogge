const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {

  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Shirts' },
    { name: 'Pants' },
    { name: 'Jackets' },
    { name: 'Shoes' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Black Tee with Squares',
      sku: '49856',
      description:
        'Round neck tee in black. Features a print design of green squares simulating paint strokes.  100% cotton',
      image: 'black-shirt-squares',
      category: categories[0]._id,
      price: 55.00,
      quantity: 500
    },
    {
      name: 'Teel Solid Summer Tee',
      sku: '49857',
      description:
        'Round neck tee in solid teel color. Designed for extra comfort.  100% cotton',
      image: 'teel-t-shirt.png',
      category: categories[0]._id,
      price: 50.00,
      quantity: 200
    },
    {
      name: 'Orange Solid Tee',
      sku: '49858',
      description:
        'Round neck tee in solid orange color. Designed for extra comfort.  100% cotton',
      image: 'orange-t-shirt.png',
      category: categories[0]._id,
      price: 45.00,
      quantity: 280
    },
    {
      name: 'Blue Solid Tee',
      sku: '49859',
      description:
        'Round neck tee in solid blue color. Designed for extra comfort.  100% cotton',
      image: 'blue-t-shirt.png',
      category: categories[0]._id,
      price: 45.00,
      quantity: 260
    },
    {
      name: 'Yellow Solid Tee',
      sku: '49860',
      description:
        'Round neck tee in solid orange color. Designed for extra comfort.  100% cotton',
      image: 'yellow-t-shirt.png',
      category: categories[0]._id,
      price: 45.00,
      quantity: 210
    },
    {
      name: 'Pink Solid Tee',
      sku: '49861',
      description:
        'Round neck tee in solid pink color. Designed for extra comfort.  100% cotton',
      image: 'pink-t-shirt.png',
      category: categories[0]._id,
      price: 45.00,
      quantity: 275
    },
    {
      name: 'Lime Green Solid Tee',
      sku: '49862',
      description:
        'Round neck tee in solid lime green color. Designed for extra comfort.  100% cotton',
      image: 'green-t-shirt.png',
      category: categories[0]._id,
      price: 45.00,
      quantity: 300
    },
    {
      name: 'Red Solid Tee',
      sku: '49863',
      description:
        'Round neck tee in solid red color. Designed for extra comfort.  100% cotton',
      image: 'red-t-shirt.png',
      category: categories[0]._id,
      price: 45.00,
      quantity: 200
    }
  ]);

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
