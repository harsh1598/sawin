import React, { useEffect, useState } from "react";
import CustomerInformation from "../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import "./Service.scss";

import { Dispatch } from "redux";
import { useDispatch, useSelector } from 'react-redux';
import { SetPageTitle, CustomerView } from "../../action/CommonAction";
import { RootState } from '../../config/Store';
import { CustomerModalState } from "../../reducer/CommonReducer";
import { Outlet } from "react-router-dom";

const Service = () => {
  const data: any = useSelector<RootState, CustomerModalState>(state => state.customerModal)

  const showCustomerInfo = (value: any) => {
    dispatch(CustomerView(!data?.isShow))
  };

  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(SetPageTitle("Service Master"))
  }, [])

  return (
    <>
      <div className="service service-master">
        <div className="home-main d-flex flex-row">
          <div className="ci-view" style={{ width: data?.isShow === true ? "45px" : "auto" }}>
            <CustomerInformation />
          </div>
          <div className="mm-view right-card">
            {data?.isShow === false ? (
              <div className="jobLocationText">
                Job Location
                <span className="top-address">
                  1-1 Raily Miller, 7899 Lamppost Court, Olympia, Pune Mumbai
                </span>
              </div>
            ) : null}
            <div className="other-component-view card-shadow">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
