'use strict'

import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { User } from './user'


Enzyme.configure({ adapter: new Adapter() })

describe('<User /> Component', function () {
  let user

  beforeEach('Create component', function () {
    user = shallow(<User />)
    console.log('user inside beforeEach:', user);
  })

  /* *** STATE *** */
  it('should display the user\'s avatar image', function () {
    console.log(user);
    // expect(user.state().avatar).to.be.a('string')
  })

  it('should display a default avatar image if user has not chosen one')

  it('should display the user\'s username')

  it('should display the user\'s level')

  it('should display the user\'s HP')

  it('should display the user\'s XP')

  /* *** INSTANCE METHODS *** */
  it('should have a method called `gainXP`, which takes an integer value and adds it to the user\'s current XP value')

  it('should have a method called `loseXP`, which takes an integer value and subtracts it from the user\'s current XP value')

  it('should have a method called `levelUp`, which takes a boolean called `XPat100Percent` and increments the user\'s level if true')

  it('should have a method called `gainHP`, which takes an integer value and adds it to the user\'s current HP value')

  it('should have a method called `loseHP`, which takes an integer value and subtracts it from the user\'s current HP value')

}) // end <User />
