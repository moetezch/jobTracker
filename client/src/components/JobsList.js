import React, { Component } from 'react'
import {connect} from 'react-redux'
import JobsListItem from './JobsListItem'

class JobsList extends Component {
  render() {
    return (
      <div>
      JOb list

      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    jobs:state.jobs
  }
}

export default connect(mapStateToProps)(JobsList)
