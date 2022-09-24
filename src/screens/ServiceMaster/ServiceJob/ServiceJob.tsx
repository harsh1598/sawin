import { useEffect, useState } from "react";
import { RootState } from "../../../config/Store";
import { useSelector } from "react-redux";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import HelperService from "../../../utility/HelperService";
import Grid, {
  GridColumn,
  GridHeader,
  GridRow,
} from "../../../components/Grid/Grid";
import WebService from "../../../utility/WebService";
import "./ServiceJob.scss";

const headers: GridHeader[] = [
  {
    title: "Start",
  },
  {
    title: "End",
  },
  {
    title: "Outcome",
  },
  {
    title: "Invoice#",
  },
  {
    title: "Problem Desc.",
  },
  {
    title: "Wo#",
  },
  {
    title: "Work Desc.",
  },
  {
    title: "Recording",
  },

  {
    title: "Location",
  },
  {
    title: "Service Type",
  },
  {
    title: "S",
  },
  {
    title: "Posted",
  },
  {
    title: "Tech#",
  },
];

const ServiceJob = () => {
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerModal: any = useSelector<RootState, CustomerModalState>(
    (state) => state.customerModal
  );
  const [rows, setRows] = useState<GridRow[]>([]);
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getServiceCall();
  }, []);

  const getServiceCall = () => {
    setShowLoader(true);
    WebService.getAPI({
      action:
        "SDCallMaster/" +
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
          columns.push({
            value: HelperService.getFormatedDate(res[i].StartDate),
          });
          columns.push({
            value: HelperService.getFormatedDate(res[i].EndDate),
          });
          columns.push({ value: res[i].SetupSDOutcomeCodeId });
          columns.push({ value: res[i].InvoiceNum });
          columns.push({
            value: HelperService.removeHtml(res[i].ProblemDescription),
          });
          columns.push({ value: <a>{res[i].Id}</a> });
          columns.push({
            value: HelperService.removeHtml(res[i].WorkDescription),
          });
          columns.push({ value: res[i].RecordingUrl });
          columns.push({ value: res[i].GLBreak1?.BreakName });
          columns.push({ value: res[i].ServiceType1 });
          columns.push({ value: res[i].CallStatus });
          columns.push({ value: res[i].InvoicePosted ? "Yes" : "No" });
          columns.push({ value: res[i].TechCode });
          rows.push({ data: columns });
        }

        setRows(rows);
      })
      .catch((e) => {
        setShowLoader(false);
      });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div
        className="other-component-view service-job"
      >
        <div className="d-flex flex-row service-job-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg").default
              }
            />
          </div>
          <div className="service-title">Service Job ({rows.length})</div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
      </div>
    </>
  );
};

export default ServiceJob;
