import { Component } from "react";

import Header from "../Header";
import Sidebar from "../Sidebar";
import TotalCreditDebit from "../TotalCreditDebit";
import LastThreeTransactions from "../LastThreeTransactions";
import Last7DaysCreditDebit from "../Last7DaysCreditDebit";

import "./index.css";

class Dashboard extends Component {
  componentDidMount() {
    document.addEventListener(
      "updateDashboardComponents",
      this.fetchDashboardAPIs
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "updateDashboardComponents",
      this.fetchDashboardAPIs
    );
  }

  fetchDashboardAPIs = () => {
    document.dispatchEvent(new Event("lastThreeTransactionsUpdate"));
    document.dispatchEvent(new Event("totalDebitCreditUpdate"));
    document.dispatchEvent(new Event("last7DaysTotalsUpdate"));
  };

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
            <h1 className="dashboard-title">Debit & Credit Overview</h1>
            <Last7DaysCreditDebit />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
