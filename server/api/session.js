const router = require('express').Router()
const {User, Review, Order, productInstance, Product, Category, ProductCategory} = require('../db/models');

module.exports = router;

router.get('/', (req, res) => {
    res.json(req.session);
});