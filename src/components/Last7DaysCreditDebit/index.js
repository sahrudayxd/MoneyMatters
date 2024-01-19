import { Component } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import React from "react";
import { Chart } from "react-google-charts";

import Failure from "../Failure";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

function processTransactionData(transactionsData) {
  const creditDebitTotals = [["Date", "Credit", "Debit"]];

  const dayWiseTotals = {};

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  transactionsData.forEach((transaction) => {
    const date = new Date(transaction.date);
    const day = date.getDate();

    if (!dayWiseTotals[day]) {
      dayWiseTotals[day] = { credit: 0, debit: 0 };
    }

    if (transaction.type === "credit") {
      dayWiseTotals[day].credit += transaction.sum;
    } else if (transaction.type === "debit") {
      dayWiseTotals[day].debit += transaction.sum;
    }
  });

  const currentDate = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);

    const day = date.getDate();
    const dayName = dayNames[date.getDay()];
    const totals = dayWiseTotals[day] || { credit: 0, debit: 0 };

    creditDebitTotals.push([`${day} ${dayName}`, totals.credit, totals.debit]);
  }

  return creditDebitTotals;
}

class Last7DaysCreditDebit extends Component {
  state = {
    chartData: [],
    apiStatus: apiStatusConstants.initial,
    errorDetails: null,
  };

  componentDidMount() {
    this.fectch7DaysCreditDebitApi();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.fectch7DaysCreditDebitApi();
  };

  fectch7DaysCreditDebitApi = () => {
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
        "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin";
      const response = await fetch(adminUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "admin",
        },
      });
      const data = await response.json();
      const chartData = processTransactionData(
        data.last_7_days_transactions_totals_admin
      );

      this.setState({
        chartData,
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
        "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";
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
      const chartData = processTransactionData(
        data.last_7_days_transactions_credit_debit_totals
      );

      this.setState({
        chartData,
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
    <div className="seven-days-credit-debit-loader">
      <ThreeDots />
    </div>
  );

  renderCreditDebitChart = () => {
    const { chartData } = this.state;
    const isMobile =
      window.innerWidth <= 560 ||
      (window.innerWidth >= 768 && window.innerWidth <= 889);
    return (
      <div className="chart-container">
        <Chart
          chartType="Bar"
          width="100%"
          height="200px"
          data={isMobile ? chartData.slice(0, 4) : chartData}
        />
      </div>
    );
  };

  renderFailureView = () => (
    <div className="seven-days-credit-debit-failure">
      <Failure fetchApi={this.fectch7DaysCreditDebitApi} />
    </div>
  );

  renderApiStatusView = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderInProgressView();
      case apiStatusConstants.success:
        return this.renderCreditDebitChart();
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

export default Last7DaysCreditDebit;
