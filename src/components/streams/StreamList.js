import React from "react"
import { connect } from "react-redux"
import { Header as HeaderEl, List, Dimmer, Loader, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom"

class StreamList extends React.Component {
  renderList = () => {
    if (this.props.streams.length) {
      console.log("hashas")
      return this.props.streams.map(stream => {
        return (
          <List.Item style={{ padding: "1.2rem 0rem" }} as={Link} to={`/stream/${stream.id}`}>
            <List.Content>
              <List.Header>{stream.title}</List.Header>
              <List.Description as="a">{stream.description}</List.Description>
            </List.Content>
          </List.Item>
        )
      })
    } else {
      return (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      )
    }
  }

  render() {
    return (
      <Segment color="blue" size="large">
        <HeaderEl as="h3"> Public Streams </HeaderEl>
        <List style={{ marginTop: "2.5rem" }} divided relaxed color="blue">
          {this.renderList()}
        </List>
      </Segment>
    )
  }
}
const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(StreamList)
