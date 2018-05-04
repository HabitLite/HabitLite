'use strict'

/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AddCustomHabit } from './index'

const adapter = new Adapter()
Enzyme.configure({adapter})

describe('Progress Tracker', () => {
  let AddCustomHabitWrapper

  beforeEach(() => {
    AddCustomHabitWrapper = shallow(<AddCustomHabit tempProp={'tempProp'} />)
  })

  it('renders the progress tracker', () => {
    expect(AddCustomHabitWrapper.find('add-custom-habit').text()).to.equal('Test test, 1, 2, 3')
  })
})
