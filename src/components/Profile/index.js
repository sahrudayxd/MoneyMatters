import { Component } from "react";

import Header from "../Header";
import Sidebar from "../Sidebar";

import "./index.css";

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="desktop-sidebar">
          <Sidebar />
        </div>
        <div className="profile-header-container">
          <Header />
          Profile
        </div>
      </div>
    );
  }
}

export default Profile;
