import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { startEditWebsite,startSetWebsites } from '../../actions/websites'
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

class EditWebsite extends Component {
  componentDidMount() {
    this.props.startSetWebsites()
   this.handleInitialize();
   console.log(this.props.website);
   

  }
  handleInitialize() {
  
    let initData={}
    if (this.props.website) {
      initData = {
        name:this.props.website.name,
        url: this.props.website.url
        }
    }else {
      initData = {
        name:"",
        url: ""
        };
    }

  
    this.props.initialize(initData);
  }
  onSubmit = (website) => {
    this.props.startEditWebsite(this.props.match.params.id,website)
    this.props.history.push('/websites');
    console.log(this.props.website);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div>
      <section className="column container">
          <h2 className="is-size-2">Edit Website</h2>
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
    <button className="button" type="submit" >Update</button>
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

const mapStateToProps = (state,props) => ({
  website: state.websites.find((website) => website.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  startEditWebsite: (id,website) => dispatch(startEditWebsite(id,website)),
  startSetWebsites :() => dispatch(startSetWebsites())
});
EditWebsite = connect(mapStateToProps, mapDispatchToProps)(EditWebsite)

export default reduxForm({
  form: 'websiteForm',
  validate
})(EditWebsite)