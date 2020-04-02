import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <h1>Expense Calculator</h1>
    <NavLink to="/" activeClassName="isActive" exact={true}>
      Home
    </NavLink>
    <NavLink to="/create" activeClassName="isActive">
      Create Expense
    </NavLink>
    <NavLink to="/help" activeClassName="isActive">
      Help
    </NavLink>
  </header>
);
export default Header;
