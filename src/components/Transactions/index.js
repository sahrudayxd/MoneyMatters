import { Component } from "react";

import NavBar from "../NavBar";
import Sidebar from "../Sidebar";

import "./index.css";

class Transactions extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div>
          <Sidebar />
        </div>
      </>
    );
  }
}
export default Transactions;
