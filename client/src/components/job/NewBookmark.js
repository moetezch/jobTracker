import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { startAddBookmark } from '../../actions/bookmarks'
import renderInput from '../form/RenderInput'
import validate from '../../utils/validateBookmark'
class NewBookmark extends Component {

  onSubmit = (bookmark) => {
   
    this.props.startAddBookmark(bookmark)
    this.props.history.push('/jobs/bookmarks');

  }


  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <section className="section">
        <div className="container">
        <Link className="button is-light" to="/jobs/bookmarks"><i className="fas fa-arrow-left "></i></Link>

          <h2 className="is-size-2"></h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>

            <Field
              name="jobTitle"
              type="text"
              component={renderInput}
              label="Job Title"
            >
            </Field>

            <Field
              name="link"
              type="text"
              component={renderInput}
              label="Link"
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

const mapDispatchToProps = (dispatch) => ({
  startAddBookmark: (bookmark) => dispatch(startAddBookmark(bookmark)),
});
NewBookmark = connect(null, mapDispatchToProps)(NewBookmark)

export default reduxForm({
  form: 'bookmarkForm',
  validate
})(NewBookmark)