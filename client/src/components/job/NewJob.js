import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
//import moment from 'moment';
import { startAddJob } from '../../actions/jobs'
import {startSetWebsites} from '../../actions/websites'
import country_list from '../../utils/countries'
import validate from '../../utils/validateJob'




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
const renderTextarea = ({ input, label, type, meta: { touched, error }, }) => (


  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <textarea {...input} type={type} className="textarea" />
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

class NewJob extends Component {
  componentDidMount() {
    this.props.startSetWebsites()

    //console.log(this.props);
  }

  getCountries() {
    return country_list.map((country)=>{
      return (<option value={country} key={country}>{country}</option>)
      
    })
    
  }
  getWebsites (){
    return this.props.websites.map((website)=>{
      return (<option value={website.name} key={website.id}>{website.name}</option>)
      
    })
  }
  onSubmit = (job) => {

   this.props.startAddJob(job)
   // console.log(job);
   this.props.history.push('/jobs');

  }


  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div className="">

        <section className="container">
          <h2 className="is-size-2">I applied for : </h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="date"
              type="date"
              component={renderInput}
              label="Date"
            >
            </Field>
            <Field
              name="jobTitle"
              type="text"
              component={renderInput}
              label="Job Title"
            >
            </Field>
            <Field
              name="company"
              type="text"
              component={renderInput}
              label="Company"
            >
            </Field>
            <Field
              name="country"
              type="text"
              component={renderSelect}
              label="Country"
              icon="fas fa-globe"
            >
              <option />
              {this.getCountries()}
            </Field>
            <Field
              name="foundOn"
              type="text"
              component={renderSelect}
              label="Found On"
              icon="fas fa-location-arrow "
            >
            <option />
            <option value="N/A">N/A</option>
            {this.getWebsites()}
            </Field>

            <Field
              name="notes"
              type="text"
              component={renderTextarea}
              label="Notes"
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
const mapStateToProps = (state) => {
  return {
    websites: state.websites
  }
}
const mapDispatchToProps = (dispatch) => ({
  startAddJob: (job) => dispatch(startAddJob(job)),
  startSetWebsites: (websites) => dispatch(startSetWebsites(websites))

});
NewJob = connect(mapStateToProps, mapDispatchToProps)(NewJob)

export default reduxForm({
  form: 'jobForm',
  validate
})(NewJob)