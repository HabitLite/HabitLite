import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const divStyle = {
  display: 'inline-flex',
  top: '0',
  width: '100%',
  marginLeft: '-8px',
  height: '50px'
};
const navStyle = {
  display: 'inline-flex',
  marginLeft: '67%',
  width: '450px',
  fontSize: '1.7em'

}


const Navbar = ({ handleClick, isLoggedIn }) => (

  <div>
    <nav>
      {isLoggedIn ? (
        <div className="user-navbar" style={divStyle}>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-links">Summary</Link>
          <Link to="/group" className="nav-links">Group</Link>
          <Link to="/resources" className="nav-links">Resources</Link>
          <a href="#" onClick={handleClick} className="nav-links" style={{ marginLeft: "auto" }}>
            Logout
            </a>
        </div>
      ) : (
          <div className="login-signup-text" style={navStyle}>
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