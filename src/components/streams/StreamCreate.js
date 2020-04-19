import React from "react"
import { reduxForm, Field } from "redux-form"
import { connect } from "react-redux"

import { createStream } from "../../actions/index"

class StreamCreate extends React.Component {
  constructor(props) {
    super(props)
    this.renderInput = this.renderInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="ui pointing red basic label">{error}</div>
    }
  }

  renderInput({ input, label, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit(values) {
    this.props.createStream(values)
  }

  render() {
    console.log(this.props)
    return (
      <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Stream Title" />
        <Field name="description" component={this.renderInput} label="Enter the Description" />
        <button className="ui blue button">Submit</button>
      </form>
    )
  }
}

const validateForm = values => {
  const errors = {}

  if (!values.title) {
    errors.title = "Please enter the title"
  }
  if (!values.description) {
    errors.description = "Please enter the description"
  }

  return errors
}

const mapStateToProps = ({ streams }) => {
  return { ...streams }
}

const formWrapped = reduxForm({
  form: "streamCreate",
  validateForm,
})(StreamCreate)

export default connect(mapStateToProps, { createStream })(formWrapped)
