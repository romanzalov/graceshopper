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


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

>>>>>>> master
