import Cookies from "js-cookie";

import { AdminTransactionItem, UserTransactionItem } from "../TransactionItem";

import "./index.css";

const TransactionsList = (props) => {
  const { transactions } = props;
  console.log(transactions);
  const userId = Cookies.get("money_matters_id");

  return (
    <ul className="transactions">
      {transactions.map((transaction, index) => {
        if (userId === "3") {
          return (
            <AdminTransactionItem
              key={transaction.id}
              transaction={transaction}
              isLastTransaction={transactions.length - 1 === index}
            />
          );
        } else {
          return (
            <UserTransactionItem
              key={transaction.id}
              transaction={transaction}
              isLastTransaction={transactions.length - 1 === index}
            />
          );
        }
      })}
    </ul>
  );
};

export default TransactionsList;
