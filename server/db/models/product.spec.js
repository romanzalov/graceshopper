'use strict';

var Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai)

var Article = require('../models/article');
var User = require('../models/user');
var db = require('../models/database');


describe('The `Article` model', function () {

    /**
     * First we clear the database and recreate the tables before beginning a run
     */
    before(function () {
      return db.sync({force: true});
    });
  
    /**
     * Next, we create an (un-saved!) article instance before every spec
     */
  
    var article;
    beforeEach(function(){
      article = Article.build({
        SportType: 'Football',
        title: "Sports Equipment",
        quantity: 100,
        price: 50.50,
        imageUrls: ['https://picsum.photos/700/400'],
        availability: true,
        description: "E-commerce Sports Equipment Company"

      });
    });
  
    /**
     * Also, we empty the tables after each spec
     */
    afterEach(function () {
      return Promise.all([
        Article.truncate({ cascade: true }),
        User.truncate({ cascade: true })
      ]);
    });
  
    describe('attributes definition', function(){
  
      /**
       * Your model should have 7 total fields
       */
      it('includes `sportType`,`title`,`quantity`, `price`, `imageUrls`, `availability`, `description`', function () {
  
        return article.save()
        .then(function (savedArticle) {
          expect(savedArticle.SportType).to.equal("Football");
          expect(savedArticle.title).to.equal("Sports Equipment");
          expect(savedArticle.quantity).to.equal(100);
          expect(savedArticle.price).to.equal(50.50);
          expect(savedArticle.imageUrls).to.equal(['https://picsum.photos/700/400']);
          expect(savedArticle.availability).to.equal(true);
          expect(savedArticle.description).to.equal("E-commerce Sports Equipment Company");

        });
  
      });
  
      it('requires `content`', function () {
  
        article.title = null;
  
        return article.validate()
        .then(function () {
          throw new Error('validation should fail when content is null');
        },
        function(result) {
          expect(result).to.be.an.instanceOf(Error);
        });
  
      });
  
      it('requires `title` (in a more strict way than for `content`)', function () {
  
        article.SportType = '';
  
        return article.validate()
        .then(function () {
          throw new Error('validation should fail when content is empty');
        },
        function (result) {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('Validation error');
        });
  
      });