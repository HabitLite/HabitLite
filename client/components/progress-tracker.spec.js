'use strict'

/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ProgressTracker } from './index'

const adapter = new Adapter()
Enzyme.configure({adapter})

describe('Progress Tracker', () => {
  let progressTrackerWrapper

  beforeEach(() => {
    progressTrackerWrapper = shallow(<ProgressTracker tempProp={'tempProp'} />)
  })

  it('renders the progress tracker', () => {
    expect(progressTrackerWrapper.find('progress-tracker').text()).to.equal('Test test, 1, 2, 3')
  })
})
