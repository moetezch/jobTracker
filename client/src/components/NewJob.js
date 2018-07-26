import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { addJob } from '../actions/jobs'







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


class NewJob extends Component {
  componentDidMount() {
    console.log(this.props);

  }


  onSubmit = (job) => {
    console.log(job);

    //this.props.addSession(session)
  }


  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div className="columns">
      
        <section className="column container">
          <h2 className="is-size-2">I applied for : </h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>

            <Field
              name="name"
              type="text"
              component={renderInput}
              label="Name"
            >
            </Field>




            <div>
              <button className="button" type="submit" >Save</button>
              <button className="button" disabled={pristine || submitting} onClick={reset}>
                Clear Values
            </button>
            </div>
          </form>
        </section>

      </div>
    )
  }
}
const mapStateToProps = ({ jobs }) => ({
  jobs
})
const mapDispatchToProps = (dispatch) => ({
  addJob: (job) => dispatch(addJob(job))
});
NewJob = connect(mapStateToProps, mapDispatchToProps)(NewJob)

export default reduxForm({
  form: 'jobForm',
})(NewJob)