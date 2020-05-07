import React, { Fragment } from "react";
import { connect } from "react-redux";
import flv from "flv.js";

/* Elements */
import {
  Segment,
  Item,
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
    if (this.props.stream.isLoading || !this.props.stream.isFound) return; // because we need userId from stream

    this.createFlvPlayer();
  }

  componentDidUpdate() {
    if (this.props.stream.isLoading || !this.props.stream.isFound) return;

    this.createFlvPlayer();
  }

  createFlvPlayer() {
    const streamId = this.props.stream.id;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${streamId}.flv`,
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  showStream() {
    return (
      <Fragment>
        <video style={{ width: "100%" }} ref={this.videoRef} controls></video>

        <Divider />
        <HeaderEl size="large"> {this.props.stream.title} </HeaderEl>

        <Item>
          <Item.Image size="tiny" src={`asd`} />

          <Item.Content>
            <Item.Header>Ahmad Khan</Item.Header>
          </Item.Content>
        </Item>

        <HeaderEl>Description</HeaderEl>
        <p>{this.props.stream.description}</p>
      </Fragment>
    );
  }

  showError() {
    return <HeaderEl as="h3"> Stream deleted or doesn't exist </HeaderEl>;
  }

  showLoader() {
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    );
  }

  renderContent = () => {
    if (this.props.stream.isLoading === false && this.props.stream.isFound) {
      return this.showStream();
    } else if (this.props.stream.isLoading === false && !this.props.stream.id) {
      return this.showError();
    }

    return this.showLoader();
  };

  render() {
    console.log(this.props);
    return (
      <Grid.Column width="16">
        <Segment size="small" color="blue">
          {this.renderContent()}
        </Segment>
      </Grid.Column>
    );
  }
}

const mapStateToProps = ({ streams, auth, users }, { match }) => {
  if (streams.length) {
    const stream = streams.find((stream) => stream.id === match.params.id);
    const isStreamFound = stream ? true : false;
    return {
      stream: { ...stream, isLoading: false, isFound: isStreamFound },
      auth,
      users,
    };
  }

  return { stream: { isLoading: true, isFound: null } };
};

export default connect(mapStateToProps)(StreamPage);
