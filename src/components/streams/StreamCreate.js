import React from "react"
import { reduxForm, Field } from "redux-form"
import { connect } from "react-redux"

/* Configs */
import database from "../../configs/FirebaseConfig"
import { alert } from "../../configs/SweetAlertConfig"

/* Elements */
import { Label, Form, Button, Header as HeaderEl } from "semantic-ui-react"

/* Action Creators */
import { fetchStreams } from "../../actions/index"

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

  async createStream({ title, description }) {
    const { userId } = this.props.auth
    const date = new Date()

    await database
      .collection("streams")
      .add({
        title,
        description,
        userId,
        date,
      })
      .then(() => {
        alert.fire({
          icon: "success",
          title: "Stream created successfully",
        })

        this.props.fetchStreams()
      })
      .catch(() => {
        alert.fire({
          icon: "error",
          title: "Something went wrong! try again",
        })
      })
  }

  onSubmit(values) {
    this.createStream(values)
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

const mapStateToProps = ({ streams, auth }) => {
  return { streams, auth }
}

const formWrapped = reduxForm({
  form: "streamCreate",
  validate,
})(StreamCreate)

export default connect(mapStateToProps, {
  fetchStreams,
})(formWrapped)
