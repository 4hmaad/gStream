import React, { Fragment } from "react";
import { connect } from "react-redux";
import flv from "flv.js";

import { fetchStream } from "../../actions";

/* Elements */
import {
  Segment,
  Feed,
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
    let streamUserProfile = this.props.loadedStream.user;

    return (
      <Fragment>
        <video style={{ width: "100%" }} ref={this.videoRef} controls></video>

        <Divider />
        <HeaderEl size="large"> {this.props.loadedStream.data.title} </HeaderEl>

        <Feed style={{ marginTop: "2rem" }}>
          <Feed.Event>
            <Feed.Label image={streamUserProfile.imageUrl} />
            <Feed.Content>
              <Feed.Summary>
                <a> {streamUserProfile.fullName}</a> started this livestream.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>

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
