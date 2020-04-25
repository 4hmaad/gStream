import React, { Fragment } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import { Container, Grid } from "semantic-ui-react"
import "./styles/App.css"

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

            <Grid>
              <Grid.Row>
                <Grid.Column width="12">
                  <Route path="/" exact component={StreamList} />
                  <Route path="/streams/create" component={StreamCreate} />
                  <Route path="/streams/edit" component={StreamEdit} />
                  <Route path="/streams/delete" component={StreamDelete} />
                </Grid.Column>

                <Grid.Column width="4"></Grid.Column>
              </Grid.Row>
            </Grid>
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
