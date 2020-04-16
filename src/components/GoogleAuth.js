import React from "react"

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: "361940973899-ce4fec8ud918b1gmr1594ccna47ec9nm.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())
        })
    })
  }

  render() {
    return (
      <button className="ui google plus button">
        <i className="google plus icon" />
        Sign in with Google
      </button>
    )
  }
}

export default GoogleAuth
