import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'
import { Navbar } from 'react-bulma-components'

class Header extends Component {
  render(){
  return (
    <Navbar color="primary">
      <Navbar.Brand >
        <NavLink to="/dashboard" className="navbar-item" activeClassName="is-active">
        <img
        src="/images/sitelogo.png"
        alt="Jobyzer"
        width="100"
        height="52"
      />
    </NavLink>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item dropdown hoverable>
            <Navbar.Link>Jobs</Navbar.Link>
            <Navbar.Dropdown boxed>
            <NavLink to='/jobs/applied' activeClassName="is-active" className=" navbar-item">Applied</NavLink>
            <NavLink to='/jobs/interviewing' activeClassName="is-active" className=" navbar-item">Interviewing</NavLink>
            <NavLink to='/jobs/archived' activeClassName="is-active" className=" navbar-item">Archived</NavLink>
            <NavLink to='/jobs/bookmarks' activeClassName="is-active" className=" navbar-item">Bookmarks</NavLink>
            </Navbar.Dropdown>
          </Navbar.Item>
          <NavLink to='/websites' activeClassName="is-active" className=" navbar-item">Job Websites</NavLink>
        </Navbar.Container>
        <Navbar.Container position="end" >
        <NavLink  className="nav-tag navbar-item" to='/jobs/interviewing'>
        <span className="icon is-small">
          <i className="fa fa-bell"></i>
        </span>
        <span className="tag is-primary tag-notif">{this.props.jobs.filter(job => job.status === 'interviewing').length}</span>
        </NavLink>
          <Navbar.Item onClick={()=>this.props.startLogout()}>
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
}
const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)