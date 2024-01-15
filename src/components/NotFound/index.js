import { Component } from "react";

import Sidebar from "../Sidebar";

import "./index.css";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <div className="desktop-sidebar">
          <Sidebar />
        </div>
        NotFound
      </div>
    );
  }
}

export default NotFound;
