import { any, array } from "prop-types";
import React, { useEffect, useState } from "react";
import Grid, { GridColumn, GridHeader, GridRow } from "../../../components/Grid/Grid";
import CustomerInformation from "../../../components/ServiceMasterComponents/CustomerInformation/CustomerInformation";
import WebService from "../../../utility/WebService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import { APIState, CustomerModalState } from "../../../reducer/CommonReducer";
import AddRecommendationModal from "../Recommendations/AddRecommendationModal";
import HelperService from '../../../utility/HelperService';
import "./Recommendations.scss";

const headers: GridHeader[] = [
  {
    title: "Status",
    isSorting: false,
  },
  {
    title: "Comments",
  },
  {
    title: "Recommended Date",
  },
  {
    title: "Recommended By",
  },
  {
    title: "Accepted On",
  },
  {
    title: "Reason to Deny",
  }
];

const Recommendations = () => {
  const [showAddRecommendationModal, setShowAddRecommendationModal] =
    useState(false);
  const user_info = JSON.parse(localStorage.getItem('user_detail') || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerModal: any = useSelector<RootState, CustomerModalState>(state => state.customerModal)
  const [rows, setRows] = useState<GridRow[]>([]);
  const [ShowLoader, setShowLoader] = useState(false);
  useEffect(() => {
    getRecommendations();
  }, []);

  const getRecommendations = () => {
    setShowLoader(true)
    WebService.getAPI({
      action: "SDServiceMasterRecommendation/GetPendingRecommendationsForSM/" + user_info['AccountId'] + "/" + user_info['CompanyId'] + "/1-1",
      body: null,
    })
      .then((res: any) => {
        setShowLoader(false)
        let rows: GridRow[] = []
        for (var i in res) {
          let columns: GridColumn[] = []
          columns.push({ value: res[i].Status })
          columns.push({ value: res[i].RecommendationText })
          columns.push({ value: HelperService.getFormatedDate(res[i].RecommendedDate) })
          columns.push({ value: res[i].TechNameInternal })
          columns.push({
            value: HelperService.getFormatedDate(res[i].AcceptedOn
            )
          })
          columns.push({ value: res[i].ReasonToDeny })
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

  const closeModal = (value: any) => {
    setShowAddRecommendationModal(value);
  };

  return (
    <>
      <AddRecommendationModal
        isShow={showAddRecommendationModal}
        isClose={closeModal}
        title="Recommendation Modal"
      />

      <div
        className="other-component-view recommendations"
        style={{ width: customerModal?.isShow === true ? "95%" : "100%" }}
      >
        <div className="d-flex flex-row recommendations-heading-view">
          <div className="cursor-pointer" onClick={goBack}>
            <img
              className="recommendations-left-icon"
              src={
                require("../../../assets/images/left-arrow-black.svg")
                  .default
              }
            />
          </div>
          <div className="recommendations-title">Recommendations ({rows.length})</div>
          <div className="col-9 mt-1 d-flex justify-content-end mt-3 ml-6">
            <div
              className="col-6 new-add-button d-flex"
              onClick={() =>
                setShowAddRecommendationModal(
                  !showAddRecommendationModal
                )}
            >
              + Add Recommendation
            </div>
          </div>
        </div>
        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
      </div>

    </>
  );
};

export default Recommendations;
