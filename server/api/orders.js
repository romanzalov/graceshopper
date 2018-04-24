const router = require('express').Router()
const { Order, productInstance, Product, User } = require('../db/models')
const {confirmedEmail, sendMail, confirmed, shipped, updated, statusUpdate} = require('./sendemail');

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
	Order.findById(req.params.orderId).then(order => {
		order.update({status:req.body.status}).then(order => {
			console.log("order: ", order);
			console.log("updated order: ", order);
			console.log("order new status: ", order.status);
			var mailBody = statusUpdate;
			mailBody.text += " " + order.status;
			sendMail(mailBody);
			// req.body.cart.instances.forEach(instance => {
			//     productString += instance.product.title + ", ";
			// })
			// emailInput.text = JSON.stringify(req.body.information);
			// emailInput.text += "\nProducts: " + productString;
			res.json(order)})				
		})
		.catch(next)
	// Order.update(
	// 	{status: req.body.status},
	// 	{
	// 		where: {id: req.params.orderId}, returning: true
	// 	}
	// )
	// .then(order => {
	// 	console.log("order: ", order);
	// 	console.log("updated order: ", order[1][0]);
	// 	console.log("order new status: ", order[1][0].status);
	// 	// req.body.cart.instances.forEach(instance => {
	// 	//     productString += instance.product.title + ", ";
	// 	// })
	// 	// emailInput.text = JSON.stringify(req.body.information);
	// 	// emailInput.text += "\nProducts: " + productString;
	// 	res.json(order)})
	// .catch(next)
})

//change product quantity on order or delete if 0
router.put('/:orderId/products/:productInstanceId', (req, res, next) => {
	productInstance.findById(req.params.productInstanceId)
	.then(instance => instance.update(req.body))
	.then(instance => {
		instance.quantity === 0 ?
		(instance.destroy()
			.then(() => res.status(204).end())) :
		(res.json(instance))})
	.catch(next)
})

//delete product instance
router.delete('/:orderId/products/:productInstanceId', (req, res, next) => {
	productInstance.findById(req.params.productInstanceId)
	.then(instance => instance.destroy().then(() => {
		res.status(204).end();
	}))
	.catch(next);
})

//needs to be completed
router.post('/:orderId/items', (req, res, next) => {
// router.get('/:orderId/items', (req, res, next) => {
	var orderId = req.params.orderId;
	var productId = req.body.productId;
	productId = 10; //for testing
	Product.findById(productId).then(product => {
		product.createInstance(0, parseInt(req.params.orderId), 1).then(item => {
			res.json(item);
		})
	})
})

//delete order and all product instances on that order, when cancelled by admin
router.delete('/:orderId', (req, res, next) => {
  productInstance.destroy({where: {orderId: req.params.orderId}})
    .then(() => Order.destroy({where: {id: req.params.orderId}}))
    .then(() => res.status(204).end())
    .catch(next)
})


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
