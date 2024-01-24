import { Component } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

import Failure from "../Failure";
import Header from "../Header";
import SidebarOptions from "../SidebarOptions";
import Logout from "../Logout";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Profile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: {},
    errorDetails: "",
  };

  componentDidMount() {
    if (this.state.apiStatus === apiStatusConstants.initial) {
      this.fectchProfileDetails();
    }
  }

  fectchProfileDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    try {
      const userId = Cookies.get("money_matters_id");
      const response = await fetch(
        `https://bursting-gelding-24.hasura.app/api/rest/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": userId,
          },
        }
      );
      const data = await response.json();
      const userDetails = data.users[0];
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileDetails: {
          city: userDetails.city,
          country: userDetails.country,
          dateOfBirth: userDetails.date_of_birth,
          email: userDetails.email,
          id: userDetails.id,
          name: userDetails.name,
          permanentAddress: userDetails.permanent_address,
          postalCode: userDetails.postal_code,
          presentAddress: userDetails.present_address,
        },
      });
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        errorDetails: error,
      });
    }
  };

  renderInProgressView = () => (
    <div className="profile-failure-loader">
      <ThreeDots />
    </div>
  );

  renderProfileDetails = () => {
    const { profileDetails } = this.state;
    const {
      name,
      email,
      dateOfBirth,
      permanentAddress,
      presentAddress,
      city,
      postalCode,
    } = profileDetails;

    const randomIndex = Math.ceil(Math.random() * 12);

    const validateText = (str) => {
      if (str === null) {
        return "--";
      } else return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
      <div className="profile-details">
        <div className="desktop-flex-container">
          <div className="user-name-img">
            <div className="profile-user-name">
              <h1 className="profile-title">Name</h1>
              <p className="profile-des">{validateText(name)}</p>
            </div>
            <img
              src={`https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/MoneyMatters/dummyUsers/${randomIndex}`}
              alt="user img"
              className="profile-image"
            />
          </div>
          <div className="profile-detail-item">
            <h1 className="profile-title">Date of Birth</h1>
            <p className="profile-des">{dateOfBirth}</p>
          </div>
        </div>

        <div className="desktop-flex-container">
          <div className="profile-detail-item">
            <h1 className="profile-title">Email</h1>
            <p className="profile-des">{validateText(email)}</p>
          </div>
          <div className="profile-detail-item">
            <h1 className="profile-title">Password</h1>
            <p className="profile-des">************</p>
          </div>
        </div>

        <div className="desktop-flex-container">
          <div className="profile-detail-item">
            <h1 className="profile-title">Permanent Address</h1>
            <p className="profile-des">{validateText(permanentAddress)}</p>
          </div>
          <div className="profile-detail-item">
            <h1 className="profile-title">Present Address</h1>
            <p className="profile-des">{validateText(presentAddress)}</p>
          </div>
        </div>

        <div className="desktop-flex-container">
          <div className="profile-detail-item">
            <h1 className="profile-title">City</h1>
            <p className="profile-des">{validateText(city)}</p>
          </div>
          <div className="profile-detail-item">
            <h1 className="profile-title">Postal Code</h1>
            <p className="profile-des">{validateText(postalCode)}</p>
          </div>
        </div>

        <div className="profile-detail-item">
          <h1 className="profile-title">Country</h1>
          <p className="profile-des">India</p>
        </div>
      </div>
    );
  };

  renderFailureView = () => (
    <div className="profile-failure-loader">
      <Failure fetchApi={this.fectchProfileDetails} />
    </div>
  );

  renderApiStatusView = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderInProgressView();
      case apiStatusConstants.success:
        return this.renderProfileDetails();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="profile">
        <div className="desktop-sidebar">
          <SidebarOptions />
          <Logout />
        </div>
        <div className="profile-header-container">
          <Header />
          <div className="profile-padding-container">
            {this.renderApiStatusView()}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
