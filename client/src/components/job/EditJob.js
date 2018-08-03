import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {Modal} from 'react-bulma-components'
import { reduxForm, Field } from 'redux-form'
import { startEditJob, startSetJobs, startRemoveJob } from '../../actions/jobs'
import moment from 'moment'
import validate from '../../utils/validateEditJob'
import renderDate from '../form/SingleDatePicker'


class EditJob extends Component {
  state = { open: false }
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
              component={renderDate}
              label="Date of first reply"
              normalize={(data) => data && data.value && data.value.format()}
              format={(value) => value ? moment(value) : undefined}
            >
            </Field>
            <Field
              name="interview"
              component={renderDate}
              label="Date of first Interview"
              normalize={(data) => data && data.value && data.value.format()}
              format={(value) => value ? moment(value) : undefined}
            >
            </Field>



            <div className="buttons">
              <button className="button is-primary" type="submit" >
                <span>Update</span>
                <span className="icon is-small">
                  <i className="fas fa-sync"></i>
                </span>
              </button>
              <button className="button is-danger is-pulled-right" type="button" onClick={() => this.setState({ open: true })}>
                <span>Delete</span>
                <span className="icon is-small">
                  <i className="fas fa-times"></i>
                </span>
              </button>
<div>
<Modal show={this.state.open} onClose={() => this.setState({ open: false })} className="modal">
<div className="modal-background"></div>
<div className="modal-card">
  <header className="modal-card-head">
    <p className="modal-card-title">Are you sure you want to delete this job ?</p>
  </header>

  <footer className="modal-card-foot">
    <button className="button is-success" onClick={() => {
      this.props.startRemoveJob({ id: this.props.job.id })
      this.props.history.push('/jobs')
    }}>Confirm
    </button>
    <button className="button" onClick={() => this.setState({ open: false })}>Cancel</button>
  </footer>
</div>
</Modal>
</div>
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