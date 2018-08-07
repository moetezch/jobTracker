import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {startSetJobs} from '../../actions/jobs'
import { startGetWebsite,startSetWebsites } from '../../actions/websites'
import moment from 'moment'
import selectJobs from '../../selectors/jobs'
import JobListFilters from './JobListFilters'
class JobsList extends Component {


  componentDidMount() {
    
    
    this.props.startSetJobs()
    this.props.startSetWebsites()
  }
  render() {
    return (
      
      <section className="section">
      <JobListFilters />

     
     
      <div className="container">
       
        {
          this.props.jobs.length === 0 ? (
            <div className="">
              <span>Hurry up and apply for a new job</span>
            </div>
          ) : (
            <div>
            <h2 className="has-size-3">You Applied for <strong>{this.props.jobs.length}</strong> {this.props.jobs.length === 1 ? 'job' : 'jobs'}</h2>

            
            <div className="table-container">
            <table className="table is-striped is-hoverable is-fullwidth">
            <thead>
            <tr>
              <th title="number">Number</th>
              <th title="date" onClick={()=>{
                console.log('hi');
                
              }}>Date</th>
              <th title="job title">Job Title</th>
              <th title="type">Type</th>
              <th title="company">Company</th>
              <th title="Country">Country</th>
              <th title="found on">Found on</th>
              <th title="job link">Link</th>
              <th title="reply">Reply</th>
              <th title="Interview">Interview</th>
              <th title="notes">Notes</th>
              <th title="edit"></th>
            </tr>
          </thead>
            <tbody>
          
            {this.props.jobs.map((job,index) => {
              
              let website = this.props.websites.filter(website=>website.id===job.foundOn)
              // console.log(job.foundOn);
              
              // console.log(index);
              
           //  console.log(website);
              
             // this.props.startGetWebsite(job.fondOn)
                return (

                  <tr key={job.id}>
                  <td>{index+1}</td>
                  <td>{moment.unix(job.date).format("MMMM D, YYYY")}</td>
                  <td>{job.jobTitle}</td>
                  <td>{job.type}</td>
                  <td>{job.company}</td>
                  <td>{job.country}</td>
                  <td>{website[0] ?website[0].name : 'Other'}</td>
                  <td>{job.link?<a href={job.link} target="_blanc">Visit</a>:''}</td>
                  <td>{moment.unix(job.reply).isValid() ?moment.unix(job.reply).format("MMMM D, YYYY"):job.reply}</td>
                  <td>{moment.unix(job.interview).isValid() ?moment.unix(job.interview).format("MMMM D, YYYY"):job.interview}</td>
                  <td>{job.notes}</td>
                  <td><Link className="button is-medium is-rounded is-light" to={`jobs/edit/${job.id}`}>Edit</Link></td>
              </tr>
                )
              })}
              </tbody>
              </table>
              </div>
              </div>
            )
        }
        <Link className='button is-primary is-pulled-right' to="jobs/new"><i className="fas fa-plus"></i></Link>

      </div>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  startSetJobs :() => dispatch(startSetJobs()),
  startSetWebsites :() => dispatch(startSetWebsites())
 // startGetWebsite: (id)=> dispatch( startGetWebsite(id))
});
const mapStateToProps = (state) => {
  return {
    jobs: selectJobs(state.jobs, state.filters),
   // jobs:state.jobs,
    websites:state.websites
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsList)