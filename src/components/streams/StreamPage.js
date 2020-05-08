import React, { Fragment } from "react";
import { connect } from "react-redux";
import flv from "flv.js";

import { fetchStream } from "../../actions";

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
    let requestedStreamId = this.props.match.params.id;
    this.props.fetchStream(requestedStreamId);
  }

  componentDidUpdate() {
    if (this.props.loadedStream.data)
      this.createFlvPlayer(this.props.loadedStream.data.id);
  }

  createFlvPlayer(streamId) {
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
        <HeaderEl size="large"> {this.props.loadedStream.data.title} </HeaderEl>

        <Item>
          <Item.Content>
            <Item.Image
              size="tiny"
              src={this.props.loadedStream.user.imageUrl}
            />

            <Item.Header> {this.props.loadedStream.user.fullName} </Item.Header>
          </Item.Content>
        </Item>

        <HeaderEl>Description</HeaderEl>
        <p>{this.props.loadedStream.data.description}</p>
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
    if (
      this.props.loadedStream.fetching === false &&
      this.props.loadedStream.found
    ) {
      return this.showStream();
    } else if (
      this.props.loadedStream.fetching === false &&
      !this.props.loadedStream.found
    ) {
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

const mapStateToProps = ({ stream }) => {
  let loadedStream = stream.loadedStream;

  return { loadedStream };
};

export default connect(mapStateToProps, { fetchStream })(StreamPage);
