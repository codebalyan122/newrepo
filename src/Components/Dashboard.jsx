import React from "react";
import NavbarComponent from "./Navbar";
import Aside from "./Aside";
import CardComponent from "./CardComponent";
// import {  useNavigate } from "react-router-dom";
const Dashboard = () => {
  // const navigate = useNavigate();
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div
          className="flex flex-col bg-gray-100"
          style={{
            backgroundImage:
              "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
          }}
        >
          <h3 style={{ fontFamily: "nunito" }} className="m-3">
            Dashboard
          </h3>
          <div className=" flex flex-wrap  ">
            <CardComponent
              text={"Add Tour Category"}
              navigateLink="/admin/tour-category/top"
            />

            <CardComponent
              text={"Add Destination"}
              navigateLink={"/admin/destination"}
            />
            <CardComponent text={"Plan My Holiday"} />
            <CardComponent
              text={"Add Package"}
              navigateLink={"/admin/package"}
            />
            <CardComponent text={"Add Blog"} />
            <CardComponent text={" Branch Office"} />
            <CardComponent text={"Account Details"} height={"2rem"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
