import { Component } from "react";
import React from "react";
import Popup from "reactjs-popup";

import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

import WebsiteLogo from "../WebsiteLogo";

import "./index.css";
// import "reactjs-popup/dist/index.css";

class NavBar extends Component {
  state = {};

  render() {
    return (
      <nav className="nav">
        <WebsiteLogo />

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
      </nav>
    );
  }
}

export default NavBar;
