import { Component } from "react";

import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

import NavBar from "../NavBar";
import Sidebar from "../Sidebar";
import Failure from "../Failure";
import TransactionsList from "../TransactionsList";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Transactions extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    transactions: [],
    errorDetails: "",
  };

  componentDidMount() {
    this.fectchTransactions();
  }

  fectchTransactions = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    try {
      const userId = Cookies.get("money_matters_id");
      const response = await fetch(
        `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": userId,
          },
        }
      );
      const data = await response.json();
      this.setState({
        apiStatus: apiStatusConstants.success,
        transactions: data.transactions.map((transaction) => ({
          amount: transaction.amount,
          category: transaction.category,
          date: transaction.date,
          id: transaction.id,
          transactionName: transaction.transaction_name,
          type: transaction.type,
          userId: transaction.user_id,
        })),
      });
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        errorDetails: error,
      });
    }
  };

  renderInProgressView = () => (
    <div className="transactions-failure-loader">
      <ThreeDots />
    </div>
  );

  renderTableHeaders = () => {
    const userId = Cookies.get("money_matters_id");

    return (
      <div className="transaction-table-headers">
        {userId === "3" ? (
          <>
            <h1 className="table-header username-header">UserName</h1>
            <h1 className="table-header admin-transaction-name-header">
              Transaction Name
            </h1>
            <h1 className="table-header admin-category-header">Category</h1>
            <h1 className="table-header admin-date-header">Date</h1>
            <h1 className="table-header admin-amount-header">Amount</h1>
          </>
        ) : (
          <>
            <h1 className="table-header user-transaction-name-header">
              Transaction Name
            </h1>
            <h1 className="table-header user-category-header">Category</h1>
            <h1 className="table-header user-date-header">Date</h1>
            <h1 className="table-header user-amount-header">Amount</h1>
          </>
        )}
      </div>
    );
  };

  renderTransactions = () => {
    const { transactions } = this.state;
    return (
      <div className="transactions-table">
        {this.renderTableHeaders()}
        <hr className="transaction-hr" />
        <TransactionsList transactions={transactions} />
      </div>
    );
  };

  renderFailureView = () => (
    <div className="transactions-failure-loader">
      <Failure fetchApi={this.fectchTransactions} />
    </div>
  );

  renderApiStatusView = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderInProgressView();
      case apiStatusConstants.success:
        return this.renderTransactions();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="transactions">
        <NavBar />
        <div className="sidebar-transactions-container">
          <div className="desktop-sidebar">
            <Sidebar />
          </div>
          <div className="transactions-stats">{this.renderApiStatusView()}</div>
        </div>
      </div>
    );
  }
}
export default Transactions;
