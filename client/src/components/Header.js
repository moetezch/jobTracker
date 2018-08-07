import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'
import { Navbar } from 'react-bulma-components'

const Header = ({ startLogout }) => {
  return (
    <Navbar color="primary">
      <Navbar.Brand >
        <NavLink to="/dashboard" className="navbar-item" activeClassName="is-active">
          Job Hunt Tracker
    </NavLink>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container >
          <NavLink to='/jobs' activeClassName="is-active" className=" navbar-item">Applied Jobs</NavLink>
          <NavLink to='/websites' activeClassName="is-active" className=" navbar-item">Job Websites</NavLink>
        </Navbar.Container>
        <Navbar.Container position="end" >
          <Navbar.Item onClick={startLogout}>
            <span className="icon is-small">
              <i className="fa fa-power-off" style={{ marginRight: '1em' }}></i>
            </span>
            Logout
        </Navbar.Item>
        </Navbar.Container>

      </Navbar.Menu>
    </Navbar>
  )
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);