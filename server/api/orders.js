const router = require('express').Router()
const { Order } = require('../db/models')

module.exports = router

//get all orders
router.get('/', (req, res, next) => {
	Order.findAll()
	.then(order => res.json(order))
	.catch(next)
})

//get an order
router.get('/:orderId', (req, res, next) => {
	Order.findById(req.params.orderId)
	.then(order => res.json(order))
	.catch(next)
})

//change order status, used by admin
router.put('/:orderId', (req, res, next) => {
	Order.update({status: req.body.status}, {
		where: {
			id: req.params.orderId,
		}
	})
	.then(order => res.json(order))
	.catch(next)
})

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


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

