'use strict'

import React from 'react';

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

export default User;
