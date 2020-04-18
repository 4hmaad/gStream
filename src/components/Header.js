import React from "react"
import { Link } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"

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
      <Link className="item" to="/streams/create">
        Create New Stream
      </Link>
      <div className="item">
        <GoogleAuth />
      </div>
    </div>
  )
}

export default Header
