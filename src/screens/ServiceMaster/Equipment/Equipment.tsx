import { useEffect, useState } from "react";
import Grid, {
  GridColumn,
  GridHeader,
  GridRow,
} from "../../../components/Grid/Grid";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import WebService from "../../../utility/WebService";
import { useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import deleteicon from "../../../assets/images/delete-icon.svg";
import editicon from "../../../assets/images/edit.svg";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import HelperService from "../../../utility/HelperService";

import "./Equipment.scss";
import { getEquipments } from "../../../utility/CommonApiCall";

const headers: GridHeader[] = [
  {
    title: "Manufacturer",
    isSorting: false,
  },
  {
    title: "Model",
  },
  {
    title: "Description",
  },
  {
    title: "Serial#",
  },
  {
    title: "System",
  },
  {
    title: "Location",
  },
  {
    title: "Unit",
  },
  {
    title: "Warranty Date",
  },
  {
    title: "Installation Date",
  },
  {
    title: "Last Repair",
  },
  {
    title: "Job#",
  },
  {
    title: "Our Installation",
  },
  {
    title: "Replaced Date",
  },
  {
    title: "Extend Warranty Date",
  },
  {
    title: "Invalid Equipment",
  },
  {
    title: "Equipment Notes",
  },
  {
    title: "Part Warr. Date",
  },
  {
    title: "Labor Warr. Date",
  },
  {
    title: "Equipment Type",
  },
  {
    title: "Actions",
  },
];

const Equipment = () => {
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerModal: any = useSelector<RootState, CustomerModalState>(
    (state) => state.customerModal
  );
  const [rows, setRows] = useState<GridRow[]>([]);
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getEquipment();
  }, []);

  const getEquipment = () => {
    setShowLoader(true);

    getEquipments({ user_info })
      .then((res: any) => {
        setShowLoader(false);
        let rows: GridRow[] = [];
        for (var i in res) {
          let columns: GridColumn[] = [];
          columns.push({ value: res[i].EqpManufacturer });
          columns.push({ value: res[i].EqpModel });
          columns.push({ value: res[i].Description });
          columns.push({ value: res[i].SerialNo });
          columns.push({ value: res[i].System });
          columns.push({ value: res[i].Location });
          columns.push({ value: res[i].Unit });
          columns.push({
            value: HelperService.getFormatedDate(res[i].ReplacedDate),
          });

          columns.push({
            value: HelperService.getFormatedDate(res[i].InstallationDate),
          });

          columns.push({
            value: HelperService.getFormatedDate(res[i].LastRepairDate),
          });
          columns.push({ value: res[i].JobNo });
          columns.push({
            value: res[i].OurInstallation === false ? "No" : "Yes",
          });
          columns.push({
            value: HelperService.getFormatedDate(res[i].ReplacedDate),
          });
          columns.push({
            value: HelperService.getFormatedDate(res[i].ExtendWarrantyDate),
          });
          columns.push({
            value: res[i].InvalidEquipment === false ? "No" : "Yes",
          });
          columns.push({ value: res[i].EquipmentNotes });
          columns.push({
            value: HelperService.getFormatedDate(res[i].PartWarrantyDate),
          });
          columns.push({
            value: HelperService.getFormatedDate(res[i].LaborWarrantyDate),
          });
          columns.push({ value: res[i].EquipmentType });
          columns.push({ value: actionList(i), type: "COMPONENT" });
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

  return (
    <>
      <div
        className="other-component-view equipment"
        style={{ width: customerModal?.isShow === true ? "95%" : "100%" }}
      >
        <div className="d-flex flex-row equipment-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
            className="equipment-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg").default
              }
            />
          </div>
          <div className="equipment-title">Equipment ({rows.length})</div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
      </div>
    </>
  );
};

export default Equipment;
