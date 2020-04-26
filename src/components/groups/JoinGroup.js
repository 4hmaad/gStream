import React from "react"
import { Header as HeaderEl, Segment, Button, Form } from "semantic-ui-react"

class JoinGroup extends React.Component {
  render() {
    return (
      <Segment size="large">
        <HeaderEl as="h3"> Join Group </HeaderEl>
        <Form>
          <Form.Input placeholder="Enter group invitation id" />
          <Button primary> Join </Button>
        </Form>
      </Segment>
    )
  }
}

export default JoinGroup
