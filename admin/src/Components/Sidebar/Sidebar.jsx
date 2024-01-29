import React from "react";

import "./Sidebar.css";
import { FaCartArrowDown } from "react-icons/fa";
import Color from "./color_/Color";
import Price from "./Price/Price";
function Sidebar({onSearch}) {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>
            <FaCartArrowDown />
          </h1>
        </div>
        <Price onSearch={onSearch}/>
        <Color onSearch={onSearch}/>
      </section>
    </>
  );
}

export default Sidebar;
