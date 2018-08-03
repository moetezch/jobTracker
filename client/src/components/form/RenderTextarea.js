import React from "react"


const renderTextarea = ({ input, label, type, meta: { touched, error }, }) => (


  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <textarea {...input} type={type} className="textarea" />
      <div className="has-text-danger" style={{ marginBottom: "20px" }}>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  </div>
)
export default renderTextarea