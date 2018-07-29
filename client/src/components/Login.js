import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const Login = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box box">
      <h1 className="box-layout__title is-size-2">Job Hunt Tracker</h1>
      <p>It's time to follow your dream and get a new job</p>
      <button className="button is-primary is-medium" onClick={startLogin} style={{marginTop:"2rem"}}>Login with Google</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(Login);
