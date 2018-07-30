import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { startEditJob, startSetJobs, startRemoveJob } from '../../actions/jobs'
import moment from 'moment'
import validate from '../../utils/validateEditJob'

const renderInput = ({ input, label, type, meta: { touched, error }, ...custom }) => (

  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input {...input} type={type} style={{ marginBottom: "5px" }} className="input" {...custom} />
      <div className="has-text-danger" style={{ marginBottom: "20px" }}>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  </div>
)


class EditJob extends Component {
  componentDidMount() {
    this.props.startSetJobs()
  }

  onSubmit = ({ interview, reply }) => {
    const job = {
      reply: moment(reply).unix(),
      interview: moment(interview).unix()
    }

    this.props.startEditJob(this.props.match.params.id, job)
    //console.log(moment(job.interview).unix());

    //  console.log(job);
    this.props.history.push('/jobs');
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <section className="section">
        <div className="container">
          <Link className="button is-light" to="/jobs"><i className="fas fa-arrow-left "></i></Link>
          <h2 className="is-size-2">{this.props.job.jobTitle} @ {this.props.job.company}</h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="reply"
              type="date"
              component={renderInput}
              label="Date of first reply"
            >
            </Field>
            <Field
              name="interview"
              type="date"
              component={renderInput}
              label="Date of first Interview"
            >
            </Field>



            <div className="buttons">
              <button className="button is-primary" type="submit" >
                <span>Update</span>
                <span className="icon is-small">
                  <i className="fas fa-sync"></i>
                </span>
              </button>
              <button className="button is-danger is-pulled-right" onClick={() => {
                this.props.startRemoveJob({ id: this.props.job.id })
                this.props.history.push('/jobs')
              }}>
                <span>Delete</span>
                <span className="icon is-small">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>

          </form>
        </div>
      </section>



    );
  }
}
const mapStateToProps = (state, props) => ({
  job: state.jobs.find((job) => job.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  startEditJob: (id, website) => dispatch(startEditJob(id, website)),
  startSetJobs: () => dispatch(startSetJobs()),
  startRemoveJob: (id) => dispatch(startRemoveJob(id))
});
EditJob = connect(mapStateToProps, mapDispatchToProps)(EditJob)

export default reduxForm({
  form: 'jobForm',
  validate
})(EditJob)