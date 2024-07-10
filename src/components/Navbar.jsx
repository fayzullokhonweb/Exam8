import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import WeatherLocation from "./WeatherLocation";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

function Navbar() {
  let { user } = useSelector((state) => state.user);
  let dispetch = useDispatch();

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
                <Link to="/" className="items-center">
                  <TiHomeOutline className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create">
                  <MdOutlineCreateNewFolder className="w-4 h-4" />
                  Createa Recipe
                </Link>
              </li>
              <li>
                <Link to="/stats">
                  <IoStatsChartOutline className="w-4 h-4" />
                  Statistics
                </Link>
              </li>
              <li>
                <Link to="/store">
                  {" "}
                  <MdOutlineLocalGroceryStore className="w-4 h-4" /> Store
                </Link>
              </li>
              <li>
                <button onClick={handleToggle}>
                  {" "}
                  <CgArrowsExchange className="w-5 h-5" /> Change theme
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispetch(logout(user));
                  }}
                >
                  <MdLogout className="w-4 h-4" />
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
