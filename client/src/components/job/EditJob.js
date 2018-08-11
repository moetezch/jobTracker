import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from 'react-bulma-components'
import { reduxForm, Field } from 'redux-form'
import { startEditJob, startSetJobs, startRemoveJob } from '../../actions/jobs'
import moment from 'moment'
import country_list from '../../utils/countries'
import validate from '../../utils/validateJob'
import renderDate from '../form/SingleDatePicker'
import renderInput from '../form/RenderInput'
import renderTextarea from '../form/RenderTextarea'
import renderSelect from '../form/RenderSelect'

class EditJob extends Component {
  state = { open: false }
  componentDidMount() {
    this.props.startSetJobs()
    this.handleInitialize();
  }
  handleInitialize() {
  
    let initData={}
    if (this.props.job) {
    //  console.log(this.props.job.reply);
      
    //  console.log(moment.unix(this.props.job.reply).isValid() ?moment.unix(this.props.job.reply).format():moment())
      
      initData = {
        jobTitle:this.props.job.jobTitle,
        date: moment.unix(this.props.job.date).format(),
        type: this.props.job.type,
        company: this.props.job.company,
        country: this.props.job.country,
        foundOn: this.props.job.foundOn,
        link: this.props.job.link,
        notes:this.props.job.notes,
        reply:moment.unix(this.props.job.reply).isValid() ?moment.unix(this.props.job.reply).format():'',
        interview:moment.unix(this.props.job.interview).isValid() ?moment.unix(this.props.job.interview).format():''
        }
    }else {
      initData = {
        jobTitle:"",
        date: "",
        type: "",
        company: "",
        country: "",
        foundOn: "",
        link:"",
        notes:"",
        reply:"",
        interview:""
        };
    }

  
    this.props.initialize(initData);
  }
  onSubmit = (job) => {

    job.date = moment(job.date).unix()
    moment(job.reply).isValid() ?job.reply = moment(job.reply).unix():job.reply ='Hopefully soon'
    moment(job.interview).isValid()?
      (job.interview = moment(job.interview).unix(),
      job.status="interviewing"
    )
      
      :job.interview ='Not Yet'
   this.props.startEditJob(this.props.match.params.id, job)

   this.props.history.push('/jobs/applied');
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
  render() {
    const { handleSubmit } = this.props

    return (
      <section className="section">
        <div className="container">
          <Link className="button is-light" to="/jobs/applied"><i className="fas fa-arrow-left "></i></Link>
          <h2 className="is-size-2">{this.props.job.jobTitle} @ {this.props.job.company}</h2>
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
          <option value="Other">Other</option>
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
                  <div className="modal-card">
                    <header className="modal-card-head">
                      <p className="modal-card-title">Are you sure you want to delete this job ?</p>
                    </header>

                    <footer className="modal-card-foot">
                      <button className="button is-success" onClick={() => {
                        this.props.startRemoveJob({ id: this.props.job.id })
                        this.props.history.push('/jobs/applied')
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
  job: state.jobs.find((job) => job.id === props.match.params.id),
  websites: state.websites
})

const mapDispatchToProps = (dispatch) => ({
  startEditJob: (id, job) => dispatch(startEditJob(id, job)),
  startSetJobs: () => dispatch(startSetJobs()),
  startRemoveJob: (id) => dispatch(startRemoveJob(id))
});
EditJob = connect(mapStateToProps, mapDispatchToProps)(EditJob)

export default reduxForm({
  form: 'jobForm',
  validate
})(EditJob)