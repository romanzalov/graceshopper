const router = require('express').Router()
const { Order, productInstance, Product, User } = require('../db/models')

module.exports = router

//get all orders
router.get('/', (req, res, next) => {
	Order.findAll({
		include: [User, {
		model: productInstance,
		as: 'instances',
		include: [{model: Product}]
		}]
	})
	.then(orders => {
		orders.sort(function(a, b) {
		  return a.id - b.id;
		});		
		res.json(orders);
	})
	.catch(next)
})

//get all orders by status

router.get('/status/:status', (req, res, next) => {
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

// router.post('/:orderId/items', (req, res, next) => {
router.get('/:orderId/items', (req, res, next) => {
	var orderId = req.params.orderId;
	var productId = req.body.productId;
	productId = 10; //for testing
	Product.findById(productId).then(product => {
		product.createInstance(0, parseInt(req.params.orderId), 1).then(item => {
			res.json(item);
		})
	})
})


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
