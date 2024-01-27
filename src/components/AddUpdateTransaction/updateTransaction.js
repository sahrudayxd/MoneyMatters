import { Component } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { IoCloseSharp } from "react-icons/io5";

import "./index.css";

const convertDateTime = (dateTime) => {
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = dateTime.getDate().toString().padStart(2, "0");
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

//Due to API Automatically Adds 5hours 30Minutes (API Fault)
function reduceTime330Minutes(dateTime) {
  const dateObj = new Date(dateTime);
  dateObj.setHours(dateObj.getHours() - 5);
  dateObj.setMinutes(dateObj.getMinutes() - 30);
  const options = {
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = dateObj.toLocaleString("en-US", options);

  return formattedDate;
}

const transactionStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class UpdateTransaction extends Component {
  constructor(props) {
    super(props);
    const { transactionDetails } = props;
    const { type, transactionName, amount, date, category } =
      transactionDetails;

    this.state = {
      transactionStatus: transactionStatusConstants.initial,
      transactionName,
      showErrorTransactionNameMsg: false,
      transactionType: type,
      category,
      showErrorCategoryMsg: false,
      amount,
      showErrorAmountMsg: false,
      dateTime: convertDateTime(new Date(date)),
    };
  }

  onChangeTransactionName = (event) => {
    this.setState({
      transactionName: event.target.value,
      showErrorTransactionNameMsg: false,
    });
  };

  onChangeTransactionType = (event) => {
    this.setState({
      transactionType: event.target.value,
    });
  };

  onChangeCategory = (event) => {
    this.setState({
      category: event.target.value,
      showErrorCategoryMsg: false,
    });
  };

  onChangeAmount = (event) => {
    this.setState({ amount: event.target.value, showErrorAmountMsg: false });
  };

  onChangeDateTime = (event) => {
    this.setState({ dateTime: event.target.value });
  };

  onBlurTransactionName = (event) => {
    if (event.target.value.trim() === "") {
      this.setState({ showErrorTransactionNameMsg: true });
    }
  };

  onBlurCategory = (event) => {
    if (event.target.value.trim() === "") {
      this.setState({ showErrorCategoryMsg: true });
    }
  };

  onBlurAmount = (event) => {
    if (event.target.value.trim() === "") {
      this.setState({ showErrorAmountMsg: true });
    }
  };

  renderTransactionNameView = () => {
    const { transactionName, showErrorTransactionNameMsg } = this.state;

    return (
      <>
        <label className="form-label" htmlFor="tranactionName">
          Transaction Name
        </label>
        <input
          id="tranactionName"
          value={transactionName}
          placeholder="Enter Name"
          className="form-input"
          onChange={this.onChangeTransactionName}
          onBlur={this.onBlurTransactionName}
        />
        {showErrorTransactionNameMsg && (
          <p className="error-form-msg">*Please enter Transaction Name</p>
        )}
      </>
    );
  };

  renderTransactionTypeView = () => {
    const { transactionType } = this.state;

    return (
      <>
        <label className="form-label" htmlFor="transactionType">
          Transaction Type
        </label>

        <select
          id="transactionType"
          value={transactionType}
          className="form-input"
          onChange={this.onChangeTransactionType}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </>
    );
  };

  renderCategoryView = () => {
    const { category, showErrorCategoryMsg } = this.state;

    return (
      <>
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <input
          id="transactionType"
          value={category}
          placeholder="Enter Category"
          className="form-input"
          onChange={this.onChangeCategory}
          onBlur={this.onBlurCategory}
        />
        {showErrorCategoryMsg && (
          <p className="error-form-msg">*Please enter Category</p>
        )}
      </>
    );
  };

  renderAmountView = () => {
    const { amount, showErrorAmountMsg } = this.state;

    return (
      <>
        <label className="form-label" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          value={amount}
          placeholder="Enter Amount"
          className="form-input"
          onChange={this.onChangeAmount}
          onBlur={this.onBlurAmount}
        />
        {showErrorAmountMsg && (
          <p className="error-form-msg">*Please enter Amount</p>
        )}
      </>
    );
  };

  renderDateTimeView = () => {
    const { dateTime } = this.state;

    return (
      <>
        <label className="form-label" htmlFor="dateTime">
          Date and Time
        </label>
        <input
          id="dateTime"
          type="datetime-local"
          value={dateTime}
          className="form-input"
          onChange={this.onChangeDateTime}
        />
      </>
    );
  };

  updatePathAPIData = () => {
    const { location } = this.props;
    const { pathname } = location;

    if (pathname === "/dashboard") {
      document.dispatchEvent(new Event("updateDashboardComponents"));
    } else if (pathname === "/transactions") {
      document.dispatchEvent(new Event("updateTransactions"));
    }
  };

  fetchUpdateTransactionApi = async () => {
    try {
      const { transactionName, transactionType, category, amount, dateTime } =
        this.state;
      const { transactionDetails } = this.props;
      const { id } = transactionDetails;
      const UpdateTransactionUrl =
        "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";
      const userId = Cookies.get("money_matters_id");

      const response = await fetch(UpdateTransactionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": userId,
        },
        body: JSON.stringify({
          id,
          name: transactionName,
          type: transactionType,
          category,
          amount: parseInt(amount),
          date: reduceTime330Minutes(dateTime),
        }),
      });

      const data = await response.json();

      if (typeof data.update_transactions_by_pk.id === "number") {
        this.setState(
          {
            transactionStatus: transactionStatusConstants.success,
          },
          this.updatePathAPIData
        );
      }
    } catch (error) {
      this.setState({
        transactionStatus: transactionStatusConstants.failure,
      });
    }
  };

  onSubmitTransactionFrom = (event) => {
    event.preventDefault();
    const { transactionName, category, amount } = this.state;

    if (transactionName === "" || category === "" || amount === "") {
      this.setState({
        showErrorTransactionNameMsg: transactionName.trim() === "",
        showErrorCategoryMsg: category.trim() === "",
        showErrorAmountMsg: amount.trim() === "",
      });
    } else {
      this.setState({
        transactionStatus: transactionStatusConstants.inProgress,
      });

      this.fetchUpdateTransactionApi();
    }
  };

  renderForm = () => {
    const { close } = this.props;

    return (
      <form
        className="transaction-form"
        onSubmit={this.onSubmitTransactionFrom}
      >
        <div className="form-header">
          <h1 className="form-title">Update Transaction</h1>
          <button
            className="close-transaction-button"
            type="button"
            onClick={close}
          >
            <IoCloseSharp size={24} />
          </button>
        </div>

        {this.renderTransactionNameView()}
        {this.renderTransactionTypeView()}
        {this.renderCategoryView()}
        {this.renderAmountView()}
        {this.renderDateTimeView()}

        <button type="submit" className="submit-button">
          Update Transaction
        </button>
      </form>
    );
  };

  renderInProgressView = () => (
    <div className="transaction-in-progress">
      <h1 className="transaction-title">Your Transaction is being Updated</h1>
      <ThreeDots />
    </div>
  );

  renderSuccessView = () => {
    const { close } = this.props;

    return (
      <div className="transaction-success">
        <div className="transaction-success-header">
          <h1 className="transaction-title">
            Transaction Updated Successfully
          </h1>
        </div>

        <button type="button" className="add-transaction" onClick={close}>
          Close
        </button>
      </div>
    );
  };

  renderFailureView = () => {
    const { close } = this.props;

    return (
      <div className="transaction-failure">
        <button
          className="close-transaction-button"
          type="button"
          onClick={close}
        >
          <IoCloseSharp size={24} />
        </button>
        <h1 className="transaction-title">Failed to Update Transaction</h1>
        <p className="tranaction-failure-msg">
          Something Went wrong. Please Try Again Later
        </p>
      </div>
    );
  };

  renderTranactionStatusView = () => {
    const { transactionStatus } = this.state;

    switch (transactionStatus) {
      case transactionStatusConstants.initial:
        return this.renderForm();
      case transactionStatusConstants.inProgress:
        return this.renderInProgressView();
      case transactionStatusConstants.success:
        return this.renderSuccessView();
      case transactionStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="transaction-popup">
        {this.renderTranactionStatusView()}
      </div>
    );
  }
}

export default withRouter(UpdateTransaction);
