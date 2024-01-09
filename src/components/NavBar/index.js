import { Component } from "react";
import { withRouter } from "react-router-dom";
import Popup from "reactjs-popup";

import { IoMenu, IoCloseSharp } from "react-icons/io5";

import WebsiteLogo from "../WebsiteLogo";

import "./index.css";

class NavBar extends Component {
  renderMobilePopupMenu = () => (
    <div className="mobile-menu-icon">
      <Popup trigger={<IoMenu size={32} />} modal>
        {(close) => (
          <div className="mobile-menu-popup">
            <div className="close-icon-container">
              <button
                className="close-menu-button"
                type="button"
                onClick={close}
              >
                <IoCloseSharp size={32} />
                {` `}
              </button>
            </div>

            <h1>Menu Popup</h1>
          </div>
        )}
      </Popup>
    </div>
  );

  renderDesktopHeaderView = () => {
    const { match } = this.props;
    const { path } = match;
    console.log(path);
    const navbarContent = () => {
      switch (path) {
        case "/dashboard":
          return "Dashboard";
        case "/transactions":
          return "Transactions";
        case "/account":
          return "Account";
        default:
          return "";
      }
    };

    return (
      <div className="navbar-desktop-header">
        <h1 className="navbar-title">{navbarContent()}</h1>
        <button className="add-transaction-button">+ Add Transaction</button>
      </div>
    );
  };

  render() {
    return (
      <nav className="nav">
        <div className="nav-logo">
          <WebsiteLogo />
        </div>

        {this.renderMobilePopupMenu()}
        {this.renderDesktopHeaderView()}
      </nav>
    );
  }
}

export default withRouter(NavBar);
