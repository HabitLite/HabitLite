import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Progress from './progress'
import Categories from './categories'
import Habits from './habits'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {username} = props

  return (
    <div className="main-page">
      <h3 className="welcome">Welcome, {username}</h3>
      <Categories />
      <Habits />
      <Progress />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  username: PropTypes.string
}
