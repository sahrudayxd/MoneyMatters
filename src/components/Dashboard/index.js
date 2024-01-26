import { Component } from "react";
import CommonLayout from "../CommonLayout";
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
      <CommonLayout>
        <TotalCreditDebit />
        <h1 className="dashboard-title">Last Transactions</h1>
        <LastThreeTransactions />
        <h1 className="dashboard-title">Debit & Credit Overview</h1>
        <Last7DaysCreditDebit />
      </CommonLayout>
    );
  }
}

export default Dashboard;
