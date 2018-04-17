const router = require('express').Router()

router.use('/users', require('./users'))

router.use('/products', require('./products'));

router.use('/reviews', require('./reviews'));

router.use('/product-instances', require('./productInstances'));

router.use('/orders', require('./orders'));

router.use('/category', require('./category'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router