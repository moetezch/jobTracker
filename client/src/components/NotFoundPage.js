import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
      <h1>NotFoundPage</h1>
      <Link to="/">Go Home</Link>
      </div>
    );
  }
}