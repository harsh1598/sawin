import React, { useEffect, useState } from "react";
import "./OverView.scss";
import { useNavigate } from "react-router-dom";

import service from "../../../assets/images/service-job-icon.svg";
import serviceCall from "../../../assets/images/service-call-icon.svg";
import contractInvoices from "../../../assets/images/contract-invoices-icon.svg";
import contracts from "../../../assets/images/contracts-icon.svg";
import equipment from "../../../assets/images/equipment-icon.svg";
import proposal from "../../../assets/images/proposal-icon.svg";
import projects from "../../../assets/images/projects-icon.svg";
import prospects from "../../../assets/images/prospects-icon.svg";
import documents from "../../../assets/images/documents-icon.svg";
import recommendations from "../../../assets/images/recommendations-icon.svg";
import WebService from "../../../utility/WebService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import { APIState, SearchState } from "../../../reducer/CommonReducer";

var array = [
  {
    title: "Service Job",
    image: service,
    count: "0",
    path: "/service-job",
  },
  {
    title: "Sales Call",
    image: serviceCall,
    count: "0",
    path: "/sales-call",
  },
  {
    title: "Contracts Invoices",
    image: contractInvoices,
    count: "0",
    path: "/contact-invoices",
  },
  {
    title: "Contracts",
    image: contracts,
    count: "0",
    path: "/contracts",
  },
  {
    title: "Equipment",
    image: equipment,
    count: "0",
    path: "/equipment",
  },
  {
    title: "Proposals",
    image: proposal,
    count: "0",
    path: "/proposal",
  },
  {
    title: "Projects",
    image: projects,
    count: "0",
    path: "/projects",
  },
  {
    title: "Prospect Note",
    image: prospects,
    count: "0",
    path: "/prospect-note",
  },
  {
    title: "Documents",
    image: documents,
    count: "0",
    path: "/document",
  },
  {
    title: "Recommendations",
    image: recommendations,
    count: "0",
    path: "/recommendations",
  },
  {
    title: "Contacts",
    image: recommendations,
    count: "0",
    path: "/contact",
  },
  {
    title: "Communication",
    image: recommendations,
    count: "0",
    path: "/communication",
  },
];

const OverView = () => {
  const [overviewData, setOverViewData] = useState<any[]>(array);
  let history = useNavigate();
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const search: any = useSelector<RootState, SearchState>(
    (state) => state.search
  );
  useEffect(() => {
    if (data.sd_master.Id) {
      getOverViewData();
    }
  }, [data.sd_master.Id]);

  const getOverViewData = () => [
    WebService.getAPI({
      action: `SDServiceMaster/GetOverview/${user_info["AccountId"]}/${user_info["CompanyId"]}/${search.searchData.Id}`,
      body: null,
    })
      .then((res: any) => {
        for (var i in array) {
          if (array[i].title === "Service Job") {
            array[i].count = res.Result.ServiceJobCount;
          } else if (array[i].title === "Sales Call") {
            array[i].count = res.Result.SalesCallCount;
          } else if (array[i].title === "Contacts Invoices") {
            array[i].count = res.Result.ContractInvoicesCount;
          } else if (array[i].title === "Contracts") {
            array[i].count = res.Result.ContractCount;
          } else if (array[i].title === "Equipment") {
            array[i].count = res.Result.EquipmentCount;
          } else if (array[i].title === "Proposal") {
            array[i].count = res.Result.ProposalCount;
          } else if (array[i].title === "Projects") {
            array[i].count = res.Result.ProjectCount;
          } else if (array[i].title === "Prospect Note") {
            array[i].count = res.Result.ProspectNoteCount;
          } else if (array[i].title === "Document") {
            array[i].count = res.Result.DocumenatCount;
          } else if (array[i].title === "Recommendations") {
            array[i].count = res.Result.RecommandationCount;
          } else if (array[i].title === "Contacts") {
            array[i].count = res.Result.ContactCount;
          } else if (array[i].title === "Communication") {
            array[i].count = res.Result.CommunicationCount;
          }
        }
        setOverViewData([...overviewData]);
      })
      .catch((e) => {
        console.log("e", e);
      }),
  ];

  return (
    <>
      <div className="row main-overview mx-0 mt-4 mx-2">
        {overviewData.map((res, i: number) => {
          return (
            <div
              key={"over_view_" + i}
              className="box-main-view cursor-pointer col-lg-3 col-md-4 mx-0 mt-0 pb-1 mb-3"
              onClick={() => data.sd_master.Id && history(`${res.path}`)}
            >
              <div className="box-view">
                <img src={`${res.image}`} className="data-icon" />
                <div className="count-text">{res.count}</div>
                <div className="services-title-text">{res.title}</div>
                <img
                  src={
                    require("../../../assets/images/right-arrow-blue.svg")
                      .default
                  }
                  className="blue-arrow-icon"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OverView;
