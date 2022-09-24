import React, { useEffect, useState } from "react";
import { logout } from "../../action/AuthAction";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Dropdown from "react-bootstrap/Dropdown";
import Search from "../../components/Search/Search";
import { useSelector } from "react-redux";
import { PageTitle } from "../../reducer/CommonReducer";
import { RootState } from "../../config/Store";

import hamburg from "../../assets/images/hamburger-menu.svg";
import logo from "../../assets/images/logo-short.png";
import profile from "../../assets/images/dummy-profile.svg";
import phone from "../../assets/images/phone.svg";
import icondDarkMode from "../../assets/images/moon.svg";
// import { handleHumburgMenu } from "../../action/SideBarAction";

interface PropData {
  title: string;
  data: any;
}

const Header = (props: PropData) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const pageTitle: any = useSelector<RootState, PageTitle>((state) =>
    state && state.pageTitle ? state.pageTitle.title : ""
  );

  const logoutHandler = async () => {
    localStorage.clear();
    dispatch(logout());
    window.location.href = "/login";
  };

  // const ToogleClass = () => {
  //   var element = document.getElementById("main-app");
  //   element?.classList.toggle("toggled-main");
  //   dispatch(handleHumburgMenu());
  // };

  const getSearchData = (value: any) => {
    props.data(value);
  };

  return (
    <>
      <Loader show={isLoading} />
      <header>
        <div className="header">
          <div className="row main-row">
            <div className="col-lg-6 col-md-9 col-6 align-self-center d-flex align-items-center pr-0">
              {/* <a className=" text-dark font-22" onClick={ToogleClass}>
                <img
                  src={hamburg}
                  width="30"
                  className="hamburger-menu"
                  alt="hamburg"
                />
              </a> */}
              <a id="btn-collapse" href="#">
                <i className="ri-menu-line ri-xl"></i>
              </a>
              <a
                id="btn-toggle"
                href="#"
                className="sidebar-toggler break-point-lg"
              >
                <i className="ri-menu-line ri-xl"></i>
              </a>
              <img
                src={logo}
                alt="Logo"
                className="header-logo"
                height={50}
                width={80}
              />
              <p className="title">{pageTitle}</p>
            </div>
            <div className="col-lg-6 col-md-9 col-6 d-flex justify-content-end align-items-center form-style">
              <Search data={getSearchData} />
              <img src={phone} id="img_header" className="mr-15" alt="phone" />
              <a href="javascript:void(0)" className="header-icons me-3"><img src={icondDarkMode} className="icon" alt="Dark mode" /></a>
              <Dropdown>
                <Dropdown.Toggle
                  className="d-flex bg-transparent text-dark p-0 border-0 h-auto profile-dd my-2"
                  id="dropdown-basic"
                >
                  <div className="dropdown">
                    <img
                      src={profile}
                      id="img_header"
                      className="mr-2"
                      alt="profile"
                    />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => logoutHandler()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
