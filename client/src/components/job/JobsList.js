import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions/jobs'
class JobsList extends Component {

  componentDidMount() {
    this.props.startSetJobs()
  }

  render() {
    return (
      <section className="section">
      <div className="container">
    
        <Link className='button is-primary is-pulled-right' to="jobs/new"><i className="fas fa-plus"></i></Link>
        {
          this.props.jobs.length === 0 ? (
            <div className="">
              <span>No Jobs</span>
            </div>
          ) : (
            <table className="table is-striped is-hoverable is-fullwidth">
            <thead>
            <tr>
              <th title="number">Number</th>
              <th title="date">Date</th>
              <th title="job title">Job Title</th>
              <th title="company">Company</th>
              <th title="Country">Country</th>
              <th title="found on">Found on</th>
              <th title="reply">Reply</th>
              <th title="Interview">Interview</th>
              <th title="notes">Notes</th>
              <th title="edit"></th>
            </tr>
          </thead>
            <tbody>
            {  this.props.jobs.map((job,index) => {
  
              
                return (

                  <tr key={job.id}>
                  <td>{index+1}</td>
                  <td>{job.date}</td>
                  <td>{job.jobTitle}</td>
                  <td>{job.company}</td>
                  <td>{job.country}</td>
                  <td>{job.foundOn}</td>
                  <td>{job.reply}</td>
                  <td>{job.interview}</td>
                  <td>{job.notes}</td>
                  <td><Link className="button is-medium is-rounded is-light" to={`jobs/edit/${job.id}`}>Edit</Link></td>
              </tr>
                )
              })}
              </tbody>
              </table>
            )
        }
        
      </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}

export default connect(mapStateToProps, actions)(JobsList)