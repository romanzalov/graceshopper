const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email'],
    include: [
      {model: Order, as:'orders', required:false},
      // {model: Order, as:'purchaseHistory', required:false},      
    ]
  })
  .then(users => res.json(users))
  .catch(next)
})

router.post('/create-user', async (req, res, next) => {
//  try {
//    let user = await User.create(
//      {
//         email:"test@email.com",
//      });
//    res.json(user);
//  } catch (error) {next(error)}
 User.create(req.body)
 .then(user => {Order.create({userId: user.id})})
 .then(res.json(user))
 .catch(next)
})

// router.post('/:id/purchase-history', async (req, res, next) => {
router.get('/:id/purchase-history/add', async (req, res, next) => {
    try {
    let user = await User.findOne({where:{
      id:req.params.id,
     },
      include: [
        {model: Order, as:'cart', required:false},
        {model: Order, as:'purchaseHistory', required:false},      
      ]
    });
    await user.completePurchase();
    res.json(user);
  } catch (error) {next(error)}
  //   let cart = await Order.findById(user.cart.id);
  //   cart.cartuserId = null;
  //   cart.userId = user.id;
  //   await cart.save();
  //   await user.save();
  //   res.json(user);
})

router.get('/:id', (req, res, next) => {
  User.findOne({where:{
    id:req.params.id,
   },
    include: [
      {model: Order, as:'cart', required:false},
      {model: Order, as:'purchaseHistory', required:false},      
    ]
  }).then(user => res.json(user)).catch(next); 
 })

 router.get('/:id/cart', (req, res, next) => {
  User.findOne({where:{
    id:req.params.id,
   },
    include: [
      {model: Order, as:'cart', required:false},
      {model: Order, as:'purchaseHistory', required:false},      
    ]
  }).then(user => res.json(user.cart)).catch(next);
 })

 
 
 router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.json(user))
    .catch(next)
 })
 
 router.put('/:id/cart', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.json(user))
    .catch(next)
 })


 //ADD TO USERS ROUTES
//get all orders on specific user
router.get('/:userId/orders', (req, res, next) => {
  Order.findAll({
      where: {
          userId: req.params.userId,
      }
  })
  .then(orders => res.json(orders))
  .catch(next)
})
//get one order on specific user
router.get('/:userId/orders/:orderId', (req, res, next) => {
  Order.findOne({
      where: {
          userId: req.params.userId,
          id: req.params.orderId
      }
  })
  .then(orders => res.json(orders))
  .catch(next)
})
//delete an order on an user
router.delete('/:userId/orders/:orderId', (req, res, next) => {
  Order.destroy({
      where: {
          id: req.params.orderId,
      }
  })
  .then(order => res.json(order))
  .catch(next)
})
//update an order on an user
router.put('/:userId/orders/:orderId', (req, res, next) => {
  Order.update(req.body, {
      where: {
          id: req.params.orderId,
          userId: req.params.userId
      }
  })
  .then(order => res.json(order))
  .catch(next)
})
//create an order on an user
router.post('/:userId/orders', (req, res, next) => {
  Order.create(req.body)
  .then(() => res.sendStatus(201))
  .catch(next)
})