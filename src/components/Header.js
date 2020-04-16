import React, { Fragment } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    // <div class="ui inverted segment">
    <div className="ui secondary pointing menu">
      <div className="header item" to="/">
        gStream
      </div>

      <Link className="right item" to="/">
        All Streams
      </Link>
      <div class="item">
        <button class="ui google plus button">
          <i class="google plus icon" />
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Header
