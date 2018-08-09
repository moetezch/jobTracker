import React, { Component } from 'react';
import JobsList from './JobsList'
export default class RepliedJobs extends Component {
  render() {
    return (
      <div>
      <JobsList status="replied"/>
      </div>
    );
  }
}