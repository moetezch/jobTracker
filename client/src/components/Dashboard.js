import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/jobs'
import JobChartFilters from './charts/JobChartFilters'
import JobsPerCountry from './charts/JobsPerCountry'
import JobsPerWebsite from './charts/JobsPerWebsite'
import AppliedJobsPerDay from './charts/AppliedJobsPerDay'
import selectJobs from '../selectors/jobs'

class Dashboard extends Component {
  componentDidMount() {
    this.props.startSetJobs()    
  }

  render() {
    return (
      <section className="section">
        <div className="container">
        <JobChartFilters/>
          <JobsPerWebsite jobs={this.props.jobs} websites={this.props.websites}/>
          <JobsPerCountry jobs={this.props.jobs}/>
          <AppliedJobsPerDay jobs={this.props.jobs}/>
        </div>
      </section>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    jobs:selectJobs(state.jobs, state.filters),
    websites:state.websites
  }
}

export default connect(mapStateToProps, actions)(Dashboard)