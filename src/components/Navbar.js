import React, { Component } from 'react'
import { Auth } from 'aws-amplify';

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      window.location.reload();
    }
    catch(error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="logo.svg" width="40" height="35" alt="logo" /> <strong>AutoLog</strong>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            {this.props.auth.isAuthenticated && this.props.auth.user && (
              <a href="/vehicles" className="navbar-item">
                Vehicles
              </a>
            )}
            <a href="/contact" className="navbar-item">
              Contact
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              { this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello, {this.props.auth.user.username}
                </p>
              ) }
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                    <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && this.props.auth.user && (
                  <div>
                    <a href="/" onClick={this.handleLogOut} className="button is-light">
                      Log out
                    </a>
                    <a href="/changepassword" className="button is-light">
                      Change password
                    </a>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
