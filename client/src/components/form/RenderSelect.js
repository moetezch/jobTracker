import React from "react"


const renderSelect = ({ input, type, label, meta: { touched, error }, icon, ...custom }) => (

  <div className="field">
    <label className="label">{label}</label>
    <div className="control  has-icons-left">
      <div className="select">
        <select  {...input} {...custom} />
      </div>
      <div className="icon is-small is-left">
        <i className={icon}></i>
      </div>
    </div>
    <div className="has-text-danger" style={{ marginBottom: "20px" }}>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
export default renderSelect