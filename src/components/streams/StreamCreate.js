import React from "react"
import { reduxForm, Field, submit } from "redux-form"
import { connect } from "react-redux"

/* Configs */
/* Elements */
import { Label, Form, Button, Header as HeaderEl, Segment, Input } from "semantic-ui-react"

/* Action Creators */
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
        <Label basic color="red" pointing>
          {error}
        </Label>
      )
    }
  }

  renderInput({ input, label, meta }) {
    return (
      <Form.Field>
        <label>{label}</label>
        <Input {...input} />
        {this.renderError(meta)}
      </Form.Field>
    )
  }

  renderSubmitButton() {
    // if (this.state.formSubmitting) {
    //   return (
    //     <Button loading disabled primary>
    //       Submit
    //     </Button>
    //   )
    // }
    const { invalid, submitting } = this.props
    console.log(submitting)

    return (
      <Button primary disabled={submitting || invalid}>
        Submit
      </Button>
    )
  }

  onSubmit(values) {
    this.props.createStream(values)
  }

  render() {
    return (
      <Segment size="large" color="green">
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <HeaderEl as="h3" style={{ marginBottom: "2rem" }}>
            Create a New Stream
          </HeaderEl>
          <Field name="title" component={this.renderInput} label="Stream Title" />
          <Field name="description" component={this.renderInput} label="Stream Description" />
          {this.renderSubmitButton()}
        </Form>
      </Segment>
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

const mapStateToProps = state => {
  return state
}

const formWrapped = reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate)

export default connect(mapStateToProps, {
  createStream
})(formWrapped)
