import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {removeCartUponLogout} from '../store/cart'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container">
    <Link className="navbar-brand" to="/">Home</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
    {isLoggedIn ? (
      <ul className="navbar-nav ml-auto">
          {/* The navbar will show these links after you log in */}
          <li className="nav-item active" style={{"marginRight": "10px"}}>
            <Link to="/">Home</Link>
              <span className="sr-only">(current)</span>
          </li>
          <li className="nav-item" style={{"marginRight": "10px"}}>
            <Link to="/" onClick={handleClick}>Logout</Link>
          </li>
          <li>
            <Link to={'/single-user'} style={{"marginRight": "10px"}}>User Account</Link>
          </li>
          <li>
            <Link to={'/cart'} style={{"marginRight": "10px"}}>Cart</Link>
          </li>
          {isAdmin ? (
            <li>
              <Link to={'/admin-dashboard'} style={{"marginRight": "10px"}}>Admin</Link>
            </li>            
          ) : null}
      </ul>)
        : (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link to="/">Home</Link>
              <span className="sr-only">(current)</span>
          </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to={'/cart'}>Cart</Link>
        </li>
        </ul>
        )}
    </div>
  </div>
</nav>)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.id && state.user.isAdmin,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      //dispatch remove cart then logout
      dispatch(removeCartUponLogout())
      .then(() => dispatch(logout()))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}
