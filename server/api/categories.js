const router = require('express').Router();
const {User, Category, Product, productInstance, Order, Review} = require('../db/models');
const axios = require ('axios');

module.exports = router;

router.get('/', (req, res, next) => {
    Category.findAll({
        where: {},
        include: [
            {model: Product, as: 'products'}
        ],
    }).then((categories) => {
        res.json(categories);
    })
})

router.post('/', (req, res, next) => {
    Category.create(req.body).then(
        (category) => {
        res.json(category);
    })    
})
// Get category by ID
router.get('/:id', (req, res, next) => {
    Category.findOne({
        where: {
            id:req.params.id,
        },
        include: [
            {model: Product, as: 'products'}
        ],
    }).then((category) => {
        res.json(category);
    })
})
// See products in a category
router.get('/:id/products', (req, res, next) => {
    Category.findOne({
        where: {
            id:req.params.id,
        },
        include: [
            {model: Product, as: 'products'}
        ],
    }).then((category) => {
        res.json(category.products);
    })
})

// Add product to a specific category
router.post('/:id', (req, res, next) => {
    Product.create(req.body).then(product => {
        product.categoryId = req.params.id;
        product.save().then(() => {
            res.json(product);
        })
    })
})

router.put("/:id", (req, res, next) => {
    Category.findById(req.params.id).then(category => {
        category.update(req.body).then((category) => {
            res.json(category);
        })
    })
})
// Delete a product from a category
router.delete("/:id", (req, res, next) => {
    Category.findById(req.params.id).then(category => {
        category.destroy().then(() => {
            res.json(204);
        })
    })
})
