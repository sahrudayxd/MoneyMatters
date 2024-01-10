import { Component } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class TotalCreditDebit extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    totalCredit: 0,
    totalDebit: 0,
    errorDetails: null,
  };

  componentDidMount() {
    this.fectchTotalCreditDebitApi();
  }

  fectchTotalCreditDebitApi = () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const userId = Cookies.get("money_matters_id");
    if (userId === "3") {
      this.fetchAdminApi();
    } else {
      this.fetchUserApi(userId);
    }
  };

  fetchAdminApi = async () => {
    try {
      const adminUrl =
        "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin";
      const response = await fetch(adminUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "admin",
        },
      });
      const data = await response.json();
      const credit = data.transaction_totals_admin.find(
        (transaction) => transaction.type === "credit"
      );
      const debit = data.transaction_totals_admin.find(
        (transaction) => transaction.type === "debit"
      );

      this.setState({
        totalCredit: credit.sum,
        totalDebit: debit.sum,
        apiStatus: apiStatusConstants.success,
      });
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        errorDetails: error,
      });
    }
  };

  fetchUserApi = async (userId) => {
    try {
      const userUrl =
        "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
      const response = await fetch(userUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": userId,
        },
      });
      const data = await response.json();
      const credit = data.totals_credit_debit_transactions.find(
        (transaction) => transaction.type === "credit"
      );
      const debit = data.totals_credit_debit_transactions.find(
        (transaction) => transaction.type === "debit"
      );

      this.setState({
        totalCredit: credit.sum,
        totalDebit: debit.sum,
        apiStatus: apiStatusConstants.success,
      });
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        errorDetails: error,
      });
    }
  };

  renderInProgressView = () => (
    <div className="credit-debit-loader">
      <ThreeDots />
    </div>
  );

  renderCreditDebitCards = () => {
    const { totalCredit, totalDebit } = this.state;

    return (
      <>
        <div className="total-amount-card">
          <div>
            <p className="total-credit">${totalCredit}</p>
            <p className="credit-debit-name">Credit</p>
          </div>
          <img
            className="credit-image"
            src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/MoneyMatters/dashboard-credit"
            alt="total credit"
          />
        </div>
        <div className="total-amount-card">
          <div>
            <p className="total-debit">${totalDebit}</p>
            <p className="credit-debit-name">Debit</p>
          </div>
          <img
            className="debit-image"
            src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/MoneyMatters/dashboard-debit"
            alt="total debit"
          />
        </div>
      </>
    );
  };

  renderFailureView = () => (
    <div className="failure-view">
      <p className="failure-msg">Oops! Something went wrong</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.fectchTotalCreditDebitApi}
      >
        Try Again
      </button>
    </div>
  );

  renderApiStatusView = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderInProgressView();
      case apiStatusConstants.success:
        return this.renderCreditDebitCards();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="total-credit-debit">{this.renderApiStatusView()}</div>
    );
  }
}

export default TotalCreditDebit;
