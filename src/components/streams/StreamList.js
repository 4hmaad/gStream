import React, { Fragment } from "react"
import { Header as HeaderEl, Card } from "semantic-ui-react"
import { Link } from "react-router-dom"
import "../styles/StreamList.css"

const StreamList = () => {
  return (
    <Fragment>
      <HeaderEl as="h3"> Public Streams </HeaderEl>
      <Card.Group>
        <Link to="/streams/2">
          <Card
            fluid
            color="red"
            header="CSGO Stream #1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas pharetra convallis posuere morbi leo. Augue neque gravida in fermentum et. Ac turpis egestas sed tempus urna et. Sem et tortor consequat id."
          />
        </Link>
        <Link>
          <Card
            fluid
            color="orange"
            header="Overwatch Stream #4"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas pharetra convallis posuere morbi leo. Augue neque gravida in fermentum et. Ac turpis egestas sed tempus urna et. Sem et tortor consequat id."
          />
        </Link>
        <Link>
          <Card
            fluid
            color="yellow"
            header="Class 12th Live"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas pharetra convallis posuere morbi leo. Augue neque gravida in fermentum et. Ac turpis egestas sed tempus urna et. Sem et tortor consequat id."
          />
        </Link>
      </Card.Group>
    </Fragment>
  )
}

export default StreamList
