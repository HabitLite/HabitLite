'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { User, Categories, Habits, Progress } from './index'

/* *** COMPONENT *** */
export const UserHome = props => {

  const { email, username } = props

  return (
    <div className="main-page">

      {/* <h3 className="welcome">Welcome, {username}</h3> */}
      <User />
      <Categories />
      <Habits />
      <Progress />
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
