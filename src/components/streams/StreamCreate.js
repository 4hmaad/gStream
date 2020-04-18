import React from "react"
import { reduxForm, Field } from "redux-form"

class StreamCreate extends React.Component {
  constructor(props) {
    super(props)
    this.renderInput = this.renderInput.bind(this)
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="ui pointing red basic label">{error}</div>
    }
  }

  renderInput({ input, label, meta }) {
    console.log(meta)
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit(values) {
    console.log(values)
  }

  render() {
    return (
      <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Stream Title" />
        <Field name="description" component={this.renderInput} label="Enter the Description" />
        <button className="ui blue button">Submit</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = "Please enter the title"
  }
  if (!values.description) {
    errors.description = "Please enter the description"
  }

  return errors
}

export default reduxForm({
  form: "streamCreate",
  validate,
})(StreamCreate)
