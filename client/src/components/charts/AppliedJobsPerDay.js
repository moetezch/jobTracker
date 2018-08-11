import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

class AppliedJobsPerDay extends Component {

  renderJobsPerDay() {
    const totalDays = [], numberOfJobs = [];
    for (var m = moment(this.props.filters.startDate); m.diff(this.props.filters.endDate, 'days') <= 0; m.add(1, 'days')) {
      totalDays.push(m.format("MMMM D, YYYY"))
    }
    const jobsPerDay = this.props.jobs.reduce(
      (totals, job) => ({ ...totals, [job.date]: (totals[job.date] || 0) + 1 }),
      {}
    )
    const days = [], number = []
    for (var key in jobsPerDay) {
      if (jobsPerDay.hasOwnProperty(key)) {
        days.push(moment.unix(key).format("MMMM D, YYYY"))
        number.push(jobsPerDay[key])
      }
    }
    let count = 0
    for (let i = 0; i < totalDays.length; i++) {

      if (totalDays[i] == days[count]) {
        numberOfJobs.push(number[count])
        count++
      } else {
        numberOfJobs.push(0)
      }
    }
    const data = {
      labels: totalDays,
      datasets: [
        {
          label: 'Number of applied jobs',
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
          data: numberOfJobs
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
        <h2 className="is-size-3">Applied Jobs/Day</h2>
        {this.renderJobsPerDay()}
      </div>
    )
  }
}

export default AppliedJobsPerDay