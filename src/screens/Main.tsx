import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";

const Main = () => {
  const [searchData, setSearchData] = useState()

  const getData =(value:any) => {
    console.log("search value",value)
    setSearchData(value)
  }
 
  return (
    <>
      <Header title="Dashboard" data={getData}/>
      <SideBar />
      <div id="main-app" >
        <Outlet context={searchData}/>
      </div>
    </>
  );
};

export default Main;
