import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="content-contaier">
      <div className="header__content">
        <Link to="/" className="header__title" exact={true}>
          <h1>Expense Calculator</h1>
        </Link>
        <NavLink
          className="header__title"
          to="/create"
          activeClassName="isActive"
        >
          <h3> Create Expense</h3>
        </NavLink>
      </div>
    </div>
  </header>
);
export default Header;
