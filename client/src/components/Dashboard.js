import React, { Component } from 'react'
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