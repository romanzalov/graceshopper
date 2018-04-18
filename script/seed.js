/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

const db = require('../server/db')
const {User, Review, Order, productInstance, Product, Category, ProductCategory} = require('../server/db/models');


var Products = [
    {
        sportType: 'Football',
        title: 'Shoulder Pads',
        quantity: 7,
        price: 23.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"
    },
    {
        sportType: 'Football',
        title: 'Helmet',
        quantity: 6,
        price: 35.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"
    },
    {
        sportType: 'Soccer',
        title: 'Soccer Ball',
        quantity: 3,
        price: 50.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"
    },
    {
        sportType: 'Basketball',
        title: 'Basketball Shoes',
        quantity: 13,
        price: 250.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"
    },
    {
        sportType: 'Combat Sports',
        title: 'Boxing Gloves',
        quantity: 4,
        price: 80.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"
    },
    {
        sportType: 'Swimming',
        title: 'Speedo',
        quantity: 200,
        price: 2.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"
    },
    {
        sportType: 'Football',
        title: 'Cleats',
        quantity: 4,
        price: 150.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"
    },
    {
        sportType: 'Hockey',
        title: 'Hockey Puck',
        quantity: 9,
        price: 5.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"

    },
    {
        sportType: 'Baseball',
        title: 'Baseball Bat',
        quantity: 6,
        price: 100.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"
    },
    {
        sportType: 'Volleyball',
        title: 'Girls Volleyball Shorts',
        quantity: 15,
        price: 8.00,
        imageUrls: ["https://picsum.photos/700/400"],
        description: "A sport"
    }
];

var ProductInstances = [
  {price: 29.99, quantity: 1, orderId: 1, productId: 2},
  {price: 9.99, quantity: 1, orderId: 1, productId: 1},
  {price: 39.99, quantity: 2, orderId: 1, productId: 4},
  {price: 29.99, quantity: 1, orderId: 2, productId: 5},
  {price: 229.99, quantity: 1, orderId: 5, productId: 6},
  {price: 1239.99, quantity: 1, orderId: 3, productId: 7},
  {price: 9.99, quantity: 1, orderId: 4, productId: 8}
]

var Orders = [
  {isCart: false, userId: 1, status: 'Created'},
  {isCart: false, userId: 2, status: 'Processing'},
  {isCart: false, userId: 1, status: 'Created'},
  {isCart: false, userId: 2, status: 'Cancelled'},
  {isCart: false, userId: 1, status: 'Completed'},
]

var Users = [
  {email: 'cody@email.com', password: '123', address: {Description: 'address 1, Chicago'}},
  {email: 'murphy@email.com', password: '123', address: {Description: 'address 2, Chicago'}},
]

async function seed () {
  await db.sync({force: true});
  console.log('db synced!')
  await User.destroy({where: {}});
  await productInstance.destroy({where: {}});
  await Product.destroy({where: {}});
  await Review.destroy({where: {}});
  await Order.destroy({where: {}});
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  await Product.bulkCreate(Products)

  await User.bulkCreate(Users)

  await Order.bulkCreate(Orders)

  await productInstance.bulkCreate(ProductInstances);

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
