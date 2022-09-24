import { any, array } from "prop-types";
import React, { useEffect, useState } from "react";
import Grid, { GridColumn, GridHeader, GridRow } from "../../../components/Grid/Grid";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import WebService from "../../../utility/WebService";
import "./SalesCall.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import HelperService from '../../../utility/HelperService';

const headers: GridHeader[] = [
  {
    title: "Recording",
  },
  {
    title: "WO#",
  },
  {
    title: "Call Type",
  },
  {
    title: "Call Source",
  },
  {
    title: "Data Promised",
  },
  {
    title: "Quote Source",
  },
  {
    title: "Price Quoted",
  },
  {
    title: "Time Promised",
  },
  {
    title: "Salesman",
  },
  {
    title: "Quote#",
  },
  {
    title: "Hours Estimated",
  },
  {
    title: "Call Notes",
  },
  {
    title: "SM#",
  },
  {
    title: "Contact",
  },
  {
    title: "Date Received",
  },
];

const SalesCall = () => {
  const user_info = JSON.parse(localStorage.getItem('user_detail') || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerModal: any = useSelector<RootState, CustomerModalState>(state => state.customerModal)
  const [rows, setRows] = useState<GridRow[]>([]);
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getSalesCall();
  }, []);

  const getSalesCall = () => {
    setShowLoader(true)
    WebService.getAPI({
      action: "SDSalesCallMaster/" + user_info['AccountId'] + "/" +
        user_info['CompanyId'] + "/1-1",
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false)
        let rows: GridRow[] = []
        for (var i in res) {
          let columns: GridColumn[] = []
          columns.push({ value: res[i].RecordingUrl })
          columns.push({ value: res[i].CallNum })
          columns.push({ value: res[i].TypeofCall })
          columns.push({ value: res[i].CallSource })
          columns.push({ value: HelperService.getFormatedDate(res[i].CreatedOn) })
          columns.push({ value: res[i].QuoteSource })
          columns.push({ value: HelperService.getFormatedDate(res[i].StartDate) })
          columns.push({ value: res[i].TimePromised })
          columns.push({ value: res[i].SalesmanName })
          columns.push({ value: res[i].QuoteNum })
          columns.push({ value: res[i].HoursEstimated })
          columns.push({ value: res[i].CallNotes })
          columns.push({ value: res[i].SDServiceMasterId })
          columns.push({ value: res[i].ContactName })
          columns.push({ value: HelperService.getFormatedDate(res[i].DateReceived) })
          rows.push({ data: columns });
        }

        setRows(rows);
      })
      .catch((e) => {
        setShowLoader(false)
      });
  };

  const goBack = () => {
    window.history.back();
  };


  return (
    <>

      <div
        className="other-component-view sales-call"
        style={{ width: customerModal?.isShow === true ? "95%" : "100%" }}
      >
        <div className="d-flex flex-row sales-call-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="sales-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg")
                  .default
              }
            />
          </div>
          <div className="sales-title">Sales Call ({rows.length})</div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
      </div>

    </>
  );
};

export default SalesCall;
