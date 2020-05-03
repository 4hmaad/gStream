import React, { Fragment } from "react";
import { connect } from "react-redux";
import flv from "flv.js";

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
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.showStreamPlayer();
  }

  componentDidUpdate() {
    this.showStreamPlayer();
  }

  showStreamPlayer() {
    if (
      this.props.stream.isLoading === true ||
      !this.props.stream.id ||
      this.player
    ) {
      return false;
    }

    const id = this.props.stream.id;
    this.player = flv.createPlayer({
      type: "flv",
      isLive: true,
      url: `http://localhost:8000/live/${id}.flv`,
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  renderStream() {
    return (
      <Fragment>
        <HeaderEl size="huge"> {this.props.stream.title} </HeaderEl>

        <video style={{ width: "100%" }} ref={this.videoRef} controls></video>

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
