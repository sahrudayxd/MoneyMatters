import { withRouter, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { HiHome } from "react-icons/hi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import "./index.css";

const SidebarOptions = (props) => {
  const { match } = props;
  const { path } = match;
  const userId = Cookies.get("money_matters_id");

  return (
    <ul className="side-bar">
      <img
        src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/MoneyMatters/website-logo"
        alt="money matters logo"
        className="sidebar-website-logo"
      />
      <li className="route">
        <Link to="/dashboard" className="route-link">
          <div
            className={
              path === "/dashboard" ? "active-route-line" : "route-line"
            }
          >{` `}</div>

          <HiHome
            size={30}
            color={path === "/dashboard" ? "#2D60FF" : "#5B73A0"}
          />
          <span
            className={
              path === "/dashboard" ? "active-route-name" : "route-name"
            }
          >
            Dashboard
          </span>
        </Link>
      </li>
      <li className="route">
        <Link to="/transactions" className="route-link">
          <div
            className={
              path === "/transactions" ? "active-route-line" : "route-line"
            }
          >{` `}</div>
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
        <Link to="/profile" className="route-link">
          <div
            className={path === "/profile" ? "active-route-line" : "route-line"}
          >{` `}</div>
          <CgProfile
            size={30}
            color={path === "/profile" ? "#2D60FF" : "#5B73A0"}
          />
          <span
            className={path === "/profile" ? "active-route-name" : "route-name"}
          >
            Profile
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default withRouter(SidebarOptions);
