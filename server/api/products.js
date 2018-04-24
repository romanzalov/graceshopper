const router = require('express').Router();
const {Category, User, Product, productInstance, Order, Review} = require('../db/models');
const axios = require ('axios');
const {isAdmin, isUser, SelforAdmin} = require('./security');

router.get('/search/:term', (req, res, next) => {
    Product.findByName(req.params.term).then(foundProducts => {
        res.json(foundProducts);
    })
})

router.get('/', (req, res, next) => {
    // res.json({});
    Product.findAll({
        where: {},
        include: [
            {model: productInstance, as:'instances', required:false},
            {model: Category, as: 'categories', required: false},
            {model: Review, as: 'reviews', required: false},
        ],
    }).then((products) => {
        res.json(products);
    })
})

router.post('/', isAdmin, (req, res, next) => {
    Product
    .create(req.body)
    .then((product) => {
        if (req.body.categories && req.body.categories.length > 0) {
            req.body.categories.forEach(async categoryId => {
                var addCategory = await Category.findById(categoryId);
                addCategory.addProduct(product);
                await addCategory.save();
            })                
        }
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

router.post('/instances', isUser, (req, res, next) => {
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

router.put('/instances/:id', isUser, (req, res, next) => {
    productInstance.findById(req.params.id)
    .then(instance => {
        instance.update(req.body)
        .then(instance => {
            res.json(instance);
        });
    })
})

router.delete("/instances/:id", isUser, (req, res, next) => {
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
            {model: Category, as: 'categories', required: false},
            {model: productInstance, as:'instances', required:false},
        ],
    });
    res.json(product);
    return;
})

router.put('/:id', isAdmin, async (req, res, next) => {
    var product = await Product.findOne({
            where: {id:req.params.id},
            include: [
                {model: Category, as: 'categories', required: false},
            ]
        },
    );
    await product.update(req.body);
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
    await product.save();
    res.json(product);
    return;
})

router.delete("/:id", isAdmin, async (req, res) => {
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

router.post('/:id/instances', isUser, (req, res, next) => { //Should Work (Add to cart here)
    productInstance.create({
        productId:req.params.id,
        orderId: req.body.orderId,
    }).then((product) => {
        res.json(product);
    })
});



//Review routes
router.get('/:productId/reviews', (req, res, next)=>{
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
