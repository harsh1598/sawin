import React, { useEffect, useState } from "react";
import Grid, {
  GridHeader,
  GridColumn,
  GridRow,
} from "../../../components/Grid/Grid";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import WebService from "../../../utility/WebService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../config/Store";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import AddContactModal from "../Contact/AddContactModal";
import "./Communication.scss";
import deleteicon from "../../../assets/images/delete-icon.svg";
import editicon from "../../../assets/images/edit.svg";

const headers: GridHeader[] = [
  {
    title: "",
    isSorting: false,
  },
  {
    title: "Date & Time ",
  },
  {
    title: "To",
  },
  {
    title: "Type",
  },
  {
    title: "Subject/Message",
  },
  {
    title: "Actions",
  },
];

const Communication = () => {
  const [isShow, setShow] = useState(true);
  const [contactData, setContactData] = useState();
  const [ShowLoader, setShowLoader] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "");
  const data: any = useSelector<RootState, CustomerModalState>(
    (state) => state.customerModal
  );
  const userdata: any = useSelector<RootState, APIState>(
    (state) => state.sdMaster
  );
  const [rows, setRows] = useState<GridRow[]>([]);
  const [lengthCount, setlengthCount] = useState(0);
  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    getContactsdata();
  }, []);
  const getContactsdata = () => {
    setShowLoader(true);
    WebService.getAPI({
      action: `SaiSentBox/GetSentBoxRecords/${user_info.AccountId}/${user_info.CompanyId}/${userdata.sd_master.Id}`,
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false);

        let rows: GridRow[] = [];
        for (var i in res) {
          setlengthCount(res.length);
          let columns: GridColumn[] = [];
          columns.push({ value: communicationList(i), type: "COMPONENT" });
          columns.push({ value: res[i].DateTimeOfMessage });
          columns.push({ value: res[i].To });
          columns.push({ value: res[i].HomePhone });
          columns.push({ value: res[i].Subject });
          columns.push({ value: actionList(i), type: "COMPONENT" });
          rows.push({ data: columns });
        }

        setRows(rows);
      })
      .catch((e) => {
        setShowLoader(false);
      });
  };

  const actionList = (value: any) => {
    return (
      <div className="text-center">
        <a
          onClick={() => alert(value)}
          className="text-dark ms-2 font-18 cursor-pointer"
        >
          <img src={editicon} height={25} />
        </a>
      </div>
    );
  };
  const communicationList = (value: any) => {
    return (
      <div className="text-center">
        <a
          onClick={() => alert(value)}
          className="text-dark ms-2 font-18 cursor-pointer"
        >
          <img src={deleteicon} height={25} />
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="communication">
        <div className="d-flex flex-row communication-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="communication-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg").default
              }
            />
          </div>
          <div className="communication-title">
            Communication ({lengthCount})
          </div>
        </div>
        <Grid
          headers={headers}
          rows={rows}
          ShowLoader={ShowLoader}
          errorMessage="No Communication Found"
        />
      </div>
    </>
  );
};
export default Communication;
