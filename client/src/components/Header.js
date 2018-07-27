import React from 'react'
import {NavLink} from 'react-router-dom'


const Header =()=>{
  return (
    <div>
    <NavLink to='/' activeClassName="is-active" exact>Home</NavLink>
    <NavLink to='/dashboard' activeClassName="is-active">Dashboard</NavLink>
    <NavLink to='/jobs' activeClassName="is-active">Jobs</NavLink>
    <NavLink to='/websites' activeClassName="is-active">Websites</NavLink>
    </div>

  )
}
export default Header