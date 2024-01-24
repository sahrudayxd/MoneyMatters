import { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

import { PiWarningBold } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";

import "./index.css";

class DeleteTransaction extends Component {
  state = { inProgress: false };
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  fetchDeleteTransactionApi = async () => {
    this.setState({ inProgress: true });
    const userId = Cookies.get("money_matters_id");
    const { transactionId } = this.props;

    await fetch(
      "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": userId,
        },
        body: JSON.stringify({
          id: transactionId,
        }),
      }
    );
  };

  renderInProgressView = () => (
    <div className="transaction-in-progress">
      <h1 className="transaction-title">Deleting Transaction</h1>
      <ThreeDots />
    </div>
  );

  renderTransactionDeleteView = () => {
    const { close } = this.props;
    const onClickDeleteTransaction = async () => {
      await this.fetchDeleteTransactionApi();
      this.updatePathAPIData();
      close();
    };

    return (
      <div className="delete-transaction">
        <div className="delete-icon-container">
          <PiWarningBold
            size={window.innerWidth <= 768 ? 24 : 32}
            color="#D97706"
          />
        </div>
        <div className="delete-margin-container">
          <div className="delete-popup-header">
            <h1 className="delete-warning">Are you sure you want to Delete?</h1>
            <button
              className="delete-close-button"
              type="button"
              onClick={close}
            >
              <IoCloseSharp size={24} />
            </button>
          </div>
          <p className="delete-msg">
            This transaction will be deleted immediately. You can’t undo this
            action.
          </p>
          <div>
            <button
              type="button"
              className="yes-delete-button"
              onClick={onClickDeleteTransaction}
            >
              Yes, Delete
            </button>
            <button type="button" className="no-leave-button" onClick={close}>
              No, Leave it
            </button>
          </div>
        </div>
      </div>
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

  render() {
    const { inProgress } = this.state;

    return (
      <div className="delete-transaction-popup">
        {inProgress
          ? this.renderInProgressView()
          : this.renderTransactionDeleteView()}
      </div>
    );
  }
}

export default withRouter(DeleteTransaction);
