import { any, array } from "prop-types";
import React, { useEffect, useState } from "react";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import WebService from "../../../utility/WebService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import HelperService from '../../../utility/HelperService';
import Grid, { GridColumn, GridHeader, GridRow } from "../../../components/Grid/Grid";
import "./Proposal.scss";

const headers: GridHeader[] = [
  {
    title: "Proposals#",
    isSorting: false,
  },
  {
    title: "Status",
  },
  {
    title: "Name",
  },
  {
    title: "Quote Date",
  },
  {
    title: "Total Amount",
  },

];

const Proposal = () => {
  const user_info = JSON.parse(localStorage.getItem('user_detail') || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerModal: any = useSelector<RootState, CustomerModalState>(state => state.customerModal)
  const [rows, setRows] = useState<GridRow[]>([]);
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getProposal();
  }, []);

  const getProposal = () => {
    setShowLoader(true)
    WebService.getAPI({
      action: "SaiSDQuoteMaster/GetSMQuotes/" + user_info['AccountId'] + "/" + user_info['CompanyId'] + "/" + data?.sd_master.Id,
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false)
        let rows: GridRow[] = []
        for (var i in res) {
          let columns: GridColumn[] = []

          columns.push({ value: res[i].Id })
          columns.push({ value: res[i].InvoiceNum })
          columns.push({ value: res[i].QuoteName })
          columns.push({ value: HelperService.getFormatedDate(res[i].QuoteDate) })
          columns.push({ value: res[i].Total })
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
        className="other-component-view proposal"
        style={{ width: customerModal?.isShow === true ? "95%" : "100%" }}
      >
        <div className="d-flex flex-row proposal-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="proposal-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg")
                  .default
              }
            />
          </div>
          <div className="proposal-title">Proposals ({rows.length})</div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
      </div>

    </>
  );
};

export default Proposal;
