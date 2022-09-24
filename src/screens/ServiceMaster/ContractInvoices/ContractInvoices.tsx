import { useEffect, useState } from "react";
import WebService from "../../../utility/WebService";
import { useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import HelperService from "../../../utility/HelperService";
import Grid, {
  GridColumn,
  GridHeader,
  GridRow,
} from "../../../components/Grid/Grid";
import "./ContractInvoices.scss";

const headers: GridHeader[] = [
  {
    title: "Invoice#",
    isSorting: false,
  },
  {
    title: "Contract#",
  },
  {
    title: "Amount",
  },
  {
    title: "Invoice Date",
  },
  {
    title: "Service Type",
  },
  {
    title: "Posted",
  },
  {
    title: "Approved",
  },
  {
    title: "Emailed",
  },
  {
    title: "Printed",
  },
];

const ContactInvoices = () => {
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerModal: any = useSelector<RootState, CustomerModalState>(
    (state) => state.customerModal
  );
  const [rows, setRows] = useState<GridRow[]>([]);
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getContactInvoices();
  }, []);

  const getContactInvoices = () => {
    setShowLoader(true);
    WebService.getAPI({
      action:
        "SDInvoice/GetContractInvoices/" +
        user_info["AccountId"] +
        "/" +
        user_info["CompanyId"] +
        "/" +
        data?.sd_master.Id,
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false);
        let rows: GridRow[] = [];
        for (var i in res) {
          let columns: GridColumn[] = [];
          columns.push({ value: res[i].Id });
          columns.push({ value: res[i].ContractNum });
          columns.push({ value: res[i].InvoiceTotal });
          columns.push({
            value: HelperService.getFormatedDate(res[i].InvoiceDate),
          });
          columns.push({ value: res[i].ContractServiceType });

          rows.push({ data: columns });
        }

        setRows(rows);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div
        className="other-component-view contract-invoices"
        style={{ width: customerModal?.isShow === true ? "95%" : "100%" }}
      >
        <div className="d-flex flex-row contract-invoices-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="contract-invoice-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg").default
              }
            />
          </div>
          <div className="contract-invoices-title">
            Contact Invoices ({rows.length})
          </div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
      </div>
    </>
  );
};

export default ContactInvoices;
