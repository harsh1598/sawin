import { any, array } from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid, { GridHeader, GridRow } from "../../../components/Grid/Grid";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import { RootState } from "../../../config/Store";
import { CustomerModalState } from "../../../reducer/CommonReducer";
import WebService from "../../../utility/WebService";
import "./ProspectNote.scss";

const headers: GridHeader[] = [
  {
    title: "Start",
    isSorting: false,
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
    title: "Work Desc.",
  },
  {
    title: "Recording",
  },
  {
    title: "Wo#",
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

const ProspectNote = () => {
  const [prospectNotesData, setProspectNotesData] = useState([]);
  const customerModal: any = useSelector<RootState, CustomerModalState>(state => state.customerModal)
  const rows: GridRow[] = [];
  const [ShowLoader, setShowLoader] = useState(false);


  useEffect(() => {
    getProspectNotes();
  }, []);

  const getProspectNotes = () => {
    setShowLoader(true)
    WebService.getAPI({
      action: "SalesMarketing/ManageProspect/SMProspectNotes",
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false)
        setProspectNotesData(res);
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
        className="other-component-view prospect-note"
        style={{ width: customerModal?.isShow === true ? "95%" : "100%" }}
      >
        <div className="d-flex flex-row prospect-note-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="prospect-note-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg")
                  .default
              }
            />
          </div>
          <div className="prospect-note-title">Prospect Note ({prospectNotesData.length})</div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} errorMessage={'No Prospect Note Found'} />
      </div>

    </>
  );
};

export default ProspectNote;
