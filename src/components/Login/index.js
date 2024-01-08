import { Component } from "react";
import Cookies from "js-cookie";

import WebsiteLogo from "../WebsiteLogo";

import "./index.css";

class Login extends Component {
  state = { username: "", password: "", showErrorMsg: false };

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

  authenticateFailure = () => {
    this.setState({ showErrorMsg: true });
  };

  authenticateSuccess = (userId) => {
    Cookies.set("money_matters_id", userId, { expires: 30 });

    const { history } = this.props;
    history.replace("/dashboard");
  };

  onValidateUserDetails = async () => {
    const { username, password } = this.state;

    const loginUrl =
      "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });

    const data = await response.json();
    const userArr = data.get_user_id;

    if (userArr[0] === undefined) {
      this.authenticateFailure();
    } else {
      this.authenticateSuccess(userArr[0].id);
    }
  };

  onSubmitForm = (event) => {
    event.preventDefault();

    this.onValidateUserDetails();
  };

  render() {
    const { showErrorMsg } = this.state;
    return (
      <div className="login-flex-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <div className="login-website-logo">
            <WebsiteLogo />
          </div>
          {this.renderUsernameField()}
          {this.renderPasswordField()}

          {showErrorMsg && (
            <p className="error-msg">Username or Password Invalid!!!</p>
          )}
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
