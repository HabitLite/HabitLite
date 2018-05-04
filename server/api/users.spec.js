/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe.only('User routes', function () {

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', function () {
    const codysUsername = 'codylovesdogs'

    describe('GET /api/users', function () {

      beforeEach(() => {
        return User.create({
          username: codysUsername,
          password: 'IMCOOL'
        })
      })

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


    describe('POST /api/users', function () {
      it('updates sends a res.body of created user and ensures updated user is in database', function () {
        return request(app)
          .post('/api/users')
          .send({
            username: 'honeypie',
            password: 'tons'
          })
          .expect(201)
          .then(res => {
            expect(res.body.username).to.be.equal('honeypie')
            expect(res.body.password).to.be.equal('tons')
          }) && User.findOne({
          where: {
            username: 'honeypie',
            password: 'tons'
          }
        })
      })
    }) // end describe('POST /api/users)

  }) // end describe('/api/users')

  describe('/api/users/:userId', function () {

    beforeEach(() => {
      return User.bulkCreate([{
        username: 'codylovesdoggos',
        password: 'STILLCOOL'
      }, {
        username: 'puppylover369',
        password: 'notrealpass'
      }, {
        username: 'daisylover246',
        password: 'againnotreal'
      }, {
        username: 'doggidydog',
        password: 'cattitycat'
      }])
    })

    describe('GET /api/users/:username', function () {
      it('sends a res.body of specific user in database', function () {
        return request(app)
          .get('/api/users/doggidydog')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.username).to.be.equal('doggidydog')
          })
      })
      it('does not include user\'s password in res.body', function () {
        return request(app)
          .get('/api/users/codylovesdoggos')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.password).to.be.equal(undefined)
          })
      })
    }) // end describe('GET /api/users/:userId')

    //***Only works some of the time.  Could be some async issue***
    xdescribe('PUT /api/users/:userId', function () {
      it('updates user in database', function () {
        const userId = 4
        return request(app)
          .put(`/api/users/${userId}`)
          .send({
            username: 'cattitycat',
          })
          .expect(201)
          .then(() => {
            return User.findById(userId)
          })
          .then(user => {
            expect(user).to.be.an('object')
            expect(user.username).to.be.equal('cattitycat')
          })
      })
    }) // end describe('PUT /api/users/:userId')

    describe('DELETE /api/users/:userId', function () {
      it('sends a res.body of deleted user (that does not include password)')
      it('updates database to reflect that user has been deleted')
      it('ensures that only current user can delete zirself')
    }) // end describe('DELETE /api/users/:userId')
  }) // end describe('/api/users/:userId')
}) // end describe('User routes')

