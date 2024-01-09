import { withRouter, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { HiHome } from "react-icons/hi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import "./index.css";

const Sidebar = (props) => {
  const { match } = props;
  const { path } = match;
  const userId = Cookies.get("money_matters_id");

  return (
    <div className="side-bar">
      <ul className="routes">
        <li className="route">
          <div
            className={
              path === "/dashboard" ? "active-route-line" : "route-line"
            }
          >{` `}</div>
          <Link to="/dashboard" className="route-link">
            <HiHome
              size={30}
              color={path === "/dashboard" ? "#2D60FF" : "#5B73A0"}
            />
            <span
              className={
                path === "/dashboard" ? "active-route-name" : "route-name"
              }
            >
              Home
            </span>
          </Link>
        </li>
        <li className="route">
          <div
            className={
              path === "/transactions" ? "active-route-line" : "route-line"
            }
          >{` `}</div>
          <Link to="/transactions" className="route-link">
            <MdAccountBalanceWallet
              size={30}
              color={path === "/transactions" ? "#2D60FF" : "#5B73A0"}
            />
            <span
              className={
                path === "/transactions" ? "active-route-name" : "route-name"
              }
            >
              {userId === "3" ? "All Transactions" : "Transactions"}
            </span>
          </Link>
        </li>
        <li className="route">
          <div
            className={path === "/profile" ? "active-route-line" : "route-line"}
          >{` `}</div>
          <Link to="/profile" className="route-link">
            <CgProfile
              size={30}
              color={path === "/profile" ? "#2D60FF" : "#5B73A0"}
            />
            <span
              className={
                path === "/profile" ? "active-route-name" : "route-name"
              }
            >
              Profile
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Sidebar);
