import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"
import { Menu } from "semantic-ui-react"

const Header = () => {
  return (
    <Fragment>
      <Menu pointing secondary size="large">
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item name="features">
          <Link to="/streams/create">Create New Stream</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/groups/create">Create New Group</Link>
        </Menu.Item>
        <Menu.Item>
          <GoogleAuth />
        </Menu.Item>
      </Menu>
    </Fragment>
  )
}

export default Header
