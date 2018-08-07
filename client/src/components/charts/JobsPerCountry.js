import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/jobs'
import { Doughnut } from 'react-chartjs-2'



class JobsPerCountry extends Component {
  componentDidMount() {
    this.props.startSetJobs()
  }
  renderJobsPerCountry (){
    const jobsPerCountry = this.props.jobs.reduce(
      (totals, job) => ({ ...totals, [job.country]: (totals[job.country] || 0) + 1 }),
      {}
    )
    var country = [], number = []
    for (var key in jobsPerCountry) {
      if (jobsPerCountry.hasOwnProperty(key)) {
        country.push(key)
        number.push(jobsPerCountry[key])
      }
    }

    const backgroundColor = []
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    for (let i = 0; i < country.length; i++) {
      backgroundColor.push(getRandomColor())
    }
    
    const data = {
      labels: country,
      datasets: [{
        data: number,
        backgroundColor
      }]
    };

    return (
      <Doughnut data={data} />
    )
  }
  render() {
    return (
      <div>
        <h2>Jobs Applied per Country</h2>
        {this.renderJobsPerCountry()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}

export default connect(mapStateToProps, actions)(JobsPerCountry)