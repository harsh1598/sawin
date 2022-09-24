import { any, array } from "prop-types";
import React, { useEffect, useState } from "react";
import Grid, { GridColumn, GridHeader, GridRow } from "../../../components/Grid/Grid";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import WebService from "../../../utility/WebService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import HelperService from '../../../utility/HelperService';
import "./Projects.scss";

const headers: GridHeader[] = [
  {
    title: "ProjectNum",
    isSorting: false,
  },
  {
    title: "Project Name",
  },
  {
    title: "Start Date",
  },
  {
    title: "ProjectManagerName",
  },
  {
    title: "ProjectStatus",
  },
  {
    title: "ProjectAmount",
  }

];

const Projects = () => {
  const user_info = JSON.parse(localStorage.getItem('user_detail') || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerModal: any = useSelector<RootState, CustomerModalState>(state => state.customerModal)
  const [rows, setRows] = useState<GridRow[]>([]);
  const [ShowLoader, setShowLoader] = useState(false);
  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    setShowLoader(true)
    WebService.getAPI({
      action: "SDSMProjects/GetAllProjectsForSM/" + user_info['AccountId'] + "/" + user_info['CompanyId'] + "/" + data?.sd_master.Id,
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false)
        let rows: GridRow[] = []
        for (var i in res) {
          let columns: GridColumn[] = []
          columns.push({ value: res[i].ProjectNum })
          columns.push({ value: res[i].ProjectName })
          columns.push({ value: HelperService.getFormatedDateAndTime(res[i].StartDate) })
          columns.push({ value: res[i].ProjectManagerName })
          columns.push({ value: res[i].ProjectStatus == 1 ? 'Open' : 'Close' })
          columns.push({ value: res[i].ProjectAmount })
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
        className="other-component-view projects"
        style={{ width: customerModal?.isShow === true ? "95%" : "100%" }}
      >
        <div className="d-flex flex-row projects-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="projects-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg")
                  .default
              }
            />
          </div>
          <div className="projects-title">Projects ({rows.length})</div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
      </div>

    </>
  );
};

export default Projects;
