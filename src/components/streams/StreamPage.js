import React, { Fragment } from "react";
import { connect } from "react-redux";

/* Elements */
import {
  Segment,
  Embed,
  Grid,
  Header as HeaderEl,
  Loader,
  Dimmer,
  Divider,
} from "semantic-ui-react";

class StreamPage extends React.Component {
  renderStream() {
    return (
      <Fragment>
        <HeaderEl size="huge"> {this.props.stream.title} </HeaderEl>
        <Embed placeholder="/images/image-16by9.png" source="url" />
        <Divider />

        <HeaderEl>Description</HeaderEl>
        <p>{this.props.stream.description}</p>
      </Fragment>
    );
  }

  renderError() {
    return <HeaderEl as="h3"> Stream deleted or doesn't exist </HeaderEl>;
  }

  renderLoader() {
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    );
  }

  renderContent = () => {
    if (this.props.stream.isLoading === false && this.props.stream.id) {
      return this.renderStream();
    } else if (this.props.stream.isLoading === false && !this.props.stream.id) {
      return this.renderError();
    }

    return this.renderLoader();
  };

  render() {
    return (
      <Grid.Column width="16">
        <Segment size="small" color="blue">
          {this.renderContent()}
        </Segment>
      </Grid.Column>
    );
  }
}

const mapStateToProps = ({ streams }, { match }) => {
  if (streams.length) {
    const stream = streams.find((stream) => stream.id === match.params.id);
    return { stream: { ...stream, isLoading: false } };
  }

  return { stream: { isLoading: true } };
};

export default connect(mapStateToProps)(StreamPage);
