/* eslint-disable */
const router = require('express').Router()
const {User, Review, Order, productInstance, Product, Category, ProductCategory} = require('../db/models');
const axios = require('axios'); 

module.exports = router;

router.post('/test', (req, res) => {
    console.log("test post route hit");
    res.json({test: "test"});
})

router.get('/cart', (req, res) => {
    if ('cart' in req.session && Object.keys(req.session.cart).length > 0) {
        Order.findById(req.session.cart.id).then(cart => {
            res.json(cart);
        })
    }
    else {
        res.json({})
    }
})
//ADD TO CART
router.post('/cart', async (req, res) => {
    console.log("line 13");
    var productId = parseInt(req.body.productId);
    console.log("line 15 req.body.productId: ", req.body.productId);
    console.log("line 16 req.body: ", req.body, productId); 
    var relatedProduct = await Product.findById(productId);
    console.log("line 17");
    req.session.test = "post edit";
    var hasCart = !(!('cart' in req.session) || req.session.cart == {} 
    || !(req.session.cart) || Object.keys(req.session.cart).length == 0);
    var hasUser = (('passport' in req.session) && ('user' in req.session.passport));
    console.log(req.session);
    if (hasCart) {
        console.log("has existing cart");
        var orderId = parseInt(req.session.cart.id);
        if (hasUser) {
            console.log("hasUser");
            var userId = parseInt(req.session.passport.user);
            let thisCart = await Order.findById(orderId);
            if (parseInt(thisCart.userId) != userId) {
                thisCart.userId = userId;
                thisCart.setUser(userId);
                await thisCart.save();
            }
        }
        let newItem = await relatedProduct.createInstance(0, parseInt(orderId), 1);
        let updatedCart = await Order.findById(orderId);
        req.session.cart = updatedCart;
        res.json(updatedCart);
    }
    else {
        console.log("no existing cart");
        let newCart = await Order.create({}); 
        var orderId = newCart.id;
        let newItem = await relatedProduct.createInstance(0, parseInt(orderId), 1);
        if (hasUser) {
            newCart.userId = parseInt(req.session.passport.user);
            await newCart.save();            
        }         
        await newCart.save();
        req.session.cart = newCart;           
        res.json(newCart);
    }
})

router.post('/checkout', async(req, res) => {
    // let thisSession = await axios.get('/api/session');
    let thisCart = await Order.findById(req.body.cartId);
    thisCart.isCart = false;
    thisCart.status = "Completed";
    thisCart.information = req.body.information;
    await thisCart.save();
    req.session.cart = {};
    req.session.lastCart = thisCart;
    res.json(thisCart);
})

//UPDATE SESSION (CART) ON...
    //user login
    //user logout
    //order completion

// router.put('/update-cart', (req, res) => {
router.get('/set-cart/:id', (req, res) => { //IF CART EXISTS -> GET FROM CART ID
    // res.send(req.params.id);
        Order.findOne({
        where: {
            // id:req.body.id,
            id:req.params.id,
        },
		include: [User, {
            model: productInstance,
            as: 'instances',
            include: [{model: Product}]
        }],
    }).then(order => {
        req.session.cart = order;
        res.json(order);
    })    
})

router.get('/update-cart', (req, res) => {
    if (('passport' in req.session) && ('user' in req.session.passport)) {
        User.findById(parseInt(req.session.passport.user)).then(user => {
            req.session.user = user;
            res.send("user found");
        })
    }
    else {
        res.send("no user");        
    }
})

// Cases:
    //No user, no existing session cart
    //No user, existing session cart
    //User, no existing session cart -> use user's default cart
        //Create if they don't have one
    //User, existing session cart -> replace user's cart
        //If their cart already has items? Combine?
    //Also:
        //Delete cart if it's empty
//Hit routes on:
    //Add to cart
    //Login (?) -> replace user cart with session cart (if there is one)
    //Logout (reset)

    //First visit (?) -> maybe not needed

//"Get info" route -> use to get # of cart items
router.get('/get-info', async(req, res) => {
    if (!('cart' in req.session) || req.session.cart == {} 
    || !(req.session.cart) || Object.keys(req.session.cart).length == 0) {
        req.session.hasCart = false;
    }
    else {
        req.session.hasCart = true;        
    }
    if (('passport' in req.session) && ('user' in req.session.passport)) {
        req.session.hasUser = true;
    } 
    else {
        req.session.hasUser = false;
    }
    res.json(req.session);
})

// function hasKey() {

// }

