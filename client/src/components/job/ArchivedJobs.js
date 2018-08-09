import React, { Component } from 'react'
import JobsList from './JobsList'
export default class ArchivedJobs extends Component {
  render() {
    return (
      <div>
      <JobsList status="archived"/>
      </div>
    );
  }
}