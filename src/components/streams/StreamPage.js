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
  Item,
} from "semantic-ui-react";

class StreamPage extends React.Component {
  render() {
    if (this.props.stream) {
      return (
        <Fragment>
          <Grid.Column width="16">
            <Segment size="small" color="blue">
              <HeaderEl size="huge"> {this.props.stream.title} </HeaderEl>
              <Embed placeholder="/images/image-16by9.png" source="url" />
              <Divider />

              <HeaderEl>Description</HeaderEl>
              <p>{this.props.stream.description}</p>
            </Segment>
          </Grid.Column>
        </Fragment>
      );
    }

    return "Loading...";
  }
}

const mapStateToProps = ({ streams }, { match }) => {
  const stream = streams.find((stream) => stream.id === match.params.id);

  return { stream };
};

export default connect(mapStateToProps)(StreamPage);
