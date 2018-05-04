'use strict'

import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TestRenderer from 'react-test-renderer'
import User from './index'


Enzyme.configure({ adapter: new Adapter() })

describe.only('<User />', function () {

  let UserWrapper, UserRenderer, UserInstance

  const minProps = {
        avatar: 'doggy img',
        username: 'cousin of cody',
        level: 5,
        HP: 10,
        XP: 10
      }

  const { avatar, username, level, HP, XP } = minProps

  beforeEach('Create UserWrapper', function () {
    UserWrapper = shallow(<User {...minProps} />)

    UserRenderer = TestRenderer.create(<User {...minProps} />)
    UserInstance = UserRenderer.root
  })

  /* *** PROPS *** */
  describe('props', function () {

    it('should receive the user\'s avatar as props', function () {
      expect(UserWrapper.props()).to.have.property('avatar', avatar)
    })

    it('should receive the user\'s username as props', function () {
      expect(UserWrapper.props()).to.have.property('username', username)
    })

    it('should receive the user\'s level as props', function () {
      expect(UserWrapper.props()).to.have.property('level', level)
    })

    it('should receive the user\'s HP as props', function () {
      expect(UserWrapper.props()).to.have.property('HP', HP)
    })

    it('should receive the user\'s XP as props', function () {
      expect(UserWrapper.props()).to.have.property('XP', XP)
    })

  }) // end describe('props')

  describe('rendering', function() {
    it('should render the User component without exploding', function () {
      expect(UserWrapper).to.have.length(1)
    })

    it('should render the user\'s avatar', function () {
      expect(UserInstance.findByProps({ className: 'avatar' }).children).to.deep.equal([String(avatar)])
    })

    it('should display a default avatar image if user has not chosen one via props')

    it('should render the user\'s username', function () {
      expect(UserInstance.findByProps({ className: 'username' }).children).to.deep.equal([String(username)])
    })

    it('should render the user\'s level', function () {
      expect(UserInstance.findByProps({ className: 'level' }).children).to.deep.equal([String(level)])
    })

    it('should render the user\'s XP', function () {
      expect(UserInstance.findByProps({ className: 'XP' }).children).to.deep.equal([String(XP)])
    })

    it('should render the user\'s HP', function () {
      expect(UserInstance.findByProps({ className: 'HP' }).children).to.deep.equal([String(HP)])
    })

  }) // end describe('rendering')

// /* *** INSTANCE METHODS *** */
  describe('instance methods', function () {

    it('should have an instance method called `gainXP`, which takes an integer value and adds it to the user\'s current XP value')

    it('should have an instance method called `loseXP`, which takes an integer value and subtracts it from the user\'s current XP value')

    it('should have an instance method called `levelUp`, which takes a boolean called `XPat100Percent` and increments the user\'s level if true')

    it('should have an instance method called `gainHP`, which takes an integer value and adds it to the user\'s current HP value')

    it('should have an instance method called `loseHP`, which takes an integer value and subtracts it from the user\'s current HP value')

  }) // end describe('instance methods')

}) // end describe(<User /> Component)
