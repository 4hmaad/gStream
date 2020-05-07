import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Header as HeaderEl,
  List,
  Dimmer,
  Loader,
  Segment,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  renderActionButtons = ({ id, userId }) => {
    if (this.props.auth.isSignedIn && this.props.auth.user.id === userId) {
      return (
        <Button.Group style={{ marginTop: "1rem" }} size="small">
          <Button as={Link} to={`/stream/edit/${id}`} primary>
            Edit
          </Button>
          <Button data-id={id}>Delete</Button>
        </Button.Group>
      );
    }

    return (
      <Button.Group style={{ marginTop: "1rem" }} size="small">
        <Button>Hide</Button>
      </Button.Group>
    );
  };

  renderList = () => {
    if (this.props.streams.fetching === false && !this.props.streams.error) {
      let streamsData = this.props.streams.data;

      return streamsData.map((stream) => {
        return (
          <Fragment key={stream.id}>
            <List.Item style={{ padding: "1.2rem 0rem" }}>
              <List.Content as={Link} to={`/stream/live/${stream.id}`}>
                <List.Header>{stream.title}</List.Header>
                <List.Description style={{ marginTop: "0.5rem" }}>
                  {stream.description}
                </List.Description>
              </List.Content>
              {this.renderActionButtons(stream)}
            </List.Item>
          </Fragment>
        );
      });
    } else {
      return (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      );
    }
  };

  render() {
    return (
      <Segment color="blue" size="large">
        <HeaderEl as="h3"> Public Streams </HeaderEl>
        <List style={{ marginTop: "2.5rem" }} divided relaxed color="blue">
          {this.renderList()}
        </List>
      </Segment>
    );
  }
}

const mapStateToProps = ({ auth, stream }) => {
  let streams = stream.streams;

  return { auth, streams };
};

export default connect(mapStateToProps)(StreamList);
