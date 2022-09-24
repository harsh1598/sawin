import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import BookNewServiceCall from "../BookNewServiceCall/BookNewServiceCall";
import OverView from "../OverView/OverView";
import "./MainMasterComponent.scss";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";
import SendTextMessage from "../../SendTextMessagesidebar/SendTextMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import { APIState } from "../../../reducer/CommonReducer";
import HelperService from "../../../utility/HelperService";


const dropDownData = [
  { id: 1, title: "New Service Master", path: "/new-service-master" },
  { id: 2, title: "Add Sub Service Master", path: "" },
  { id: 3, title: "New Service For Same Customer Master", path: "" },
  { id: 4, title: "New Customer Master", path: "" },
  { id: 5, title: "Send Text Message", path: "" },
  { id: 6, title: "Sync to Quickbooks", path: "" },
];

const MainMasterComponent = () => {
  const [dropDown, setDropDown] = useState<any[]>(dropDownData);
  const [isShow, setIsShow] = useState(false);
  const [sendTextMessage, setSendTextMessage] = useState(false);
  let history = useNavigate();
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);

  const isShowcross = () => {
    setIsShow(!isShow);
  };

  const closeSendTextMessageModal = (value: any, type: any) => {
    setSendTextMessage(value)
  };

  const onClick = (i: number) => {
    if (i == 0) {
      history(dropDownData[i].path)
    }
    else if (i == 4) {
      setSendTextMessage(!sendTextMessage)
    }

  }

  let domNode = useClickOutside(() => {
    setIsShow(false)
  }, this);

  return (
    <>

      <div className="service-modal-tab">
        <div className="text-end row icon-view">
          {isShow === false ? (
            <div>
              <img
                onClick={() => isShowcross()}
                src={
                  require("../../../assets/images/blue-hamburg-icon.svg")
                    .default
                }
                className="hamburg-icon"
                alt="hamburg"
              />
            </div>
          ) : (
            <div ref={domNode} style={{ position: "relative" }}>
              <img
                onClick={() => isShowcross()}
                src={
                  require("../../../assets/images/cross-icon-new.svg").default
                }
                className="hamburg-icon"
                alt="hamburg"
              />

              <ul className="service-option">
                {dropDown.map((res, index: number) => (index == 0 || data && data.sd_master && data.sd_master.Id ?
                  (<li
                    onClick={() => onClick(index)}
                    className="option" key={index}
                  > <span className="text-start ms-2"> {res.title}</span>
                  </li>) : (<li
                    className="disable-option" key={index} >
                    <span className="text-start ms-2"> {res.title}</span>
                  </li>)
                ))}
              </ul>

            </div>
          )}
        </div>
        <Tabs defaultActiveKey="Overview" className="tab-style-1 mt-0">
          <Tab eventKey="home" title="Book New Service Job" disabled={HelperService.isEmptyObject(data.sd_master)} > 
            <BookNewServiceCall />
          </Tab>
          <Tab eventKey="Overview" title="Overview">
            <OverView />
          </Tab>
        </Tabs>
      </div>

      <SendTextMessage
        isShow={sendTextMessage}
        title="Send Text Message"
        isClose={closeSendTextMessageModal}
      />
    </>
  );
};

export default MainMasterComponent;
