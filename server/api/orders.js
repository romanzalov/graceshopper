const router = require('express').Router()
const { Order, productInstance } = require('../db/models')

module.exports = router

//get all orders
router.get('/', (req, res, next) => {
	Order.findAll()
	.then(order => res.json(order))
	.catch(next)
})

//get all orders by status

router.get('/:status', (req, res, next) => {
	Order.findAll({
		where: {
			status: req.params.status
		}
	})
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

//change product quantity on order or delete if 0
router.put('/:orderId/products/:productInstanceId', (req, res, next) => {
	productInstance.findById(req.params.productInstanceId)
	.then(product => product.update(req.body))
	.then(product => {
		product.quantity === 0 ?
		(product.destroy()
			.then(() => res.status(204).end())) :
		(res.json(product))})
	.catch(next)
})


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
