import { any, array } from "prop-types";
import React, { useEffect, useState } from "react";
import Grid, { GridColumn, GridHeader, GridRow } from "../../../components/Grid/Grid";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import WebService from "../../../utility/WebService";
import { useDispatch, useSelector } from "react-redux";
import deleteicon from "../../../assets/images/delete-icon.svg";
import editicon from "../../../assets/images/edit.svg";
import { RootState } from "../../../config/Store";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import HelperService from '../../../utility/HelperService';
import { useNavigate } from "react-router-dom";
import "./Document.scss";

const headers: GridHeader[] = [
  {
    title: "Document Name",
  },
  {
    title: "Description",
  },
  {
    title: "Show To Customer",
  },
  {
    title: "Show To Technician",
  },
  {
    title: "Created On",
  },
  {
    title: "Created By",
  },
  {
    title: "Actions",
  }
];

const Document = () => {
  const user_info = JSON.parse(localStorage.getItem('user_detail') || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerModal: any = useSelector<RootState, CustomerModalState>(state => state.customerModal)
  const [rows, setRows] = useState<GridRow[]>([]);
  let history = useNavigate();
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getDocuments();
  }, []);

  const getDocuments = () => {
    setShowLoader(true)
    WebService.getAPI({
      action: "EntityDocument/GetDocuments/" + user_info['AccountId'] + "/" + user_info['CompanyId'] + "/1-1/1",
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false)
        let rows: GridRow[] = []
        for (var i in res.Data) {
          let columns: GridColumn[] = []
          columns.push({ value: res.Data[i].DocumentName })
          columns.push({ value: res.Data[i].Description })
          columns.push({ value: res.Data[i].ShowToVendor === false ? 'No' : 'Yes' })
          columns.push({ value: res.Data[i].ShowToRemoteTech === false ? 'No' : 'Yes' })
          columns.push({ value: HelperService.getFormatedDateAndTime(res.Data[i].CreatedOn) })
          columns.push({ value: res.Data[i].CreatedBy })
          columns.push({ value: actionList(i), type: 'COMPONENT' })
          rows.push({ data: columns });
        }

        setRows(rows);
      })
      .catch((e) => {
        setShowLoader(false)
      });
  };
  const actionList = (value: any) => {
    return (
      <div>
        <a onClick={() => alert(value)} className="text-dark ms-2 font-18 cursor-pointer">
          <img
            src={editicon}
            height={25}
          />
        </a>
        <a onClick={() => alert(value)} className="text-dark ms-2 font-18 cursor-pointer">
          <img
            src={deleteicon}
            height={25}
          />
        </a>
      </div>
    );
  };
  const goBack = () => {
    window.history.back();
  };

  return (
    <>

      <div
        className="other-component-view document"
        style={{ width: customerModal?.isShow === true ? "95%" : "100%" }}
      >
        <div className="d-flex flex-row document-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="document-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg")
                  .default
              }
            />
          </div>
          <div className="document-title">Document ({rows.length})</div>
          <div className="col-10 mt-1 d-flex justify-content-end mt-3 ml-6">
            <div
              className="col-6 new-add-button d-flex ml-6"
              onClick={() => history('/add-document')}
            >
              + Add Document
            </div>
          </div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
      </div>

    </>
  );
};

export default Document;
