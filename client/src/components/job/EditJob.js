import React, { Component } from 'react';

export default class EditJob extends Component {
  render() {
    return (
      <div>
      
      <Field
      name="reply"
      type="text"
      component={renderInput}
      label="Reply"
    >
    </Field>
    <Field
      name="interview"
      type="text"
      component={renderInput}
      label="Interview"
    >
    </Field>
    
      </div>
    );
  }
}