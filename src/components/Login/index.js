import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import "./index.css";

class Login extends Component {
  state = { email: "", password: "", showErrorMsg: false };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSampleAdminClick = () => {
    this.setState({ email: "admin@gmail.com", password: "Admin@123" });
  };

  onSampleUserClick = () => {
    this.setState({ email: "jane.doe@gmail.com", password: "janedoe@123" });
  };

  renderEmailField = () => {
    const { email } = this.state;

    return (
      <div className="label-input-conatiner">
        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          id="email"
          value={email}
          className="login-input"
          placeholder="Email"
          onChange={this.onChangeEmail}
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

  authenticateSuccess = async (userId) => {
    Cookies.set("money_matters_id", userId, { expires: 30 });
    const { history } = this.props;

    const profileUrl = `https://bursting-gelding-24.hasura.app/api/rest/profile`;
    const profileResponse = await fetch(profileUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": userId,
      },
    });

    const profileData = await profileResponse.json();
    const userDetails = profileData.users[0];
    this.setState({
      email: userDetails.email,
      name: userDetails.name,
    });

    localStorage.setItem("money_matters_name", userDetails.name);
    localStorage.setItem("money_matters_email", userDetails.email);

    history.replace("/dashboard");
  };

  onValidateUserDetails = async () => {
    const { email, password } = this.state;

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
        email,
        password,
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
    const userId = Cookies.get("money_matters_id");
    if (userId !== undefined) {
      return <Redirect to="/dashboard" />;
    }

    const { showErrorMsg } = this.state;

    return (
      <div className="login-flex-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/MoneyMatters/website-logo"
            alt="money matters logo"
            className="login-website-logo"
          />

          {this.renderEmailField()}
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
