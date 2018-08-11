import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startSetBookmarks,startRemoveBookmark } from '../../actions/bookmarks'
import {Notification,Button } from 'react-bulma-components'
import FlipMove from 'react-flip-move'

class BookmarkedJobs extends Component {
  componentDidMount() {

  }
  renderBookmarks(){
    return this.props.bookmarks.map((bookmark) => {
      return (
        
        <Notification key={bookmark.id} style={{maxWidth:"500px",marginLeft: 'auto',marginRight: 'auto'}}>
            <a href={bookmark.link} target='_blanc'>{bookmark.jobTitle}</a>
          <Button remove onClick={()=>{            
            this.props.startRemoveBookmark({ id: bookmark.id})
            this.props.startSetBookmarks()
          }}/>
        </Notification>
        
      )
    })
  }
  render() {
    return (
      <section className="section" >
      <div className="container">
      <div>
      <Link className='button is-primary is-pulled-right' to="/jobs/bookmarks/new"><i className="fas fa-plus"></i></Link>

      </div>
      <br/>
      <div className="has-text-centered" style={{paddingTop:'15px'}}>
      <FlipMove maintainContainerHeight={true} duration={750} easing="ease-out">
        {this.renderBookmarks()}
        </FlipMove>
        </div>
        <br/>
      </div>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetBookmarks: () => dispatch(startSetBookmarks()),
  startRemoveBookmark: (id) => dispatch(startRemoveBookmark(id)),
});
const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmarks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedJobs)