/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', function () {
  beforeEach(function () {
    return db.sync({force: true})
  })
  let cody

  beforeEach(function () {
    return User.create({
      username: 'cody',
      password: 'bones',
      avatar: 'image',
      level: 1,
      XP: 0,
      HP: 10,
      progress: 0
    })
      .then(user => {
        cody = user
      })
  })

  describe('values', function () {
    describe('username', function () {
      it('should be a string', function () {
        expect(cody.username).to.be.a('string')
      })
      it('length should be between 1 and 16', function () { //Also check to see if error is thrown
        // let daisy = User.create({
        //   username: 'fdlakfjdsklfslkfldkflfldflakdflksf'
        // }) //have to call validate on value that fails
        //expect.daisy.to.throw
        expect(cody.username).to.have.length.above(0)
        expect(cody.username).to.have.length.below(17)
      })
      it('should be unique') //Probably something with checking if error is thrown
    })

    describe('password', function () {
      it('should be a string', function () {
        expect(cody.password).to.be.a('string')
      })
      it('length should be between 1 and 16', function () {
        expect(cody.password).to.have.length.above(0)
        expect(cody.password).to.have.length.below(17)
      })
    })


    xdescribe('should have avatar', function () {

    })

    xit('should have level')

    xit('should have XP')

    xit('should have HP')

    xdescribe('should have progress')

  })
}) // end describe('User model')
