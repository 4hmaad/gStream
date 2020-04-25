import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"
import { Menu, Button, Header as HeaderEl } from "semantic-ui-react"

const Header = () => {
  return (
    <Fragment>
      <Menu pointing secondary size="large">
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item name="features">
          <Link to="/streams/create">My Groups</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/groups/create">Settings</Link>
        </Menu.Item>
        <Menu.Item>
          <GoogleAuth />
        </Menu.Item>
      </Menu>
    </Fragment>
  )
}

export default Header
