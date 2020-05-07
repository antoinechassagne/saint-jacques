import React from "react";
import { NavLink } from "react-router-dom";
import CookieManager from "../services/CookieManager";

const Header = (props) => {
  // Remove routes that should not be in menu
  const pages = Object.keys(props.pages)
    .filter((key) => props.pages[key].menu)
    .map((key) => props.pages[key]);

  // If user isn't logged, we add signin link in menu
  if (!props.isLogged) {
    pages.push(props.pages.login);
  }

  const menu = () => {
    const entries = Object.keys(pages).map((key, index) => (
      <li key={index}>
        <NavLink
          exact={true}
          to={`${process.env.PUBLIC_URL}${pages[key].path}`}
          activeClassName="active"
        >
          {pages[key].label}
        </NavLink>
      </li>
    ));

    // If user is logged, we add signout button in menu
    if (props.isLogged) {
      // Sign out link
      entries.push(
        <button
          onClick={() => {
            CookieManager.delete("jwt");
            window.location.replace(
              `${process.env.PUBLIC_URL}${props.pages.home.path}`
            );
          }}
        >
          Se déconnecter
        </button>
      );
    }

    return entries;
  };

  return (
    <header className="header">
      <span className="header__brand">Saint Jacques</span>
      <nav>
        <ul className="header__menu">{menu()}</ul>
      </nav>
    </header>
  );
};

export default Header;
