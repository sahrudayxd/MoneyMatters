import { Component } from "react";

import Logout from "../Logout";
import SidebarOptions from "../SidebarOptions";

import { IoCloseSharp } from "react-icons/io5";

import "./index.css";

class MobileMenuPopup extends Component {
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  render() {
    const { closeMenu } = this.props;
    return (
      <div className="mobile-menu-popup">
        <div>
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
          <SidebarOptions />
        </div>
        <Logout />
      </div>
    );
  }
}

export default MobileMenuPopup;
