const router = require('express').Router()
const {User, Order, Review, productInstance} = require('../db/models')
const {isAdmin, isUser, isSelforAdmin} = require('./security');
module.exports = router


router.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'isAdmin', 'address', 'addressList'],
    include: [
      {model: Order, as: 'orders', nested: true},
    ]
  })
  .then(users => res.json(users))
  .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => {
      res.json(user)
  })
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findOne({where:{
    id: req.params.id,
   },
    include: [
      {model: Order, nested: true},
    ]
  }).then(user => res.json(user)).catch(next);
 })

 router.put('/:id',  isAdmin, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.update(req.body)
    })
    .then(updatedUser => {
      res.json(updatedUser)
    })
    .catch(next)
 })

//delete a user and all orders belonging to that user, used by admin

router.delete('/:userId', isAdmin, (req, res, next) => {
  Order.findAll({where: {userId: req.params.userId}})
    .then(orders => orders.forEach(order => {
      productInstance.destroy({where: {orderId: order.id}})
    }))
    .then(() => Order.destroy({where: {userId: req.params.userId}}))
    .then(() => User.destroy({where: {id: req.params.userId}}))
    .then(() => res.status(204).end())
    .catch(next)
})

//Order routes
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
router.delete('/:userId/orders/:orderId',isAdmin, (req, res, next) => {
  Order.destroy({
      where: {
          id: req.params.orderId,
      }
  })
  .then(order => res.json(order))
  .catch(next)
})
//update an order on an user
router.put('/:userId/orders/:orderId', isAdmin, (req, res, next) => {
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
router.post('/:userId/orders', isAdmin, isUser, (req, res, next) => {
  Order.create(req.body)
  .then(() => res.sendStatus(201))
  .catch(next)
})

//review routes
router.get('/:userId/reviews', (req,res,next)=>{
 Review.findAll({
   where: {
     userId: req.params.userId
   }
 })
 .then((reviews) => {
  res.json(reviews)
 })
})
