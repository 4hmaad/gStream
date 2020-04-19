import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import StreamCreate from "./streams/StreamCreate"
import StreamEdit from "./streams/StreamEdit"
import StreamDelete from "./streams/StreamDelete"
import StreamList from "./streams/StreamList"

import Header from "./Header"

class App extends React.Component {
  pageOne() {
    return "Hello from main page."
  }

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <Header />
          <Route path="/" component={StreamList} />
          <Route path="/streams/create" component={StreamCreate} />
          <Route path="/streams/edit" component={StreamEdit} />
          <Route path="/streams/delete" component={StreamDelete} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
