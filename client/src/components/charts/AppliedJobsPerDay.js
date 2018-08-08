import React, { Component } from 'react'

import { Line } from 'react-chartjs-2'
import moment from 'moment'


class AppliedJobsPerDay extends Component {

  renderJobsPerDay (){
    const jobsPerDay = this.props.jobs.reduce(
      (totals, job) => ({ ...totals, [job.date]: (totals[job.date] || 0) + 1 }),
      {}
    )
    var days = [], number = []
    for (var key in jobsPerDay) {
      if (jobsPerDay.hasOwnProperty(key)) {
        days.push(moment.unix(key).format("MMMM D, YYYY"))
        number.push(jobsPerDay[key])
      }
    }

    
    // const data = {
    //   labels: country,
    //   datasets: [{
    //     data: number,
    //     backgroundColor
    //   }]
    // };
    const data = {
      labels: days,
      datasets: [
        {
          label: 'Number of Applied jobs',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: number
        }
      ]
    };
    return (
      <Line data={data} />
    )
  }
  render() {
    return (
      <div>
        <h2>Applied jobs per day</h2>
        {this.renderJobsPerDay()}
      </div>
    )
  }
}



export default AppliedJobsPerDay