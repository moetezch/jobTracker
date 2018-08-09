import React, { Component } from 'react'
import JobsList from './JobsList'
export default class InterviewingJobs extends Component {
  render() {
    return (
      <div>
        <JobsList status="interviewing" />
      </div>
    );
  }
}