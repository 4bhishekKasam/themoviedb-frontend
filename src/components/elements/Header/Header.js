import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <Link to="/">
          <img src="" className="logo" alt="rmdb-logo" />
        </Link>
        <img src="" className="tmdb-logo" alt="tmdb-logo" />
      </div>
    </div>
  );
};

export default Header;
