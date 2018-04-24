const router = require('express').Router()
const {User, Order} = require('../db/models/index')
module.exports = router

router.post('/login', async (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        console.log("LOGIN LINE 13: ", req.session);
        if ('cart' in req.session && Object.keys(req.session.cart).length > 0) {
          console.log('cart in req.session');
          Order.findById(req.session.cart.id).then(thisCart => {
            thisCart.setUser(user.id);
            console.log("LINE 18: ", thisCart);
            thisCart.save().then(() => {
              console.log("LINE 19: ", thisCart);
              req.session.cart = thisCart; //"update cart"
              req.login(user, err => (err ? next(err) : res.json(user)))
            });
          });
        }
        else {
          console.log("NO CART...")
          user.findCart().then(cart => {
            console.log("cart...", cart);
            if (cart) {
              req.session.cart = cart;
            }
            req.login(user, err => (err ? next(err) : res.json(user)))            
          })
        }
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  console.log("req.body signup: ", req.body);
  User.create(req.body) 
    .then(user => {
      user.isAdmin = true; //For testing purposes only
      user.save().then(user => {
        console.log("ran")
        req.login(user, err => (err ? next(err) : res.json(user)))
      })            
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
