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
      image: 'black-shirt-squares.png',
      category: categories[0]._id,
      price: 55.00,
      quantity: 500
    },
    {
      name: 'Grey Solid Tee',
      sku: '49857',
      description:
        'Round neck tee in solid grey. Designed for extra comfort.  100% cotton',
      image: 'grey-t-shirt.png',
      category: categories[0]._id,
      price: 48.00,
      quantity: 300
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
