'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { User, Categories, Progress } from './index'

/* *** COMPONENT *** */
export const UserHome = () => {
  return (
    <div className="main-page">

      {/* <h3 className="welcome">Welcome, {username}</h3> */}
      {/* <Link to="home" className="arrow"><img src="./images/left-arrow.png"/></Link> */}
      <User />
      <Categories />
      <div className="progress-bar">
        Total Progress {/* ***Please read*** This could potentially go in the Progress component, but it should go inside an "if (!props.category)" statement
                        Why? Because the total progress only displays in the UserHome page, where a category is not being passed into the Progress component
                        Otherwise it only shows how much a particular category contributes to the overall progress */}
        <Progress />
      </div>
    </div>
  )
}

export default connect()(UserHome)

