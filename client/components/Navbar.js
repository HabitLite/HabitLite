import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const divStyle = {
  // background: '#dcd0b4',
  // overflow: 'hidden',
  display: 'inline-flex',
  // position: 'fixed',
  top: '0',
  width: '100%',
  marginLeft: '-8px',
  height: '50px'
};


const Navbar = ({ handleClick, isLoggedIn }) => (

  <div>
    <nav>

      {isLoggedIn ? (
        <div className="user-navbar" style={divStyle}>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-links">Summary</Link>
          <Link to="/group" className="nav-links">Group</Link>
          <a href="#" onClick={handleClick} className="logout-btn">
            Logout
            </a>
        </div>
      ) : (
          <div className="login-signup-text">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="login">Login/</Link>
            <Link to="/signup" className="sign-up">Sign Up</Link>
          </div>
        )}


    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}