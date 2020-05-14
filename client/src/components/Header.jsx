import React from "react";
import { NavLink } from "react-router-dom";
import CookieManager from "../services/CookieManager";

const Header = (props) => {
  // Remove routes that should not be in menu
  const pages = Object.keys(props.pages)
    .filter((key) => props.pages[key].menu)
    .map((key) => props.pages[key]);

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

    return entries;
  };

  return (
    <header className="header mb--xl">
      <nav>
        <NavLink
          exact={true}
          to={`${process.env.PUBLIC_URL}`}
          className="header__brand"
        >
          Saint Jacques
        </NavLink>
        <ul className="header__menu">{menu()}</ul>
      </nav>
      {props.isLogged && (
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
      )}
      {!props.isLogged && (
        <button
          onClick={() => {
            window.location.replace(
              `${process.env.PUBLIC_URL}${props.pages.signIn.path}`
            );
          }}
        >
          {props.pages.signIn.label}
        </button>
      )}
    </header>
  );
};

export default Header;
