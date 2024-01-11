import { Component } from "react";

import NavBar from "../NavBar";
import Sidebar from "../Sidebar";
import TotalCreditDebit from "../TotalCreditDebit";
import LastThreeTransactions from "../LastThreeTransactions";

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
            <h1 className="dashboard-title">Last Transactions</h1>
            <LastThreeTransactions />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
