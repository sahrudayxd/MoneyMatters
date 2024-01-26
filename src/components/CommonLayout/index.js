import Header from "../Header";
import SidebarOptions from "../SidebarOptions";
import Logout from "../Logout";

import "./index.css";

const CommonLayout = ({ children }) => {
  return (
    <div className="common-layout">
      <div className="desktop-sidebar">
        <SidebarOptions />
        <Logout />
      </div>
      <div className="header-path-container">
        <Header />
        <div className="path-container">{children}</div>
      </div>
    </div>
  );
};

export default CommonLayout;
