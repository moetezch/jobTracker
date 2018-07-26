import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'



import Dashboard from './Dashboard'
import Landing from './Landing'
import NotFoundPage from './NotFoundPage'
import Header from './Header'
import Footer from './Footer'
import JobList from './JobsList'
import NewJob from './NewJob'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <div>
        
        <Header/>
        <Switch>
         
          <Route exact path="/" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/jobs" component={JobList} />
          <Route path="/jobs/new" component={NewJob} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer/>
        </div>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
