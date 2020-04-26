import React, { Fragment } from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Container, Grid, Header as HeaderEl, Button } from "semantic-ui-react"

import StreamCreate from "./streams/StreamCreate"
import StreamEdit from "./streams/StreamEdit"
import StreamDelete from "./streams/StreamDelete"
import StreamList from "./streams/StreamList"

import JoinGroup from "./groups/JoinGroup"

import { fetchUsers, fetchStreams } from "../actions"

import Header from "./Header"

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchStreams()
  }

  mainIntroText = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <HeaderEl as="h2">Welcome to gStream</HeaderEl>

        <div>
          <Button as={Link} to="/stream/create" style={{ marginRight: "1rem" }} size="small" primary>
            Go Live
          </Button>

          <Button as={Link} to="/group/create" size="small" secondary>
            Create New Group
          </Button>
        </div>
      </div>
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
                    <Route path="/stream/create" component={StreamCreate} />
                    <Route path="/stream/edit" component={StreamEdit} />
                    <Route path="/stream/delete" component={StreamDelete} />
                  </Grid.Column>

                  <Grid.Column width="4">
                    <Route path="/" exact component={JoinGroup} />
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
