import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/jobs'
import JobChartFilters from './charts/JobChartFilters'
import JobsPerCountry from './charts/JobsPerCountry'
import JobsPerWebsite from './charts/JobsPerWebsite'
import AppliedJobsPerDay from './charts/AppliedJobsPerDay'
import selectJobs from '../selectors/charJobs'

class Dashboard extends Component {
  componentDidMount() {
    this.props.startSetJobs()

  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <JobChartFilters />
          <AppliedJobsPerDay jobs={this.props.jobs} filters={this.props.filters} />
          <JobsPerWebsite jobs={this.props.jobs} websites={this.props.websites} />
          <JobsPerCountry jobs={this.props.jobs} />
        </div>
      </section>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    jobs: selectJobs(state.jobs, state.chartsFilter),
    websites: state.websites,
    filters: state.chartsFilter
  }
}

export default connect(mapStateToProps, actions)(Dashboard)