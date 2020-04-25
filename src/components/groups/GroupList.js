import React, { Fragment } from "react"
import { Card, Icon, Header as HeaderEl } from "semantic-ui-react"

class GroupList extends React.Component {
  render() {
    return (
      <Fragment>
        <HeaderEl as="h3"> Groups </HeaderEl>
        <Card style={{ marginTop: "2rem" }}>
          <Card.Content header="About Amy" />
          <Card.Content description="asdasdasdafsadfas dsf sadfsagsag dsfgsfafg s" />
          <Card.Content extra>
            <Icon name="user" />4 Friends
          </Card.Content>
        </Card>
      </Fragment>
    )
  }
}

export default GroupList
