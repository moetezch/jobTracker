import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import moment from 'moment';
import { startAddJob } from '../../actions/jobs'
import { startSetWebsites } from '../../actions/websites'
import country_list from '../../utils/countries'
import validate from '../../utils/validateJob'
import renderDate from '../form/SingleDatePicker'
import renderInput from '../form/RenderInput'
import renderTextarea from '../form/RenderTextarea'
import renderSelect from '../form/RenderSelect'






class NewJob extends Component {
  
  componentDidMount() {
    this.props.startSetWebsites()

    //console.log(this.props);
  }

  getCountries() {
    return country_list.map((country) => {
      return (<option value={country} key={country}>{country}</option>)

    })

  }
  getWebsites() {
    return this.props.websites.map((website) => {
      return (<option value={website.id} key={website.id}>{website.name}</option>)

    })
  }
  onSubmit = (job) => {
    job.date = moment(job.date).unix()
    this.props.startAddJob(job)
    this.props.history.push('/jobs');

  }


  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <section className="section">
        <div className="container">
        <Link className="button is-light" to="/jobs"><i className="fas fa-arrow-left "></i></Link>

          <h2 className="is-size-2">I applied for : </h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="jobTitle"
              type="text"
              component={renderInput}
              label="Job Title"
            >
            </Field>
            <Field
              name="date"
            
              component={renderDate}
              normalize={(data) => data && data.value && data.value.format()}
              format={(value) => value ? moment(value) : undefined}
              label="Date"
            >
            </Field>

            <Field
              name="type"
              type="text"
              component={renderSelect}
              label="Type"
            >
              <option />
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract"> Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
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
              {this.getWebsites()}
              <option value="Other">Other</option>
            </Field>
            <Field
              name="link"
              type="text"
              component={renderInput}
              label="Link"
            >
            </Field>
            <Field
              name="notes"
              type="text"
              component={renderTextarea}
              label="Notes"
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