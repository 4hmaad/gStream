import React, { Fragment } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import { Container, Segment, Header as HeaderEl } from "semantic-ui-react"

import StreamCreate from "./streams/StreamCreate"
import StreamEdit from "./streams/StreamEdit"
import StreamDelete from "./streams/StreamDelete"
import StreamList from "./streams/StreamList"

import { fetchUsers, fetchStreams } from "../actions"

import Header from "./Header"

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchStreams()
  }

  pageOne() {
    return "Hello from main page."
  }

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Container>
            <Header />

            <Route path="/" exact component={StreamList} />
            <Route path="/streams/create" component={StreamCreate} />
            <Route path="/streams/edit" component={StreamEdit} />
            <Route path="/streams/delete" component={StreamDelete} />
          </Container>
        </BrowserRouter>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, {
  fetchUsers,
  fetchStreams,
})(App)
