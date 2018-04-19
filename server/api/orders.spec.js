/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {

    beforeEach(() => {
      return Order.create({
        isCart: true,
        status: 'Processing'
      })
    })

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].status).to.be.equal('Processing')
        })
    })
  }) // end describe('/api/orders')

  describe('/api/orders/:id', () => {

    beforeEach(() => {
      return Order.create({
        isCart: true,
        status: 'Processing'
      })
    })

    it('GET /api/orders/:id', () => {
      return request(app)
        .get('/api/orders/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.be.equal('Processing')
        })
    })
  })

  describe('/api/orders/:id', () => {
    beforeEach(() => {
      return Order.create({
        isCart: true,
        status: 'Processing'
      })
    })

    it('PUT /api/orders/:id', () => {
      return request(app)
        .put('/api/orders/1')
        .send({status: 'Completed'})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[1][0].status).to.be.equal('Completed')
        })
    })
  })


}) // end describe('User routes')
