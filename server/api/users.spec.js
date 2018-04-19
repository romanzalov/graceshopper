/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const supertest = require('supertest')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    it('POST /api/users', () => {
      return request(app)
        .post('/api/users')
        .send({email: 'test@email.com'})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.be.equal('test@email.com')
        })
    })

    it('PUT /api/users/:id', () => {
      return request(app)
        .put('/api/users/1')
        .send({email: 'newtest@newemail.com'})
        .expect(200)
        .then(res => {
          return User.findById(1);
        })
        .then(user => {
          expect(user).to.be.an('object')
          expect(user.email).to.be.equal('newtest@newemail.com')
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
