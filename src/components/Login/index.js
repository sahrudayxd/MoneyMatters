import { Component } from "react";

import WebsiteLogo from "../WebsiteLogo";

import "./index.css";

class Login extends Component {
  state = { username: "", password: "" };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSampleAdminClick = () => {
    this.setState({ username: "admin@gmail.com", password: "Admin@123" });
  };

  onSampleUserClick = () => {
    this.setState({ username: "jane.doe@gmail.com", password: "janedoe@123" });
  };

  renderUsernameField = () => {
    const { username } = this.state;

    return (
      <div className="label-input-conatiner">
        <label htmlFor="username" className="login-label">
          USERNAME
        </label>
        <input
          id="username"
          value={username}
          className="login-input"
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </div>
    );
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <div className="label-input-conatiner">
        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="login-input"
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </div>
    );
  };

  onSubmitForm = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    console.log(username, password);
  };

  render() {
    return (
      <div className="login-flex-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <div className="login-website-logo">
            <WebsiteLogo />
          </div>
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <div className="sample-buttons">
            <button
              type="button"
              onClick={this.onSampleAdminClick}
              className="sample-button"
            >
              Sample ADMIN
            </button>
            <button
              type="button"
              onClick={this.onSampleUserClick}
              className="sample-button"
            >
              Sample USER
            </button>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
