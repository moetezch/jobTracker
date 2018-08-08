import React, { Component } from 'react'
import { GeoChart } from 'react-chartkick'


class JobsPerCountry extends Component {

  renderJobsPerCountry() {
    const jobsPerCountry = this.props.jobs.reduce(
      (totals, job) => ({ ...totals, [job.country]: (totals[job.country] || 0) + 1 }),
      {}
    )


    const countries = []
    for (var key in jobsPerCountry) {
      if (jobsPerCountry.hasOwnProperty(key)) {
        countries.push([key, jobsPerCountry[key]])
      }
    }
    return (
      <GeoChart data={countries} height="500px" />
    )
  }
  render() {
    return (
      
      <div>
        <h2>Jobs Applied per Country</h2>
        <div>
          {this.renderJobsPerCountry()}
        </div>

      </div>
    )
  }
}


export default JobsPerCountry