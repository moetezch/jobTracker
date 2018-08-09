import React, { Component } from 'react';
import JobsList from './JobsList'
export default class AppliedJobs extends Component {
  render() {
    return (
      <div>
      <JobsList status="applied"/>
      </div>
    );
  }
}