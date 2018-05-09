'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const User = props => {

  const { avatar, username, level, HP, XP } = props

  return (
    <div {...props}>
      <div className="avatar">
        {avatar}
      </div>
      <div className="username">
        {username}
      </div>
      <div className="level">
        {level}
      </div>
      <div className="HP">
        {HP}
      </div>
      <div className="XP">
        {XP}
      </div>
    </div>
  )
}

/* *** CONTAINER *** */
const mapState = (state) => {
  return {
    avatar: state.user.avatar,
    username: state.user.username,
    level: state.user.level,
    HP: state.user.HP,
    XP: state.user.XP
  }
}

export default connect(mapState)(User)

/* *** PROP TYPES *** */
User.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  HP: PropTypes.number.isRequired,
  XP: PropTypes.number.isRequired
}
