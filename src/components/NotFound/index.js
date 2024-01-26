import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const NotFound = () => {
  const userId = Cookies.get("money_matters_id");

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Lost Your Way ?</h1>
      <p className="not-found-msg">
        We are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/dashboard">
        <button type="button" className="not-found-button">
          {userId === undefined ? "Sign in" : "Go To Dashboard"}
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
