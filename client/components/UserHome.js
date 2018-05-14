'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { User, Categories, Habits, Progress } from './index'

/* *** COMPONENT *** */
export const UserHome = (props) => {
  console.log("!!!!!!!!PROPS in user home ", props)
  return (
    <div className="main-page">

      {/* <h3 className="welcome">Welcome, {username}</h3> */}
      {/* <Link to="home" className="arrow"><img src="./images/left-arrow.png"/></Link> */}
      <User />
      <Categories props={props} />
      <Habits />
      <div className="progress-bar">
        <h2>{props.match.params.category}</h2>
        <Progress />
      </div>
    </div>
  )
}

export default connect()(UserHome)

