import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { startEditJob,startSetJobs,startRemoveJob } from '../../actions/jobs'

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

const renderSelect = ({ input, type, label, meta: { touched, error },icon,...custom}) => (

  <div className="field">
    <label className="label">{label}</label>
    <div className="control  has-icons-left">
      <div className="select">
        <select  {...input} {...custom} />
      </div>
      <div className="icon is-small is-left">
        <i className={icon}></i>
      </div>
    </div>
    <div className="has-text-danger" style={{ marginBottom: "20px" }}>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class EditJob extends Component {
  componentDidMount() {
    this.props.startSetJobs()
    this.handleInitialize();
  }
  handleInitialize() {
  
    let initData={}
    if (this.props.website) {
      initData = {
        name:this.props.website.reply,
        url: this.props.website.interview
        }
    }else {
      initData = {
        reply:"",
        reply: ""
        };
    }

  
    this.props.initialize(initData);
  }
  onSubmit = (job) => {
   // this.props.startAddJob(job)
   this.props.startEditJob(this.props.match.params.id,job)

    console.log(job);
   this.props.history.push('/jobs');

  }

  render() {
    const { handleSubmit} = this.props

    return (
      <section className="container">
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


        <div>
          <button className="button is-primary" type="submit" >Update</button>
          <button className="button is-danger" onClick={() => {
            this.props.startRemoveJob({ id: this.props.job.id})
            this.props.history.push('/jobs')
          }}>
            Delete
        </button>
        </div>
      </form>
    </section>



    );
  }
}
const mapStateToProps = (state,props) => ({
  job: state.jobs.find((job) => job.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  startEditJob: (id,website) => dispatch(startEditJob(id,website)),
  startSetJobs :() => dispatch(startSetJobs()),
  startRemoveJob: (id)=> dispatch(startRemoveJob(id))
});
EditJob = connect(mapStateToProps,mapDispatchToProps)(EditJob)

export default reduxForm({
  form: 'jobForm',
})(EditJob)