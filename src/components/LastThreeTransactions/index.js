import { Component } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

import Failure from "../Failure";
import TransactionsList from "../TransactionsList";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class LastThreeTransactions extends Component {
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
        `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0`,
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
    <div className="last-three-transactions-failure-loader">
      <ThreeDots />
    </div>
  );

  renderLastThreeTransactions = () => {
    const { transactions } = this.state;
    return (
      <div className="last-three-transactions">
        <TransactionsList transactions={transactions} />
      </div>
    );
  };

  renderFailureView = () => (
    <div className="last-three-transactions-failure-loader">
      <Failure fetchApi={this.fectchTransactions} />
    </div>
  );

  renderApiStatusView = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderInProgressView();
      case apiStatusConstants.success:
        return this.renderLastThreeTransactions();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return <>{this.renderApiStatusView()}</>;
  }
}

export default LastThreeTransactions;
