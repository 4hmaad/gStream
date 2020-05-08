import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

/* Configs */
import { miniAlert, alert } from "../../configs/SweetAlertConfig";
import history from "../../history";
/* Elements */
import {
  Label,
  Form,
  Button,
  Header as HeaderEl,
  Segment,
  Input,
  Grid,
} from "semantic-ui-react";

/* Action Creators */
import { createStream, fetchStream } from "../../actions/index";

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
    if (!this.props.auth.isSignedIn)
      return miniAlert.fire({
        icon: "error",
        title: "Please sign in to create a stream",
      });

    return this.props.createStream(values).then((data) => {
      this.props.reset();
      this.props.fetchStream(data.id);

      alert
        .fire({
          icon: "success",
          title: "Stream Created Successfully",
          html: (
            <div style={{ textAlign: "left", marginTop: "0.6rem" }}>
              <p>
                Put the given <b>Server URL</b> and <b>Streaming Key</b> in your
                software's custom streaming settings and start streaming.
              </p>
              <p>
                <b>Server URL:</b> rtmp://localhost:1945/live
              </p>
              <p>
                <b>Stream Key:</b> {data.id}
              </p>
              <span style={{ color: "red" }}>
                <b>NOTE:</b> The stream key is a secret key.
              </span>
            </div>
          ),
          confirmButtonText: "Done",
        })
        .then((result) => {
          if (result.value) {
            history.push(`/stream/live/${data.id}`);
          }
        });
    });
  }

  render() {
    const { submitting, invalid } = this.props;
    return (
      <Grid.Column mobile={16} tablet={12} computer={11} largeScreen={10}>
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
      </Grid.Column>
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
  return { auth };
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate,
})(StreamCreate);

export default connect(mapStateToProps, {
  createStream,
  fetchStream,
})(formWrapped);
