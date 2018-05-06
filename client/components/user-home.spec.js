/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TestRenderer from 'react-test-renderer'
import { /* Navbar,  */UserHome, User/* , Categories, Habits, Progress */ } from './index'

Enzyme.configure({ adapter: new Adapter() })

describe.only('<UserHome /> Component', function () {

  let UserHomeWrapper

  const createTestProps = () => ({
    username: 'cody the pug',
  })

  const testProps = createTestProps()

  const { username } = testProps

  beforeEach('Create UserHomeWrapper', function () {
    UserHomeWrapper = shallow(<UserHome {...testProps} />)
  })

  /* *** PROPS *** */
  xdescribe('props', function () {

    it('should receive the user\'s username as props', function () {
      expect(UserHomeWrapper.props()).to.have.property('username', username)
    })

  }) // end describe('props')

  /* *** RENDERING *** */
  xdescribe('rendering', function () {

    it('should render itself without exploding', function () {
      console.log('UserHomeWrapper:', UserHomeWrapper)
      // expect(UserHomeWrapper).to.have.length(1)
    })

    it('should render the username in an h3', () => {
      expect(UserHomeWrapper.find('h3').text()).to.be.equal(`Howdy ${username}`)
    })

    it('should render a Navbar component')

    it('should render a User component', function () {
      expect(UserHomeWrapper.find('User')).to.have.length(1)
    })

    it('should render a Categories component')

    it('should render a Habits component')

    it('should render a Progress component')

  }) // end describe('rendering')

}) // end describer('<UserHome />')
