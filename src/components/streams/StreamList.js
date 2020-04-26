import React, { Fragment } from "react"
import { connect } from "react-redux"
import { Header as HeaderEl, Card, Dimmer, Loader } from "semantic-ui-react"
import { Link } from "react-router-dom"

class StreamList extends React.Component {
  renderList = () => {
    if (this.props.streams.length) {
      console.log("hashas")
      return this.props.streams.map(stream => {
        return (
          <Link to={`/stream/${stream.id}`}>
            <Card fluid color="red" header={stream.title} description={stream.description} />
          </Link>
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
      <Fragment>
        <HeaderEl as="h3"> Public Streams </HeaderEl>
        <Card.Group>{this.renderList()}</Card.Group>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(StreamList)
