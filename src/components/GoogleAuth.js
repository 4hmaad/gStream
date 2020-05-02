import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "./../actions";
import { Button } from "semantic-ui-react";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (!isSignedIn) {
      this.props.signOut();
    } else {
      this.props.signIn(this.auth.currentUser.get().getId());
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  render() {
    if (this.props.auth.isSignedIn) {
      return (
        <Button onClick={this.onSignOutClick} color="google plus">
          <i className="google plus icon" />
          Sign out
        </Button>
      );
    } else if (this.props.auth.isSignedIn === false) {
      return (
        <Button onClick={this.onSignInClick} color="google plus">
          <i className="google plus icon" />
          Sign in with Google
        </Button>
      );
    }

    return (
      <Button color="google plus">
        <i className="google plus icon" />
        Loading...
      </Button>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
