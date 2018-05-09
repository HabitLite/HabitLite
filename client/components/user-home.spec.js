'use strict'

/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import TestRenderer from 'react-test-renderer'
import Enzyme, { mount, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createStore } from 'redux'
import configureStore from 'redux-mock-store'
import { /* Navbar,  */UserHome, User/* , Categories, Habits, Progress */ } from './index'

const middlewares = []
const mockStore = configureStore(middlewares)

Enzyme.configure({ adapter: new Adapter() })

describe('<UserHome /> Component', function () {

  let UserHomeWrapper,
      UserHomeRenderer,
      UserHomeInstance

  // create test props
  const createTestProps = () => ({
    username: 'cody the pug',
  })

  const testProps = createTestProps()
  const { username } = testProps

  let testStore,
      initialState = {
        user: {
          username: 'cody the pug'
        },
        categories: []
      }

  // beforeEach
  beforeEach('Create testStore and static UserHomeWrapper', function () {
    // testStore = createStore(state => state, initialState)
    testStore = mockStore(initialState)

    // create static wrapper
    UserHomeWrapper = render(<UserHome store={testStore} {...testProps} />)

  })

  describe('itself', function () {

    beforeEach('Create shallow wrapper', function () {
      UserHomeWrapper = shallow(<UserHome store={testStore} {...testProps} />)
    })

    it('should have expected initial state', function () {
      expect(testStore.getState()).to.deep.equal(initialState)
    })

    it('should receive the user\'s username as props', function () {
      expect(UserHomeWrapper.props()).to.have.property('username', username)
    })

    it('should render itself without exploding', function () {
      expect(UserHomeWrapper).to.have.length(1)
    })

  }) // end describe('itself')

  xdescribe('children', function () {

    it('should render the username in an h3', () => {
      expect(UserHomeWrapper.text()).to.equal('Welcome, cody the pug')
    })

    it('should render a Navbar component')

    it('should render a User component', function () {
      console.log('UserHomeWrapper.find(User):', UserHomeWrapper.get(0))
      // expect(UserHomeWrapper.get(0)).to.have.length(1)
    })

    it('should render a Categories component')

    it('should render a Habits component')

    it('should render a Progress component')

  }) // end describe('children')

}) // end describer('<UserHome />')
