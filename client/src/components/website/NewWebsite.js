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
      
      <section className="section">
      <div className="container">
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
    <div className="buttons">
    <button className="button is-primary" type="submit" >
      <span>Save</span>
      <span className="icon is-small">
        <i className="fas fa-save"></i>
      </span>
    </button>
    <button className="button is-warning" disabled={pristine || submitting} onClick={reset}>
      <span>Clear</span>
      <span className="icon is-small">
        <i className="fas fa-eraser"></i>
      </span>
    </button>
  </div>
  </form>
  </div>
  </section>
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