import React from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

const Header =({ startLogout })=>{
  return (
    <div>
    <NavLink to='/dashboard' activeClassName="is-active">Dashboard</NavLink>
    <NavLink to='/jobs' activeClassName="is-active">Jobs</NavLink>
    <NavLink to='/websites' activeClassName="is-active">Websites</NavLink>
    <button className="button button--link" onClick={startLogout}>Logout</button>

    </div>

  )
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);