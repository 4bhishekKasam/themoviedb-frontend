import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <Link to="/">
          <img
            src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
            className="tmdb-logo"
            alt="rmdb-logo"
          />
        </Link>
        {/* <img
          src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
          className="tmdb-logo"
          alt="tmdb-logo"
        /> */}
      </div>
    </div>
  );
};

export default Header;
