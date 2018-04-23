const router = require('express').Router();
const {Category, User, Product, productInstance, Order, Review} = require('../db/models');
const axios = require ('axios');

router.get('/', (req, res, next) => {
    // res.json({});
    Product.findAll({
        where: {},
        include: [
            {model: productInstance, as:'instances', required:false},
            {model: Category, as: 'categories', required: false},
        ],
    }).then((products) => {
        res.json(products);
    })
})

router.post('/', (req, res, next) => {
    Product
    .create(req.body)
    .then((product) => {
        res.json(product);
    })
})

router.get('/instances', (req, res, next) => {
    productInstance.findAll({
        where:{},
        include: [
            {model: Product, as:'parent', required:false},
            {model: Order, required:false}
        ],
    }).then((instances) => {
        res.json(instances);
    })
})

router.post('/instances', (req, res, next) => {
    productInstance.create(req.body).then((instance) => res.json(instance));
})

router.get('/instances/:id', (req, res, next) => {
    productInstance.findOne({
        where:{
            id:req.params.id,
        },
        include: [
            {model: Product, as:'parent', required:false}
        ],
    }).then((instances) => {
        res.json(instances);
    })
})

router.put('/instances/:id', (req, res, next) => {
    productInstance.findById(req.params.id)
    .then(instance => {
        instance.update(req.body)
        .then(instance => {
            res.json(instance);
        });
    })
})

router.delete("/instances/:id", (req, res, next) => {
    productInstance.findById(req.params.id)
    .then((instance) => {
        return instance.destroy()
    }).then(() => {
        res.json(204);
    })
})

router.get('/:id', async (req, res, next) => {
    var product = await Product.findOne({
        where: {
            id:req.params.id,
        },
        include: [
            {model: productInstance, as:'instances', required:false},
            {model: Category, as: 'categories', required: false},
        ],
    });
    res.json(product);
    return;
})

router.put('/:id', async (req, res, next) => {
    var product = await Product.findById(req.params.id);
    console.log("req.body 89: ", req.body);
    if (req.body.categories && req.body.categories.length > 0) {
        req.body.categories.forEach(async categoryId => {
            var addCategory = await Category.findById(categoryId);
            addCategory.addProduct(product);
            await addCategory.save();
        })
    }
    if (req.body.removecategories && req.body.removecategories.length > 0) {
        req.body.removecategories.forEach(async categoryId => {
            var removeCategory = await Category.findById(categoryId);
            removeCategory.removeProduct(product);
            await removeCategory.save();
        })
    }
    await product.update(req.body);
    res.json(product);
    return;
})

router.delete("/:id", async (req, res) => {
    var product = await Product.findById(req.params.id);
    await product.destroy();
    res.json(204);
    return;
})

router.get('/:id/instances', (req, res) => {
    Product.findOne({
        where: {
            id:req.params.id,
        },
        include: [
            {model: productInstance, as:'instances', required:false}
        ],
    }).then((product) => {
        res.json(product.instances);
    })
})

router.post('/:id/instances', (req, res, next) => { //Should Work (Add to cart here)
    productInstance.create({
        productId:req.params.id,
        orderId: req.body.orderId,
    }).then((product) => {
        res.json(product);
    })
});

//How will product instances be added to orders?
// 'user/:id/cart/add' -> product.id -> create a new product instance, add it to the user's cart
// set instance.orderId to the user's "order"
router.get('/:id/add-to-cart', async (req, res, next) => {
    var _Product = await Product.findOne({
        where:{
            id:req.params.id,
        },
    });
    var _Instance = await _Product.createInstance(0, req.body.orderId);
    res.json(_Instance);
})

///:id
// /user/:id/cart


//Review routes
router.get('/:productId/reviews', (req,res,next)=>{
   Review.findAll({
        where: {
           productId: req.params.productId
        }
    })
   .then((reviews) => {
      res.json(reviews)
  })
})


module.exports = router;
