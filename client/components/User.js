'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const User = props => {

  const { avatar, username, level, lives, HP, XP } = props

  return (
    <div className="user-panel">
      <div className="avatar">
      <img className="user-image" src="../images/user.png"></img>
        {/* Avatar: {avatar} */}
      </div>
      <div className="username">
        <span>Username </span><br/>{username}
      </div>
      <div className="level">
      <span>Level</span><br/>{level + 1}
      </div>
      <div className="lives">
      <span> Lives </span><br/>{lives}
      </div>
      <div className="HP">
      <span>HP </span><br/>{HP}
      </div>
      <div className="XP">
      <span>Total XP </span><br/>{XP}
      </div>
    </div>
  )
}

/* *** CONTAINER *** */
const mapState = state => {
  return {
    avatar: state.user.avatar,
    username: state.user.username,
    level: state.user.level,
    lives: state.user.lives,
    HP: state.user.hp,
    XP: state.user.xp
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
