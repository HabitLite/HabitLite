'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { User, Categories, Habits, Progress } from './index'

/* *** COMPONENT *** */
export const UserHome = props => {

  const { email, username } = props
  // console.log('props ', props.location.state)
  const singleCategoryName = props.location.state.name;


  return (
    <div className="main-page">

      {/* <h3 className="welcome">Welcome, {username}</h3> */}
      <Link to='home' className="arrow"><img src="./images/left-arrow.png"/></Link>
      <User />
      <Categories />
      <Habits />
      <div className="progress-bar">
      <Progress name={singleCategoryName}/>
      </div>
    </div>
  )
}

/* *** CONTAINER *** */
const mapState = (state) => {
  return {
    email: state.user.email,
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

/* *** PROP TYPES *** */
UserHome.propTypes = {
  email: PropTypes.string.isRequired
}
