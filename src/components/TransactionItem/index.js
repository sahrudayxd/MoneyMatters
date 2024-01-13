import { parseISO, format } from "date-fns";

import { PiArrowCircleDownThin, PiArrowCircleUpThin } from "react-icons/pi";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";

import "./index.css";

const dummyUserNames = [
  "Arlene McCoy",
  "Ralph Edwards",
  "Darlene Robertson",
  "Kristin Watson",
  "Annette Black",
  "Robert Fox",
  "Jacob Jones",
  "Albert Flores",
  "Esther Howard",
  "Theresa Webb",
  "Kathryn Murphy",
  "Brooklyn Simmons",
];

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const renderTransactionTypeIcon = (type) => {
  if (type === "credit") {
    return <PiArrowCircleUpThin size={36} color="#16DBAA" />;
  } else {
    return <PiArrowCircleDownThin size={36} color="#FE5C73" />;
  }
};

const renderRandomUserImageName = () => {
  const randomIndex = Math.floor(Math.random() * dummyUserNames.length);
  const userName = dummyUserNames[randomIndex];
  const userImg = `https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/MoneyMatters/dummyUsers/${
    randomIndex + 1
  }`;

  return (
    <>
      <img
        className="transaction-user-profile"
        src={userImg}
        alt="transaction user profile"
      />
      <p className="transaction-text-style">{userName}</p>
    </>
  );
};

const renderAmount = (type, amount) => {
  if (type === "credit") {
    return (
      <p className="transaction-text-style credit-color transaction-amount">
        +₹{amount}
      </p>
    );
  } else {
    return (
      <p className="transaction-text-style debit-color transaction-amount">
        -₹{amount}
      </p>
    );
  }
};

const renderUserEditDeleteOptions = () => (
  <div className="edit-delete-buttons-container">
    <button className="edit-delete-button">
      <GoPencil size={18} color="#2D60FF" />
    </button>
    <button className="edit-delete-button">
      <MdDeleteOutline size={20} color="#FE5C73" />
    </button>
  </div>
);

const renderFullDate = (date) => {
  const formattedDate = format(parseISO(date), "dd-MM-yyyy");

  return (
    <p className="transaction-text-style desktop-devices-date">
      {formattedDate}
    </p>
  );
};

export const AdminTransactionItem = (props) => {
  const { transaction, isLastTransaction } = props;
  const { type, transactionName, amount, category, date } = transaction;

  return (
    <>
      <li className="transaction-item">
        <div className="transaction-user-profile-container">
          <div className="transaction-icon-container">
            {renderTransactionTypeIcon(type)}
          </div>
          {renderRandomUserImageName()}
        </div>
        <p className="transaction-text-style admin-transaction-name">
          {capitalizeFirstLetter(transactionName)}
        </p>
        <p className="transaction-text-style admin-transaction-category">
          {capitalizeFirstLetter(category)}
        </p>
        {renderFullDate(date)}
        {renderAmount(type, amount)}
      </li>
      {!isLastTransaction && <hr className="transaction-hr" />}
    </>
  );
};

export const UserTransactionItem = (props) => {
  const { transaction, isLastTransaction } = props;
  const { type, transactionName, amount, date, category } = transaction;
  const formattedDate = format(parseISO(date), "dd-MM-yy");

  return (
    <>
      <li className="transaction-item">
        <div className="transaction-icon-name-container">
          <div className="transaction-icon-container">
            {renderTransactionTypeIcon(type)}
          </div>
          <p className="transaction-text-style user-transaction-name">
            {capitalizeFirstLetter(transactionName)}
          </p>
        </div>
        <p className="transaction-text-style user-transaction-category">
          {capitalizeFirstLetter(category)}
        </p>
        <p className="transaction-text-style mobile-devices-date">
          {formattedDate}
        </p>
        {renderFullDate(date)}
        {renderAmount(type, amount)}
        {renderUserEditDeleteOptions()}
      </li>
      {!isLastTransaction && <hr className="transaction-hr" />}
    </>
  );
};
