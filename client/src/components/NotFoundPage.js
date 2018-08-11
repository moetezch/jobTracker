import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="content container is-medium has-text-centered">
      <h1>404 NOT FOUND</h1>
      <p>Ooops... It looks that you are lost</p>
      <img src="/images/zoro.gif" alt="lost" style={{ width: '500px'}}/>
    <br/>
      <Link className="button is-primary" to="/">
        <i className="fa fa-user fa-arrow-left" style={{ marginRight: '.25em'}}></i>
         Back to Homepage
      </Link>
    </div>
    )
  }
}