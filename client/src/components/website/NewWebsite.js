import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { startAddWebsite } from '../../actions/websites'
import validate from '../../utils/validateWebsite'

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

class NewWebsite extends Component {
  onSubmit = (website) => {
    this.props.startAddWebsite(website)
    console.log(website);
    this.props.history.push('/websites');

  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div>
      <section className="column container">
          <h2 className="is-size-2">New Job website </h2>
       <form onSubmit={handleSubmit(this.onSubmit)}>
      <Field
      name="name"
      type="text"
      component={renderInput}
      label="Website Name"
    >
    </Field>
    <Field
      name="url"
      type="text"
      component={renderInput}
      label="URL"
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
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  startAddWebsite: (website) => dispatch(startAddWebsite(website))
});
NewWebsite = connect(undefined, mapDispatchToProps)(NewWebsite)

export default reduxForm({
  form: 'websiteForm',
  validate
})(NewWebsite)