import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startSetJobs, startEditJob } from '../../actions/jobs'
import { startSetWebsites } from '../../actions/websites'
import moment from 'moment'
import { Dropdown,Modal } from 'react-bulma-components'
import selectJobs from '../../selectors/jobs'
import JobListFilters from './JobListFilters'
import RenderDate from '../form/SingleDatePicker'
import { SingleDatePicker } from "react-dates"
class JobsList extends Component {
  state = { replyOpen: false, interviewOpen: false }

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

                  <h2 className="has-size-3">Total : <strong>{this.props.jobs.filter(job => job.status === this.props.status).length}</strong> {this.props.jobs.filter(job => job.status === this.props.status).length === 1 ? 'job' : 'jobs'}</h2>


                  <div className="table-container">
                    <table className="table is-striped is-hoverable is-fullwidth">
                      <thead>
                        <tr>
                          <th title="number">Number</th>
                          <th title="date">Date</th>
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
                          <th title="status">Status</th>
                        </tr>
                      </thead>
                      <tbody>

                        {this.props.jobs.filter(job => job.status === this.props.status).map((job, index) => {

                          let website = this.props.websites.filter(website => website.id === job.foundOn)
                          // console.log(job.foundOn);

                          //console.log(index);

                          //console.log(website);

                          // this.props.startGetWebsite(job.fondOn)



                          return (

                            <tr key={job.id}>
                              <td>{index + 1} </td>
                              <td>{moment.unix(job.date).format("MMMM D, YYYY")}</td>
                              <td>{job.jobTitle}</td>
                              <td>{job.type}</td>
                              <td>{job.company}</td>
                              <td>{job.country}</td>
                              <td>{website[0] ? website[0].name : 'Other'}</td>
                              <td>{job.link ? <a href={job.link} target="_blanc">Visit</a> : ''}</td>
                              <td>{moment.unix(job.reply).isValid() ? moment.unix(job.reply).format("MMMM D, YYYY") : job.reply}</td>
                              <td>{moment.unix(job.interview).isValid() ? moment.unix(job.interview).format("MMMM D, YYYY") : job.interview}</td>
                              <td>{job.notes}</td>
                              <td><Link className="button is-medium is-rounded is-light" to={`/jobs/edit/${job.id}`}>Edit</Link></td>
                              <td>
                                <button className="button"
                                  onClick={() => this.setState({ replyOpen: true })}

                                >
                                  Got a reply?
                                </button>
                                <button className="button"
                                onClick={() => this.setState({ interviewOpen: true })}
                              


                                >
                                  Got an interview?
                                </button>
                                <button className="button"
                                  onClick={() => {
                                    job.status = "archived"
                                    this.props.startEditJob(job.id, job)

                                    this.props.startSetJobs()
                                  }}
                                >Archive</button>
                              </td>

                            </tr>
                          )

                        })}
                      </tbody>
                    </table>
                    <div>
                      <Modal show={this.state.replyOpen} onClose={() => this.setState({ replyOpen: false })} className="modal">
                      <div className="modal-card">
                        <header className="modal-card-head">
                          <p className="modal-card-title">When do you get your first reply?</p>
                        </header>
                        <div className="modal-card">
                        <section className="modal-card-body" style={{height:'500px'}}>
                        <SingleDatePicker
                        date={this.state.date} // momentPropTypes.momentObj or null
                        onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                        focused={true} // PropTypes.bool
                        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                        id="your_unique_id" // PropTypes.string.isRequired,
                        numberOfMonths={1}
                        readOnly={true}
                      />
                      </section>
                      <footer className="modal-card-foot">
                      <button className="button is-success">Save changes</button>
                      <button className="button">Cancel</button>
                    </footer>
                      </div>
                       
                      </div>
                      </Modal>
                    </div>
                    <div>
                    <Modal show={this.state.interviewOpen} onClose={() => this.setState({ interviewOpen: false })} className="modal">
                    <div className="modal-card">
                      <header className="modal-card-head">
                        <p className="modal-card-title">When is your interview?</p>
                      </header>

                        
                     
                    </div>
                    </Modal>
                  </div>
                  </div>
                </div>
              )
          }
          <Link className='button is-primary is-pulled-right' to="/jobs/new"><i className="fas fa-plus"></i></Link>

        </div>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  startSetJobs: () => dispatch(startSetJobs()),
  startEditJob: (id, job) => dispatch(startEditJob(id, job)),
  startSetWebsites: () => dispatch(startSetWebsites())
  // startGetWebsite: (id)=> dispatch( startGetWebsite(id))
});
const mapStateToProps = (state) => {
  return {
    jobs: selectJobs(state.jobs, state.filters),
    websites: state.websites
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsList)

