import React, { useEffect, useState, useRef } from "react";
import { Label } from "../../components/Label/Label";
import "./CallBugetModel.scss";
import { Button } from "../../components/Button/Button";
import { right } from "@popperjs/core";
import leftIcon from "../../assets/images/new-left-arrow.svg";
import RightIcon from "../../assets/images/new-right-arrow.svg";
import WebService from "../../utility/WebService";
import moment from "moment";
import { Controller } from "react-hook-form";
import SawinSelect from "../Select/SawinSelect";
import loader from '../../assets/images/loader.gif'

interface PropData {
  close: any;
}

const CallBugetModel = (props: PropData) => {
  const onCancel = () => {
    props.close();
  };
  const [zoneList, setZoneList] = useState<any>([]);
  const [callBudget, setCallBudget] = useState<any[]>([]);
  const [trades, setTrades] = useState<any[]>([]);
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "{}");
  const [zone, setZone] = useState(true);
  const [zoneTrade, setZoneTrade] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  const [zoneServiceMaintainance, setServiceMaintainance] = useState(false);
  const date = useRef<Date>(new Date());

  useEffect(() => {
    getCallBudget(0);
    getZoneList();
    getTrades();
  }, []);
  const getZoneList = () => {
    setShowLoader(true);
    WebService.getAPI({
      action: `SetupSDZone/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].Zone, value: res[i].ZoneDescr });
        }
        setZoneList(array);
        setShowLoader(false);
      })
      .catch((e) => {
        console.log("e", e);
        setShowLoader(false);
      });
  };
  const getCallBudget = (days: number) => {
    setShowLoader(true);
    console.log(days + "   " + date.current)
    date.current = moment(date.current).add(days, 'd').toDate();
    console.log(days + "   " + date.current)

    const obj = {
      AccountId: "340",
      CompanyId: "1",
      Zone: "TX",
      SDTechTradeId: "0",
      ServiceDate: moment(date.current).format('MM/DD/YYYY'),
      IsNext: "true",
    };

    return WebService.postAPI({
      action: `SDCallBudget/GetCallBudgetByTradeCategory`,
      body: obj,
    })
      .then((res: any) => {
        setCallBudget(res);
        setShowLoader(false);
      })
      .catch((e) => {
        setShowLoader(false);
        return e;
      });
  };

  const getTrades = () => {
    setShowLoader(true);
    WebService.getAPI({
      action: `SetupSDTechTrade/${user_info["AccountId"]}/${user_info["CompanyId"]}/true`,
      body: null
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].TechTrade, value: res[i].Description });
        }
        setTrades(array)
        setShowLoader(false);
      })
      .catch((e) => {
        setShowLoader(false);
      })
  }


  const onCheck = (value: string) => {
    if (value === 'ZONE') {
      setZone(true)
      setZoneTrade(false)
      setServiceMaintainance(false)
    } else if (value === 'ZONE_TRADE') {

      setZone(false)
      setZoneTrade(true)
      setServiceMaintainance(false)
    } else {
      setZone(false)
      setZoneTrade(false)
      setServiceMaintainance(true)
    }
  }
  const getGridData = (value: any) => {
    if (zoneServiceMaintainance) {
      var regularCallCount = Number(value.TotalRegularCallsCanBeBooked) + Number(value.RegularTypeAdjustmentCount);
      var maintainanceCallCount = Number(value.TotalMaintainanceCallsCanBeBooked) + Number(value.MaintainanceTypeAdjustmentCount);
      return regularCallCount + ' | ' + maintainanceCallCount;
    } else {
      return Number(value.LiveCount) + Number(value.AdjustmentCount);
    }
  }
  return (
    <>
      <div className="call-buget-modal form-style">
        <div className="col-12 row  row margin-bottom-10 box">
          <div className="col-4">
            <input name="ZONE" type="radio" checked={zone} onChange={() => onCheck('ZONE')} className="checkbox" />
            <span> By Zone</span>
          </div>
          <div className="col-4">
            <input name="ZONE_TRADE" type="radio" checked={zoneTrade} onChange={() => onCheck('ZONE_TRADE')} className="checkbox" disabled={true} />
            <span> By Zone|Trade</span>
          </div>
          <div className="col-4">
            <input name="ZONE_SERVICE_MAINTAINANCE" checked={zoneServiceMaintainance} onChange={() => onCheck('ZONE_SERVICE_MAINTAINANCE')} type="radio" className="checkbox" />
            <span> By Zone [Service / Maintainance]</span>
          </div>
        </div>
        <div className=" col-12 row">
          <div className="col-6">
            <Label title="Zone" showStar={true} />
            {/* <Controller
              control={control}
              name="Zone"
              render={({ field }) => ( */}
            <SawinSelect
              options={zoneList}
              disValue="BreakName"
              value="BreakCode"
              onChange={(data: any) => console.log(data.id)}
            />
            {/* )}
            /> */}
          </div>
          <div className="col-6">
            <Label title="Trade" />
            <SawinSelect
              options={trades}
              disValue="BreakName"
              value="BreakCode"
              onChange={(data: any) => console.log(data.id)}
            />
          </div>
        </div>

        <div className="row mt-5">
          <b className="col-8" style={{ fontSize: 13 }}>
            Please select task code to view call budget by Zone | Trade
          </b>
          <div className="col-4 row" style={{ textAlign: right, fontSize: 12 }}>
            <span className="col-8"> View Next / Prev Week</span>
            <div className="col-2 m-0 p-0" onClick={() => getCallBudget(-7)}>
              {" "}
              <img
                src={leftIcon}
                id="img_downarrow"
                height={20}
                className="deleteicon"
                alt="downarrow"
                style={{ marginLeft: '8px' }}
              />
            </div>
            <div className="col-2" onClick={() => getCallBudget(7)}>
              <img
                src={RightIcon}
                id="img_downarrow"
                height={20}
                className="deleteicon"
                alt="downarrow"
              />
            </div>
          </div>
        </div>

        {ShowLoader === true ?

          <div className="">
            <div ></div>
            <div style={{ textAlign: 'center', marginTop: '10%' }}>
              <img style={{ position: 'relative' }} src={loader} alt="No loader found" />
              <div style={{ position: 'relative', color: 'white' }}>Loading...</div>
            </div>
          </div > :

          <div className="mb-1 mt-1">
            <div className="table-responsive">
              <div className="dataTables_wrapper dt-bootstrap4">
                <table
                  className="call-bugest-table"
                  role="grid"
                  aria-describedby="example_info"
                >
                  <thead>
                    <tr>
                      <th style={{ verticalAlign: "middle" }} rowSpan={2}>
                        <label>Time Slot</label>
                      </th>
                      <th colSpan={9}>Service Date</th>
                    </tr>
                    <tr>
                      {callBudget.map((res, i) => {
                        return (
                          <th>{moment(res.ServiceDate).format("ddd, MMM DD")}</th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {callBudget.map((res, i) => {
                      return res.CallBudgetCountPerTimePromisedCode[i] ? (
                        <tr>
                          <td>
                            {
                              res.CallBudgetCountPerTimePromisedCode[i]
                                .TimePromisedCode
                              + ' ' +
                              res.CallBudgetCountPerTimePromisedCode[i]
                                .TimePromisedCodeDescription
                            }
                          </td>
                          <td> {getGridData(callBudget[0].CallBudgetCountPerTimePromisedCode[i])}</td>
                          <td> {getGridData(callBudget[1].CallBudgetCountPerTimePromisedCode[i])}</td>
                          <td> {getGridData(callBudget[2].CallBudgetCountPerTimePromisedCode[i])}</td>
                          <td> {getGridData(callBudget[3].CallBudgetCountPerTimePromisedCode[i])}</td>
                          <td> {getGridData(callBudget[4].CallBudgetCountPerTimePromisedCode[i])}</td>
                          <td> {getGridData(callBudget[5].CallBudgetCountPerTimePromisedCode[i])}</td>
                        </tr>
                      ) : (
                        ""
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        <div className="col-12 mt-4 d-flex justify-content-end row mb-3">
          <div className="col-2">
            <Button
              size="small"
              onClick={() => onCancel()}
              label="Close"
              b_type="CANCEL"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CallBugetModel;
