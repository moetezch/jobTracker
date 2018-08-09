import React from "react"
import { SingleDatePicker } from "react-dates"

const renderDate = ({ input, meta,label }) => (
  <div className="field">
  <label className="label">{label}</label>
  <div className="control">
    <SingleDatePicker
      date={input.value}
      focused={meta.active}
      onDateChange={value => input.onChange({ value })}
      onFocusChange={({ focused }) => focused ? input.onFocus(true) : input.onBlur(true)}
      isOutsideRange={() => false}
      withPortal
      readOnly={true}
    />
    <div className="has-text-danger" style={{ marginBottom: "20px" }}>
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
    </div>
  </div>
)

export default renderDate