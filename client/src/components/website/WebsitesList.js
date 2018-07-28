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
        <Link className='button is-primary is-pulled-right' to="websites/new" style={{ marginBottom: "15px" }}><i className="fas fa-plus"></i></Link>
        <section>
          {
            this.props.websites.length === 0 ? (
              <div className="">
                <span>No Websites</span>
              </div>
            ) : (
                <table className="table is-striped is-hoverable is-fullwidth">
                  <thead>
                    <tr>

                      <th title="name">Name</th>
                      <th title="url">URL</th>
                      <th title="edit"></th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      this.props.websites.map((website, index) => {


                        return (
                   
                          <tr key={website.id}>
                         
                            <td>{website.name}</td>
                            <td><a href={website.url} target="_blanc">{website.url}</a></td>
                            <td><Link className="button is-medium is-rounded is-light" to={`websites/edit/${website.id}`}>Edit</Link></td>
                            
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