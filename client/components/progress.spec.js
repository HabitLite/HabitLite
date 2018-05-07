'use strict'

import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import Progress from './progress'

const middlewares = []
const mockStore = configureStore(middlewares)

Enzyme.configure({ adapter: new Adapter() })

describe('<Progress />', function () {

  let ProgressWrapper

  const initalState = {
    user: {
      level: 2,
      HP: 10,
      XP: 10
    }
  }

  const { level, XP } = initalState.user

  const store = mockStore(initalState)

  beforeEach('Create ProgressWrapper', function () {
    ProgressWrapper = shallow(<Progress store = {store} />)
  })

  /* *** PROPS *** */
  describe('props', function () {

    it('should receive XP as props from state', function () {
      expect(ProgressWrapper.props()).to.have.property('XP', XP)
    })

    it('should receive the user\'s level as props from state', function () {
      expect(ProgressWrapper.props()).to.have.property('level', level)
    })

  }) // end describe('props')

  describe('rendering', function() {
    it('should render the Progress component without exploding', function () {
      expect(ProgressWrapper).to.have.length(1)
    })

    it('should render a pie chart displaying how close the user is to the next level')

  }) // end describe('rendering')

// /* *** INSTANCE METHODS *** */
  describe('instance methods', function () {

  }) // end describe('instance methods')

}) // end describe(<User /> Component)
