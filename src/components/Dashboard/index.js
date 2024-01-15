import { Component } from "react";

import Header from "../Header";
import Sidebar from "../Sidebar";
import TotalCreditDebit from "../TotalCreditDebit";
import LastThreeTransactions from "../LastThreeTransactions";

import "./index.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="desktop-sidebar">
          <Sidebar />
        </div>
        <div className="dashboard-header-container">
          <Header />
          <div className="dashboard-container">
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
