import React, { useEffect, useState } from "react";
import Grid, {
  GridColumn,
  GridHeader,
  GridRow,
} from "../../../components/Grid/Grid";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import WebService from "../../../utility/WebService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../config/Store";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import AddContactModal from "../Contact/AddContactModal";
import "./Contact.scss";
import deleteicon from "../../../assets/images/delete-icon.svg";
import editicon from "../../../assets/images/edit.svg";

const headers: GridHeader[] = [
  {
    title: "Contact Name",
    isSorting: false,
  },
  {
    title: "Email",
  },
  {
    title: "Primary Number",
  },
  {
    title: "Secondry Number",
  },
  {
    title: "Is Default",
  },
  {
    title: "Include In Invoice Email",
  },
  {
    title: "Action",
  },
];

const Contact = () => {
  let navigate = useNavigate();

  const [isShow, setShow] = useState(true);
  const [contactData, setContactData] = useState();
  const [ShowLoader, setShowLoader] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "");
  const data: any = useSelector<RootState, CustomerModalState>(
    (state) => state.customerModal
  );
  const userdata: any = useSelector<RootState, APIState>(
    (state) => state.sdMaster
  );
  const [rows, setRows] = useState<GridRow[]>([]);
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getContactsdata();
  }, []);
  const [lengthCount, setlengthCount] = useState(0);

  const getContactsdata = () => {
    setShowLoader(true);
    WebService.getAPI({
      action: `EntityContact/GetAll/${user_info.AccountId}/${user_info.CompanyId}/${userdata.sd_master.Id}/1`,
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false);
        let rows: GridRow[] = [];
        for (var i in res) {
          setlengthCount(res.length);
          let columns: GridColumn[] = [];
          columns.push({ value: res[i].ContactName });
          columns.push({ value: res[i].Email });
          columns.push({ value: res[i].WorkPhone });
          columns.push({ value: res[i].HomePhone });
          columns.push({ value: res[i].IsDefaultForEntityId });
          columns.push({ value: res[i].IncludeInInvoiceEmail });
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
      <div>
        <a
          onClick={() => alert(value)}
          className="text-dark ms-2 font-18 cursor-pointer"
        >
          <img src={editicon} height={25} />
        </a>
        <a
          onClick={() => alert(value)}
          className="text-dark ms-2 font-18 cursor-pointer"
        >
          <img src={deleteicon} height={25} />
        </a>
      </div>
    );
  };

  const showCustomerInfo = (value: any) => {
    setContactData(value);
  };
  const closeModal = (value: any) => {
    setShowAddContactModal(value);
  };
  return (
    <>
      <AddContactModal
        isShow={showAddContactModal}
        isClose={closeModal}
        title="Contact Modal"
      />
     
          <div
            className="other-component-view contact"
            style={{ width: data?.isShow === false ? "100%" : "92%" }}
          >
            <div className="d-flex flex-row contact-heading-view">
              <div className="cursor-pointer" onClick={goBack}>
                <img
                className="contact-left-icon"
                  src={
                    require("../../../assets/images/left-arrow-black.svg")
                      .default
                  }
                />
              </div>
              <div className="contact-title">Contacts ({lengthCount})</div>
              <div className="col-10 mt-1 d-flex justify-content-end mt-3">
                <div
                  className="col-6 new-add-button d-flex ml-6"
                  onClick={() => setShowAddContactModal(!showAddContactModal)}
                >
                  + Add Contact
                </div>
              </div>
            </div>
            <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
          </div>
    </>
  );
};
export default Contact;
