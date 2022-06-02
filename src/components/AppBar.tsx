import React from "react";
import { Link, NavLink } from "react-router-dom";

const AppBar = () => {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "powderblue",
        display: "flex",
        padding: "0.75rem",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}>
      <Link to='/'>
        <h1 style={{ margin: 0 }}>כיף-כפל</h1>
      </Link>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: "1rem",
          }}>
          <li>
            <NavLink
              to='/practice'
              style={{
                textDecoration: false ? "underline" : undefined,
              }}>
              <h2 style={{ margin: 0 }}>אימון</h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/test'
              style={{
                textDecoration: false ? "underline" : undefined,
              }}>
              <h2 style={{ margin: 0 }}>מבחן</h2>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppBar;
