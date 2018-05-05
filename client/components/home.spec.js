'use strict'

import React from 'react'
import { expect } from 'chai'
import Enzyme, { mount, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TestRenderer from 'react-test-renderer'
import { Home, /* Navbar,  */User, /* Categories,  */ Habits/* , ProgressTracker */ } from './index'

Enzyme.configure({ adapter: new Adapter() })

describe('<Home /> Component', function () {

  describe('rendering', function () {

    let HomeWrapper

    const User = 'User',
          Categories = 'Categories',
          Habits = 'Habits',
          ProgressTracker = 'ProgressTracker'

    beforeEach('Create a HomeWrapper', function () {
      HomeWrapper = shallow(<Home />)
    })

    it('should render itself without exploding', function () {
      expect(HomeWrapper).to.have.length(1)
    })

    it('should render a Navbar component')

    it('should render a User component', function () {
      expect(HomeWrapper.find(User)).to.have.length(1)
    })

    it('should render a Categories component')

    it('should render a Habits component')

    it('should render a Progress Tracker component')
  })
})
