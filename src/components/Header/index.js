import { Component } from "react";
import { withRouter } from "react-router-dom";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";

import AddTransaction from "../AddUpdateTransaction/addTransaction";
import MobileMenuPopup from "../MobileMenuPopup";

import { IoMenu } from "react-icons/io5";

import "./index.css";

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
        contentStyle={{ overflowY: "auto", margin: "0px" }}
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
        closeOnDocumentClick={false}
      >
        {(closeMenu) => <MobileMenuPopup closeMenu={closeMenu} />}
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
        <h1 className="header-title">{navbarContent()}</h1>
        {userId !== "3" && this.renderAddTransactionButton()}
      </>
    );
  };

  render() {
    return (
      <>
        <div className="mobile-menu-logo-header">
          <img
            src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/MoneyMatters/website-logo"
            alt="money matters logo"
            className="header-logo"
          />
          {this.renderMobilePopupMenu()}
        </div>
        <div className="desktop-header">
          {this.renderHeaderAddTransaction()}
        </div>
      </>
    );
  }
}

export default withRouter(Header);
