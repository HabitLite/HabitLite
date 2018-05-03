/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

xdescribe('User routes', function () {

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', function () {
    const codysUsername = 'codylovesdogs'

    beforeEach(() => {
      return User.create({
        username: codysUsername
      })
    })

    describe('GET /api/users', function () {

      it('sends a res.body of all users in database', function () {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].username).to.be.equal(codysUsername)
          })
      })

      it('does not include users\' passwords in res.body', function () {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].password).to.be.equal(undefined)
          })
      })

    }) // end describe ('GET /api/users')

  }) // end describe('/api/users')

  describe('/api/users/:userId', function () {

    beforeEach(() => {
      return User.bulkCreate([{
        username: 'codylovesdoggos'
      }, {
        username: 'puppylover369'
      }, {
        username: 'daisylover246'
      }, {
        username: 'doggidydog'
      }])
    })

    describe('GET /api/users/:userId', function () {
      it('sends a res.body of specific user in database', function () {
        return request(app)
          .get('/api/users/4')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.username).to.be.equal('doggidydog')
          })
      })
      it('does not include user\'s password in res.body', function () {
        return request(app)
          .get('/api/users/1')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.password).to.be.equal(undefined)
          })
      })
    }) // end describe('GET /api/users/:userId')
  }) // end describe('/api/users/:userId')
}) // end describe('User routes')

//Specific user
//Post a user
//Update a user
//Remove a user
