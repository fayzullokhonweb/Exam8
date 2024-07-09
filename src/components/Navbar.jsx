import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { Link } from "react-router-dom";
import WeatherLocation from "./WeatherLocation";

function Navbar() {
  let { user } = useSelector((state) => state.user);
  let dispetch = useDispatch();
  console.log(user);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "winter"
  );

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "winter" ? "dracula" : "winter"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="bg-base-100 mb-3">
      <div className="navbar align-element ">
        <div className="flex-1">
          <Link to="/" className="btn btn-outline border-none text-xl">
            MyKitchen
          </Link>
        </div>
        <div className="flex-none items-center gap-3">
          <div className=" hidden sm:block">
            <WeatherLocation />
          </div>
          <div>{<p className="cursor-pointer">{user.displayName}</p>}</div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="justify-between">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create">Createa Recipe</Link>
              </li>
              <li>
                <Link to="/stats">Statistics</Link>
              </li>
              <li>
                <Link to="/store">Store</Link>
              </li>
              <li>
                <button onClick={handleToggle}>Change theme</button>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispetch(logout(user));
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Navbar;
