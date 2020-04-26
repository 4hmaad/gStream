import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"
import { Menu } from "semantic-ui-react"

const Header = () => {
  return (
    <Fragment>
      <Menu pointing secondary size="large">
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/group/show" name="features">
          My Groups
        </Menu.Item>
        <Menu.Item as={Link} to="/settings">
          Settings
        </Menu.Item>
        <Menu.Item>
          <GoogleAuth />
        </Menu.Item>
      </Menu>
    </Fragment>
  )
}

export default Header
