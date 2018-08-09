import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Modal} from 'react-bulma-components'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { startEditWebsite,startSetWebsites,startRemoveWebsite } from '../../actions/websites'
import validate from '../../utils/validateWebsite'
import renderInput from '../form/RenderInput'


class EditWebsite extends Component {
  state = { open: false }
  componentDidMount() {
   
    this.props.startSetWebsites()
   this.handleInitialize();
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
    this.props.history.push('/websites')
  }

  render() {
    const { handleSubmit} = this.props

    return (
      
      <section className="section">
      <div className="container">
      <Link className="button is-light" to="/websites"><i className="fas fa-arrow-left "></i></Link>
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
    <div className="buttons">
    <button className="button is-primary" type="submit" >
     <span>Update</span>
    <span className="icon is-small">
      <i className="fas fa-sync"></i>
    </span></button>
    <button className="button is-danger" type="button" onClick={() => this.setState({ open: true })}>
    <span>Delete</span>
    <span className="icon is-small">
      <i className="fas fa-times"></i>
    </span>
  </button>
  <Modal show={this.state.open} onClose={() => this.setState({ open: false })} className="modal">
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Are you sure you want to delete this website ?</p>
    </header>

    <footer className="modal-card-foot">
      <button className="button is-success" onClick={() => {
        this.props.startRemoveWebsite({ id: this.props.website.id})
        this.props.history.push('/websites')
      }}>Confirm
      </button>
      <button className="button" onClick={() => this.setState({ open: false })}>Cancel</button>
    </footer>
  </div>
  </Modal>
  </div>
  </form>

  </div>

    </section>
     
    );
  }
}

const mapStateToProps = (state,props) => ({
  website: state.websites.find((website) => website.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  startEditWebsite: (id,website) => dispatch(startEditWebsite(id,website)),
  startSetWebsites :() => dispatch(startSetWebsites()),
  startRemoveWebsite: (id)=> dispatch(startRemoveWebsite(id))
});
EditWebsite = connect(mapStateToProps, mapDispatchToProps)(EditWebsite)

export default reduxForm({
  form: 'websiteForm',
  validate
})(EditWebsite)