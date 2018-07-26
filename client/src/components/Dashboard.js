import React, { Component } from 'react';
import JobsList from './JobsList';

export default class Dashboard extends Component {
  render() {
    return (
      <div>Dashboard
      
      <JobsList/>
      </div>
      
    );
  }
}