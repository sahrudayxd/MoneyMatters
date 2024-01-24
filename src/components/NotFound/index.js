import { Component } from "react";

import SidebarOptions from "../SidebarOptions";

import "./index.css";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <div className="desktop-sidebar">
          <SidebarOptions />
        </div>
        NotFound
      </div>
    );
  }
}

export default NotFound;
