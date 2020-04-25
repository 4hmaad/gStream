import React from "react"
import { reduxForm, Field } from "redux-form"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Label, Form, Button, Header as HeaderEl } from "semantic-ui-react"

import { createStream } from "../../actions/index"

class StreamCreate extends React.Component {
  constructor(props) {
    super(props)
    this.renderInput = this.renderInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Label as="a" basic color="red" pointing>
          {error}
        </Label>
      )
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
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <HeaderEl as="h3" style={{ marginBottom: "2rem" }}>
          Create a New Stream
        </HeaderEl>
        <Field name="title" component={this.renderInput} label="Enter Stream Title" />
        <Field name="description" component={this.renderInput} label="Enter the Description" />
        <Button primary>Submit</Button>
      </Form>
    )
  }
}

const validate = values => {
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
  validate,
})(StreamCreate)

export default connect(mapStateToProps, { createStream })(formWrapped)
