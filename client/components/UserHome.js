'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { User, Categories, Habits, Progress } from './index'

/* *** COMPONENT *** */
export const UserHome = () => {
  return (
    <div className="main-page">

      {/* <h3 className="welcome">Welcome, {username}</h3> */}
      {/* <Link to="home" className="arrow"><img src="./images/left-arrow.png"/></Link> */}
      <User />
      <Categories />
      <Habits />
      <div className="progress-bar">
        <Progress />
      </div>
    </div>
  )
}

export default connect()(UserHome)

