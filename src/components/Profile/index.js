import { Component } from "react";

import NavBar from "../NavBar";
import Sidebar from "../Sidebar";

import "./index.css";

class Profile extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div>
          <Sidebar />
        </div>
      </>
    );
  }
}

export default Profile;
