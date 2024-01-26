import { Component } from "react";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";

import { IoCloseSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

import "./index.css";

class Logout extends Component {
  renderLogoutPopup = (closeLogoutPopup) => {
    const onClickLogout = () => {
      Cookies.remove("money_matters_id");

      const { history } = this.props;
      history.replace("/login");
    };

    return (
      <div className="logout-confirmation-popup">
        <div className="logout-confirmation">
          <div className="logout-icon-container">
            <FiLogOut
              size={window.innerWidth <= 768 ? 20 : 28}
              color="#D97706"
            />
          </div>
          <div className="logout-margin-container">
            <div className="logout-popup-header">
              <h1 className="logout-warning">
                Are you sure you want to Logout?
              </h1>
              <button
                className="logout-close-button"
                type="button"
                onClick={closeLogoutPopup}
              >
                <IoCloseSharp size={24} />
              </button>
            </div>

            <div>
              <button
                type="button"
                className="yes-logout-button"
                onClick={onClickLogout}
              >
                Yes, Logout
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={closeLogoutPopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderLogoutButton = () => {
    return (
      <Popup
        trigger={
          <button className="logout-popup-button">
            <FiLogOut size={26} color="#FE5C73" />
          </button>
        }
        modal
      >
        {(closeLogoutPopup) => {
          return this.renderLogoutPopup(closeLogoutPopup);
        }}
      </Popup>
    );
  };

  render() {
    const name = localStorage.getItem("money_matters_name");
    const email = localStorage.getItem("money_matters_email");

    return (
      <div className="logout">
        <div className="logout-user-details-container">
          <img
            src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/MoneyMatters/sample-profile-img"
            alt="profile"
            className="logout-profile-img"
          />
          <div>
            <p className="logout-username">{name}</p>
            <p className="logout-email">
              {email?.charAt(0).toUpperCase() + email?.slice(1)}
            </p>
          </div>
        </div>
        {this.renderLogoutButton()}
      </div>
    );
  }
}

export default withRouter(Logout);
