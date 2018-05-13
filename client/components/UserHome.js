'use strict'

import React from 'react'
import { connect } from 'react-redux'
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
        {/*<h2 className="categ-name">{props.match.params.category}</h2> <-- currently I have it so the userHome page always 
        displays the total progress, but the userSummary page displays how each category contributed to the total progress*/}
        Total Progress
        <Progress />
      </div>
    </div>
  )
}

export default connect()(UserHome)

