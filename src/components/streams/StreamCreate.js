import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

/* Configs */
import { miniAlert } from "../../configs/SweetAlertConfig";
import history from "../../history";
/* Elements */
import {
  Label,
  Form,
  Button,
  Header as HeaderEl,
  Segment,
  Input,
} from "semantic-ui-react";

/* Action Creators */
import { createStream } from "../../actions/index";

class StreamCreate extends React.Component {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Label basic color="red" pointing>
          {error}
        </Label>
      );
    }
  }

  renderInput({ input, label, meta }) {
    return (
      <Form.Field>
        <label>{label}</label>
        <Input {...input} />
        {this.renderError(meta)}
      </Form.Field>
    );
  }

  onSubmit(values) {
    return this.props.createStream(values).then((data) => {
      miniAlert.fire({
        icon: "success",
        title: "Stream Created Successfully",
      });
      history.push(`/stream/${data.id}`);
    });
  }

  render() {
    const { submitting, invalid } = this.props;
    return (
      <Segment size="large" color="green">
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <HeaderEl as="h3" style={{ marginBottom: "2rem" }}>
            Create a New Stream
          </HeaderEl>
          <Field
            name="title"
            component={this.renderInput}
            label="Stream Title"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Stream Description"
          />
          <Button primary disabled={submitting || invalid}>
            Submit
          </Button>
        </Form>
      </Segment>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Please enter the title";
  }
  if (!values.description) {
    errors.description = "Please enter the description";
  }

  return errors;
};

const mapStateToProps = ({ auth }) => {
  let isSignedIn = auth.isSignedIn;
  return { isSignedIn };
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate,
})(StreamCreate);

export default connect(mapStateToProps, {
  createStream,
})(formWrapped);
