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
        imageUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aBJG9i08FDWB2VIRPfRx8e1VQsMfXpXfmLo7iH_Tr_mMiCCJ9g"],
        description: "A sport"
    },
    {
        sportType: 'Football',
        title: 'Helmet',
        quantity: 6,
        price: 35.00,
        imageUrls: ["https://s7d2.scene7.com/is/image/dkscdn/17SHUYYTHVNGNC3WHFTA_White_Grey_is/"],
        description: "A sport"
    },
    {
        sportType: 'Soccer',
        title: 'Soccer Ball',
        quantity: 3,
        price: 50.00,
        imageUrls: ["https://s7d2.scene7.com/is/image/dkscdn/17NIKUSTRKSMBKBWHSCB_Black_Blue_White_is/"],
        description: "A sport"
    },
    {
        sportType: 'Basketball',
        title: 'Basketball Shoes',
        quantity: 13,
        price: 250.00,
        imageUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gJq_HvPO-gQ1gEPjX7AE5-E4OVcOJa_i6XB8xCBgaTxzfwTD0A"],
        description: "A sport"
    },
    {
        sportType: 'Combat Sports',
        title: 'Boxing Gloves',
        quantity: 4,
        price: 80.00,
        imageUrls: ["https://img2.cgtrader.com/items/85324/7343b508cf/large/boxing-gloves-3d-model-max.jpg"],
        description: "A sport"
    },
    {
        sportType: 'Swimming',
        title: 'Speedo',
        quantity: 200,
        price: 2.00,
        imageUrls: ["https://www.pride.com/sites/www.pride.com/files/2016/07/12/screen_shot_2016-07-12_at_9.51.02_am.png"],
        description: "A sport"
    },
    {
        sportType: 'Football',
        title: 'Cleats',
        quantity: 4,
        price: 150.00,
        imageUrls: ["https://s7d2.scene7.com/is/image/dkscdn/17NIKMFRCSVGSHRKBDLT_Black_Silver_is/"],
        description: "A sport"
    },
    {
        sportType: 'Hockey',
        title: 'Hockey Puck',
        quantity: 9,
        price: 5.00,
        imageUrls: ["https://cdn3.volusion.com/fo6fv.qvja3/v/vspfiles/photos/PUCK-official-100-2.jpg"],
        description: "A sport"

    },
    {
        sportType: 'Baseball',
        title: 'Baseball Bat',
        quantity: 6,
        price: 100.00,
        imageUrls: ["http://cdn.shopify.com/s/files/1/0669/3891/products/Breakaway_Balsa_Baseball_Bat_grande.jpg?v=1460419252"],
        description: "A sport"
    },
    {
        sportType: 'Volleyball',
        title: 'Girls Volleyball Shorts',
        quantity: 15,
        price: 8.00,
        imageUrls: ["http://thumbs3.ebaystatic.com/d/l225/m/m83hlQH7GaIq1lpCSNue-_A.jpg"],
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
  {isCart: true, userId: 1},
  {isCart: true, userId: 2},
]

var Users = [
  {email: 'cody@email.com', password: '123', address: {Description: 'address 1, Chicago'}},
  {email: 'murphy@email.com', password: '123', address: {Description: 'address 2, Chicago'}},
  {email: 'adminuser@email.com', password: 'adminuser', isAdmin: true}
]

// var Categores = ['Football', 'Basketball', 'Baseball', 
// 'Combat Sports', 'Tennis', 'Soccer', 'Hockey', 
// 'Volleyball', 'Snowboarding', 'Swimming'];

var Categories = [
    {name: 'Football'},
    {name: 'Basketball'},
    {name: 'Baseball'},
    {name: 'Combat Sports'},
    {name: 'Tennis'},
    {name: 'Soccer'},
    {name: 'Hockey'},
    {name: 'Volleyball'},
    {name: 'Snowboarding'},
    {name: 'Swimming'},
]

async function seed () {
  await db.sync({force: true});
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  await Category.bulkCreate(Categories);
  
  let newProducts = await Product.bulkCreate(Products, {returning: true});

  for (var i = 0; i < Products.length; i ++) {
    let obj = Products[i];
    let product = await Product.findOne({
        where: {title:obj.title}});
    let category = await Category.findOne({
        where: {name: obj.sportType}});
    product.addCategory(category);
    // category.addProduct(product);
  }

//   Users.forEach(async user => {
//       await User.create(user);
//   })

  await User.create(Users[0])
  await User.create(Users[1])
  await User.create(Users[2])

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
