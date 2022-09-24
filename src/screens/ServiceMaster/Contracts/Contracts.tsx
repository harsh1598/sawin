import { any, array } from "prop-types";
import React, { useEffect, useState } from "react";
import Grid, { GridColumn, GridHeader, GridRow } from "../../../components/Grid/Grid";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import WebService from "../../../utility/WebService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../config/Store";
import deleteicon from "../../../assets/images/delete-icon.svg";
import { APIState } from "../../../reducer/CommonReducer";
import HelperService from '../../../utility/HelperService';
import "./Contracts.scss";

const headers: GridHeader[] = [
  {
    title: "Contract#",
    isSorting: false,
  },
  {
    title: "Start Date",
  },
  {
    title: "Expiry Date",
  },
  {
    title: "Contract Amount",
  },
  {
    title: "Status",
  },
  {
    title: "Contract Type",
  },
  {
    title: "Description",
  },
  {
    title: "Actions",
  }
];

const Contracts = () => {
  const user_info = JSON.parse(localStorage.getItem('user_detail') || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerModal: any = useSelector<RootState>
  const [rows, setRows] = useState<GridRow[]>([]);
  const [ShowLoader, setShowLoader] = useState(false);

  let history = useNavigate();

  useEffect(() => {
    getContracts();
  }, []);

  const getContracts = () => {
    setShowLoader(true)
    WebService.getAPI({
      action: "SaiSDContract/GetContracts/" + user_info['AccountId'] + "/" + user_info['CompanyId'] + "/" + data?.sd_master.Id + "/" + true,
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false)
        let rows: GridRow[] = []
        for (var i in res) {
          let columns: GridColumn[] = []
          columns.push({ value: res[i].ContractNum })
          columns.push({ value: HelperService.getFormatedDate(res[i].StartDate) })
          columns.push({ value: HelperService.getFormatedDate(res[i].ExpiryDate) })
          columns.push({ value: res[i].Amount })
          columns.push({ value: res[i].Status })
          columns.push({ value: res[i].ContractType })
          columns.push({ value: res[i].ContractDescription })
          columns.push({ value: actionList(i), type: 'COMPONENT' })
          rows.push({ data: columns });
        }

        setRows(rows);
        // Grid logic end
      })
      .catch((e) => {
        setShowLoader(false)
      });
  };

  const actionList = (value: any) => {
    return <div>
      <a onClick={() => alert(value)} className="text-dark ms-2 font-18 cursor-pointer">
        <img
          src={deleteicon}
          height={25}
        /></a>
    </div >;
  };

  const goBack = () => {
    window.history.back();
  };


  return (
    <>

      <div
        className="other-component-view contracts"
        style={{ width: customerModal?.isShow === true ? "95%" : "100%" }}
      >
        <div className="d-flex flex-row contracts-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="contracts-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg")
                  .default
              }
            />
          </div>
          <div className="contracts-title">Contracts ({rows.length})

          </div>
          <div className="col-10 mt-1 d-flex justify-content-end mt-3 ml-6">
            <div
              className="col-6 new-add-button d-flex ml-6"
            >
              + Add Contract
            </div>
          </div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
      </div>

    </>
  );
};

export default Contracts;
