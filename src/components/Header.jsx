import React from "react";
import { useHistory, Link } from "react-router-dom";

import Logo from "assets/logo.svg";
import useAuth from "hooks/useAuth";

function Header() {
  const history = useHistory();
  const { setLoggedOut } = useAuth();

  const handleLogout = () => {
    setLoggedOut();
    history.push("/login");
  };

  return (
    <div className="shadow sticky top-0 z-10 bg-white">
      <header className="container flex flex-wrap justify-between items-center py-3">
        <div className="w-full relative flex justify-between items-center">
          <Link to="/">
            <img src={Logo} className="h-10" alt="logo" />
          </Link>
          <div
            onClick={handleLogout}
            className="flex items-center ml-4 pl-4 cursor-pointer border-l-2 text-base-600 hover:text-primary-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <h3 className="ml-3">Logout</h3>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
