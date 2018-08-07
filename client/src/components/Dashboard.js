import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/jobs'
import JobsPerCountry from './charts/JobsPerCountry'
import JobsPerWebsite from './charts/JobsPerWebsite'


class Dashboard extends Component {

  render() {
    return (
      <section className="section">
        <div className="container">
          <JobsPerWebsite/>
          <JobsPerCountry/>
        </div>
      </section>
    );
  }
}



export default Dashboard