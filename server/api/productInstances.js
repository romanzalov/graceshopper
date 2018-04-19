const router = require('express').Router();
const {User, Product, productInstance, Order} = require('../db/models');
const axios = require ('axios');

//Finding all productInstances and attaching models Product and Order on response
router.get('/', (req, res, next) => {
    productInstance.findAll({
        where:{},
        include: [
            {model: Product, required:false},
            {model: Order, required:false}
        ],
    }).then((instances) => {
        res.json(instances);
    })
})

// create an instance of a product
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId).then(product => {
        product.createInstance(0, req.body.orderId).then(instance => {
            res.json(instance);
            return;
        })
    })
    // productInstance.create({
    //     productId:req.body.productId
    // }).then((instance) => {
    //     res.json(instance);
    // })
});

// find a product instance by ID
router.get('/:id', (req, res, next) => {
    productInstance.findOne({
        where:{
            id:req.params.id,
        },
        include: [
            {model: Product, required:false}
        ],
    }).then((instances) => {
        res.json(instances);
    })
})

//update a product instance by ID
router.put('/:id', (req, res, next) => {
    productInstance.findById(req.params.id)
    .then((instance) => {
        instance.update(req.body)
        .then(() => {
            res.json(instance);
        })
    })
})

//delete product instance by ID
router.delete("/:id", (req, res) => {
    productInstance.findById(req.params.id)
    .then((instance) => {
        return instance.destroy()
    }).then(() => {
        res.json(204);
    })
})

// //How will product instances be added to orders?
//     // 'user/:id/cart/add' -> product.id -> create a new product instance, add it to the user's cart
//         // set instance.orderId to the user's "order"
// router.get('/:id/add-to-cart', async (req, res, next) => {
//     var _Instance = await productInstance.findById(req.params.id);
//     _Instance.orderId = req.body.orderId;
//     _Instance.save().then(instance => {
//         res.json(instance);
//     })
// })

module.exports = router;