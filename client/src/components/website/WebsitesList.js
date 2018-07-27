import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../actions/websites'

class WebsitesList extends Component {
  componentDidMount() {
    this.props.startSetWebsites()

  }
  render() {
    return (
      <div className="container">
      <Link className='button is-primary is-pulled-right' to="websites/new" style={{marginBottom:"15px"}}>Add a New Website</Link>
  
      <section>
       


          {
            this.props.websites.length === 0 ? (
              <div className="">
                <span>No Websites</span>
              </div>
            ) : (
              <table className="table is-striped is-bordered is-hoverable is-fullwidth has-text-centered">
              <thead>
              <tr>
               
                <th title="name">Name</th>
                <th title="url">URL</th>
                <th title="edit">Edit</th>
                <th title="delete">Delete</th>

              </tr>
            </thead>
              <tbody>

                  {
                    this.props.websites.map((website, index) => {


                      return (
                        <tr key={website.id}>
                      
                        <td>{website.name}</td>
                        <td>{website.url}</td>
                        <td><Link className="button is-light" to={`websites/edit/${website.id}`}>Edit</Link></td>
                        <td className="button is-danger" onClick={()=>{
                          this.props.startRemoveWebsite({id:website.id})
                          this.props.startSetWebsites()
                        }}>Delete</td>
                    </tr>
                      )
                    })
                  }

                  </tbody>
                  </table>

              )
          }
          </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    websites: state.websites
  }
}

export default connect(mapStateToProps, actions)(WebsitesList)