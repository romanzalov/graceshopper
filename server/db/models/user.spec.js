/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const {  User,
  Product,
  Review,
  Order,
  productInstance,
  Category,
  ProductCategory
} = require ('./index');


describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')


describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('createInstance', () => {
      let testProduct
      beforeEach(() => {
        return Product.create({
          sportType: 'Test',
          title: "testTitle",
          quantity: 1,
        })
          .then(product => {
            testProduct = product;
          })
      })

      it('creates a productInstance related to the product', async () => {
        var newInstance = await testProduct.createInstance(0);
        expect(newInstance.price).to.be.equal(testProduct.price)
      })

    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
