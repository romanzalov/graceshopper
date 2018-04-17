const router = require('express').Router();
const {User, Product, productInstance, Order} = require('../db/models');
const axios = require ('axios');

router.get('/', (req, res, next) => {
    // res.send("test");
    // res.json({});
    Order.findAll({
        where: {},
    }).then((orders) => {
        res.json(orders);
    })
})

module.exports = router;