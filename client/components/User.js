'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const User = props => {

  const { avatar, username, level, lives, HP, XP } = props

  return (
    <div {...props}>
      <div className="avatar">
        Avatar: {avatar}
      </div>
      <div className="username">
        Username: {username}
      </div>
      <div className="level">
        Level: {level}
      </div>
      <div className="lives">
        Lives: {lives}
      </div>
      <div className="HP">
        HP: {HP}
      </div>
      <div className="XP">
        Total XP: {XP}
      </div>
    </div>
  )
}

/* *** CONTAINER *** */
const mapState = state => {
  return {
    avatar: state.user.avatar,
    username: state.user.username,
    level: state.user.levelId,
    lives: state.user.lives,
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
  lives: PropTypes.number.isRequired,
  HP: PropTypes.number.isRequired,
  XP: PropTypes.number.isRequired
}
