import { Component } from "react";

import "./index.css";
import Cookies from "js-cookie";

class TotalCreditDebit extends Component {
  componentDidMount() {
    const userId = Cookies.get("money_matters_id");

    if (userId === "3") {
      this.fetchAdminApi();
    } else {
      this.fetchUserApi(userId);
    }
  }

  fetchAdminApi = async () => {
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
    console.log(data);
  };

  fetchUserApi = async (userId) => {
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
    console.log(data);
  };

  render() {
    return <div>Honey</div>;
  }
}

export default TotalCreditDebit;
