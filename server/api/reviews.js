const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router;

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
})

router.put('/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
    .then(review => review.update(req.body))
    .then(review => res.json(review))
    .catch(next)
})

router.delete('/:reviewId', (req, res, next) => {
  Review.destroy({where: {id: req.params.reviewId}})
    .then(() => res.status(204).end())
    .catch(next)
})
