import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'


import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import NotFoundPage from '../components/NotFoundPage'
import AppliedJobs from '../components/job/AppliedJobs'
import InterviewingJobs from '../components/job/InterviewingJobs'
import ArchivedJobs from '../components/job/ArchivedJobs'
import WebsitesList from '../components/website/WebsitesList'
import NewWebsite from '../components/website/NewWebsite'
import NewJob from '../components/job/NewJob'
import EditWebsite from '../components/website/EditWebsite'
import EditJob from '../components/job/EditJob'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory();


class AppRouter extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
        <div>
        

        <Switch>
         
          <PublicRoute exact path="/" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/jobs/applied" component={AppliedJobs} />
          <PrivateRoute exact path="/jobs/interviewing" component={InterviewingJobs} />
          <PrivateRoute exact path="/jobs/archived" component={ArchivedJobs} />
          <PrivateRoute path="/jobs/new" component={NewJob} />
          <PrivateRoute path="/jobs/edit/:id" component={EditJob} />
          <PrivateRoute exact path="/websites" component={WebsitesList} />
          <PrivateRoute path="/websites/new" component={NewWebsite} />
          <PrivateRoute path="/websites/edit/:id" component={EditWebsite} />
          <Route component={NotFoundPage} />
        </Switch>
        </div>

        </Router>
      </div>
    );
  }
}

export default AppRouter;
