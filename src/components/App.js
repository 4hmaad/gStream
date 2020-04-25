import React, { Fragment } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import { Container, Grid, Header as HeaderEl, Button } from "semantic-ui-react"

import StreamCreate from "./streams/StreamCreate"
import StreamEdit from "./streams/StreamEdit"
import StreamDelete from "./streams/StreamDelete"
import StreamList from "./streams/StreamList"

import GroupList from "./groups/GroupList"

import { fetchUsers, fetchStreams } from "../actions"

import Header from "./Header"

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchStreams()
  }

  mainIntroText() {
    return (
      <Container style={{ margin: "8rem 0rem" }}>
        <HeaderEl style={{ fontSize: "4.2rem", color: "#fff" }} as="h1">
          Welcome to gStream
        </HeaderEl>
        <HeaderEl style={{ fontSize: "1.5rem", color: "#fff" }} as="h4">
          A platform where teachers and students connect with each others
        </HeaderEl>
        <Button inverted> Create Group </Button>
      </Container>
    )
  }

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Header />
          <div className="appIntro">
            <Route path="/" exact component={this.mainIntroText} />

            <Container>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="12">
                    <Route path="/" exact component={StreamList} />
                    <Route path="/streams/create" component={StreamCreate} />
                    <Route path="/streams/edit" component={StreamEdit} />
                    <Route path="/streams/delete" component={StreamDelete} />
                  </Grid.Column>

                  <Grid.Column width="4">
                    <Route path="/" exact component={GroupList} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
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
