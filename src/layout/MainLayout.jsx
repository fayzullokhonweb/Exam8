import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="mb-10">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;