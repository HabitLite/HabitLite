'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { /* Navbar,  */User/* , Categories, Habits, Progress  */} from './index'

/* *** COMPONENT *** */
export const UserHome = props => {

  const { username } = props

  return (
    <div className="main-page">
      <h3>Welcome, {username}</h3>
      <User />
    </div>
  )
}

/* *** CONTAINER *** */
const mapState = (state) => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

/* *** PROP TYPES *** */
UserHome.propTypes = {
  username: PropTypes.string.isRequired
}
