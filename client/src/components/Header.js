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
        <Navbar.Container>
          <Navbar.Item dropdown hoverable>
            <Navbar.Link>Jobs</Navbar.Link>
            <Navbar.Dropdown boxed>
            <NavLink to='/jobs/applied' activeClassName="is-active" className=" navbar-item">Applied</NavLink>
            <NavLink to='/jobs/replied' activeClassName="is-active" className=" navbar-item">Replied</NavLink>
            <NavLink to='/jobs/interviewing' activeClassName="is-active" className=" navbar-item">Interviewing</NavLink>
            <NavLink to='/jobs/archived' activeClassName="is-active" className=" navbar-item">Archived</NavLink>
            </Navbar.Dropdown>
          </Navbar.Item>
          <NavLink to='/websites' activeClassName="is-active" className=" navbar-item">Job Websites</NavLink>
        </Navbar.Container>
        <Navbar.Container position="end" >
        <Navbar.Item className="nav-tag">
        <span className="icon is-small">
          <i className="fa fa-bell"></i>
        </span>
        <span className="tag is-primary tag-notif">6</span>
        </Navbar.Item>
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