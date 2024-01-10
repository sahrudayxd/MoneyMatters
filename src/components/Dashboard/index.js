import { Component } from "react";

import NavBar from "../NavBar";
import Sidebar from "../Sidebar";
import TotalCreditDebit from "../TotalCreditDebit";

import "./index.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <NavBar />
        <div className="sidebar-dashboard-container">
          <div className="desktop-sidebar">
            <Sidebar />
          </div>
          <div className="dashboard-stats">
            <TotalCreditDebit />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