//Initialize/update -> get the number of items in "cart" (0 if it doesn't exist)
router.get('/initialize', async(req, res) => {
    // No cart in session case
    if (!('cart' in req.session) || req.session.cart == {} 
    || !(req.session.cart) || Object.keys(req.session.cart).length == 0) { 
        req.session.numcartItems = 0; //Later make this a property of orders
        req.session.hasCart = false;
        //Logged-in user has cart case 
        if (('passport' in req.session) && ('user' in req.session.passport)) {
            // var userId = parseInt(req.session.passport.user);
            var userId = 2;
            req.session.hasUser = true;
            Order.findOne({where: {userId:userId, isCart:true }})
            .then(order => {
                if (order) {
                    req.session.cart = order;
                    res.json(req.session);
                    return
                }
            })
        }                     
    }  
    // Has cart in session case
    else { //Prioritize this over user's existing cart
        req.session.hasCart = true;
        if (('passport' in req.session) && ('user' in req.session.passport)) {
            var userId = parseInt(req.session.passport.user);
            // var userId = 2;
            var existingCarts = await Order.findAll({where:{userId:userId, isCart:true}});
            existingCarts.forEach(cart => {
                cart.isCart = false;
                cart.save();
            })
            var thisCart = await Order.findById(req.session.cart.id);
            thisCart.isCart = true;
            thisCart.setUser(userId);
            thisCart.save();
            console.log("found thisCart", thisCart);
            req.session.cart = thisCart;
        } 
        req.session.numcartItems = req.session.cart.instances.length;        
    }
    res.json(req.session);
    return
})

//Assume successful login
router.get('/login', async(req, res) => {
    if (!('cart' in req.session) || Object.keys(req.session.cart).length == 0) {
        Order.findOne({where: {userId:req.session.passport.user, isCart:true }})
        .then(order => {
            if (order) {
                req.session.cart = order;
                res.json(req.session);
                return
            }
            else {
                res.json(req.session)
            }
        })    
    } 
    else { //Set all user orders to isCart = false and assign req.session.cart to user's cart
        var userId = parseInt(req.session.passport.user);
        var existingCarts = await Order.findAll({where:{userId:userId, isCart:true}});
        existingCarts.forEach(cart => {
            cart.isCart = false;
            cart.save();
        })
        var thisCart = Order.findById(parseInt(req.session.cart.id)).then(cart => {
            cart.isCart = true;
            cart.setUser(userId);
            cart.save().then(() => {
                res.json(req.session);
            });
        })
    }
    res.json(req.session);     
})

//Add to cart
router.get('/add-product', async (req, res) => { //On add product
// router.post('/add-product', async (req, res) => { //On add product
    if (!('cart' in req.session) || req.session.cart == {} 
    || !(req.session.cart) || Object.keys(req.session.cart).length == 0) {
        var newCart = await Order.create({}); //use req.body to add product later
        if (('passport' in req.session) && ('user' in req.session.passport)) {
            newCart.setUser(parseInt(req.session.passport.user));
            req.session.hasUser = true;
        } 
        else {
            req.session.hasUser = false;
        }
        req.session.cart = newCart;
        req.session.newCart = true;
        // req.session.nItems = newCart.numItems;
        await req.session.save();
        res.json(req.session);
    }
    else {
        if (('passport' in req.session) && ('user' in req.session.passport)) {
            req.session.hasUser = true;
        } 
        else {
            req.session.hasUser = false;
        }
        Order.findById(req.session.cart.id).then(cart => {
            // order.addProductInstance
            console.log("adding to cart: ", req.session.cart);
            req.session.cart = cart;
            req.session.newCart = false;
            res.json(req.session);
        })
    }
})

//Complete purchase -> delete req.session.cart -> move to "past history"
router.get('/complete-purchase', async (req, res) => {
    var thisCart = await Order.findById(req.session.cart.id);
    thisCart.isCart = false;
    thisCart.status = 'Completed';
    await thisCart.save();
    req.session.cart = {};
    await req.session.save();
    if (!req.session.purchaseHistory) {
        req.session.purchaseHistory = [thisCart];
    }
    else {
        req.session.purchaseHistory.push(thisCart);
    }
    res.json(req.session);
})

// Write later:
    //User get purchase history
    //User get current cart
    //

// router.post('/add-cart', (req, res) => {
router.get('/add-cart/:id', (req, res) => { //IF CART DOESN'T ALREADY EXIST AND USER LOGGED IN 
        Order.create({
            // userId:req.params.id,
        })
        .then(order => {
            order.setUser(parseInt(req.params.id));
            // order.userId = req.params.id;
            // order.save().then(() => {
            //     req.session.cart = order;
            //     res.json(order);
            // })
            req.session.cart = order;
            res.json(order);        
        })            
})

// router.delete('/', (req, res) => {
router.get('/reset', (req, res) => {
    req.session.destroy();
    res.send("Destroyed");
    // res.send(204);
})

router.get('/reset-cart', (req, res) => {
    req.session.cart = {};
    res.send("Reset cart");
    // res.send(204);
})

router.get('/', (req, res) => {
    res.json(req.session);
});
