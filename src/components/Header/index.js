import { Component } from "react";
import { withRouter } from "react-router-dom";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";

import { IoMenu, IoCloseSharp } from "react-icons/io5";

import "./index.css";
import Sidebar from "../Sidebar";
import AddTransaction from "../AddUpdateTransaction/addTransaction";

class Header extends Component {
  renderAddTransactionButton = (closeMenu) => {
    return (
      <Popup
        trigger={
          <button className="add-transaction-button" onClick={closeMenu}>
            + Add Transaction
          </button>
        }
        modal
      >
        {(close) => {
          return <AddTransaction close={close} />;
        }}
      </Popup>
    );
  };

  renderMobilePopupMenu = () => (
    <div className="mobile-menu-icon">
      <Popup
        trigger={
          <button className="open-menu-button" type="button">
            <IoMenu size={32} />
          </button>
        }
        modal
      >
        {(closeMenu) => (
          <div className="mobile-menu-popup">
            <div className="close-icon-container">
              <button
                className="close-menu-button"
                type="button"
                onClick={closeMenu}
              >
                <IoCloseSharp size={32} />
                {` `}
              </button>
            </div>

            <Sidebar />
          </div>
        )}
      </Popup>
    </div>
  );

  renderHeaderAddTransaction = () => {
    const userId = Cookies.get("money_matters_id");
    const { match } = this.props;
    const { path } = match;

    const navbarContent = () => {
      switch (path) {
        case "/dashboard":
          return "Dashboard";
        case "/transactions":
          return "Transactions";
        case "/profile":
          return "Account";
        default:
          return "";
      }
    };

    return (
      <>
        <h1 className="navbar-title">{navbarContent()}</h1>
        {userId !== "3" && this.renderAddTransactionButton()}
      </>
    );
  };

  render() {
    return (
      <>
        <div className="mobile-menu-logo-header">
          {this.renderMobilePopupMenu()}
          <img
            src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/MoneyMatters/website-logo"
            alt="money matters logo"
            className="header-logo"
          />
        </div>
        <div className="desktop-header">
          {this.renderHeaderAddTransaction()}
        </div>
      </>
    );
  }
}

export default withRouter(Header);
