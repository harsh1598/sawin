import { useEffect, useState } from "react";
import WebService from "../../../utility/WebService";
import Loader from "../../Loader/Loader";
import "./ServiceMaster.scss";
import { useNavigate, useOutletContext } from "react-router-dom";
import HelperService from "../../../utility/HelperService";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import RightBlueIcon from "../../../assets/images/right-blue.svg";
import LeftBlueIcon from "../../../assets/images/left-blue.svg";
import LeftIcon from "../../../assets/images/left-light-icon.svg";
import RightIcon from "../../../assets/images/right-light-icon.svg";
import DraggableModal from "../../DraggableModal/DraggableModal";
import { SDMaster } from "../../../action/CommonAction";
import VipIcon from "../../../assets/images/vip-crown.svg";
import GoldIcon from "../../../assets/images/group.svg";
import SeniorIcon from "../../../assets/images/people.svg";
import SilverIcon from "../../../assets/images/game-point.svg";
import FireFightIcon from "../../../assets/images/first-responder.svg";
import { RootState } from "../../../config/Store";
import { APIState } from "../../../reducer/CommonReducer";
import moment from "moment";

const ServiceMaster = () => {
  const [isLoading, setLoading] = useState(false);
  const [isShowEditModel, setShowEditModel] = useState(false);
  const [addressSuggestionModal, setAddressSuggestionModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(Object);
  const [sales, setSales] = useState<string[]>([]);
  const [address, setAddress] = useState<any[]>([]);
  const [sameAddress, setSameAddress] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "{}");
  const [addressCount, setAddressCount] = useState(0);
  const dispatch: Dispatch<any> = useDispatch();
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  let history = useNavigate();
  const searchData: any = useOutletContext();

  useEffect(() => {
    const value = JSON.stringify(data?.sd_master) === "{}";
    if (data?.address !== "" || (data?.address !== null && data?.address)) {
      setCustomerInfo(data.sd_master);
      setAddress(data.address);
      setSales(data.ar_master);
    } else if (data?.address !== null && searchData) {
      getCustomerInformation(null);
    }
  }, [searchData, data]);

  const getCustomerInformation = (id: any) => {
    setLoading(true);
    WebService.getAPI({
      action: `SDserviceMaster/${id === null ? searchData["Id"] : id}_${
        user_info["AccountId"]
      }_${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        setCustomerInfo(res);
        getSales(res.ARCustomerMaster.QBId, res);
      })
      .catch((e) => {
        console.log("e", e);
        setLoading(false);
      });
  };

  const getAddress = (customerData: any, salesData: any) => {
    setLoading(true);
    WebService.getAPI({
      action: `SDserviceMaster/GetSmListByArV2/${searchData?.ARCustomerMasterId}/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        setAddress(res);
        dispatch(
          SDMaster({
            SDserviceMaster: customerData,
            ARCustomerMaster: salesData,
            Address: res,
          })
        );
        setLoading(false);
      })
      .catch((e) => {
        console.log("e", e);
        setLoading(false);
      });
  };

  const getSales = (id: string, data: any) => {
    setLoading(true);
    WebService.getAPI({
      action: `ARCustomerMaster/GetARAgingValues/${user_info["AccountId"]}/${user_info["CompanyId"]}/${id}`,
      body: null,
    })
      .then((res: any) => {
        setSales(res);
        getAddress(data, res);
      })
      .catch((e) => {
        console.log("e", e);
        setLoading(false);
      });
  };

  const onChangeAddress = (type: string) => {
    var total_count = address.length;
    if (type === "FORWARD" && addressCount <= total_count) {
      setAddressCount(addressCount + 1);
      getCustomerInformation(address[addressCount + 1].SMId);
    } else if (type === "BACKWARD" && addressCount <= total_count) {
      setAddressCount(addressCount - 1);
      getCustomerInformation(address[addressCount - 1].SMId);
    }
  };

  const getImage = (type: any) => {
    if (type === "VIP") {
      return VipIcon;
    } else if (type === "Gold") {
      return GoldIcon;
    } else if (type === "Senior_Citizen") {
      return SeniorIcon;
    } else if (type === "Silver") {
      return SilverIcon;
    } else if (type === "Fire_fighter") {
      return FireFightIcon;
    }
  };

  const closeModal = (value: any) => {
    setShowEditModel(value);
    setAddressSuggestionModal(!addressSuggestionModal);
  };

  const CloseAddressModal = (value: any) => {
    setAddressSuggestionModal(value);
  };

  return (
    <>
      <Loader show={isLoading} />
      <DraggableModal
        isOpen={isShowEditModel}
        onClose={closeModal}
        title="Edit Address"
        type="ADDRESS"
        previousData={address && address[addressCount]}
      />
      <DraggableModal
        isOpen={addressSuggestionModal}
        onClose={CloseAddressModal}
        title="Edit Address"
        type="GOOGLE_ADDRESS"
        previousData={null}
      />
      <div>
        <div className="address-view col-10 card-shadow">
          <p className="ci-heading pt-2">Customer Information</p>
          <div className="name-view">
            <div className="row col-12">
              <div className="col-10 mt-2">
                <span className="company-name">
                  {customerInfo?.ARCustomerMasterId} {customerInfo.CompanyName}
                </span>
              </div>
              {/* <div className='col-2 d-flex justify-content-end mt-2' onClick={() => history(`/edit-address/` + address[addressCount]['SMId'])}>
                                <img src={require('../../../assets/images/edit.svg').default} alt='edit' className='edit-icon' />
                            </div> */}
            </div>
            <p className="customer-name">
              {customerInfo.ARCustomerMaster?.FirstName}{" "}
              {customerInfo.ARCustomerMaster?.LastName}
            </p>
            <div className="col-12 row">
              <div className="col-5">
                <div className="contact">
                  {" "}
                  <img
                    src={require("../../../assets/images/call.svg").default}
                    alt="call"
                  />{" "}
                  {customerInfo.WorkPhone &&
                    HelperService.getFormattedContact(customerInfo.WorkPhone)}
                </div>
              </div>
              <div className="col-7">
                {customerInfo.CellPhone && (
                  <div className="contact">
                    <img
                      src={
                        require("../../../assets/images/phone-black.svg")
                          .default
                      }
                      alt="phone-black"
                    />{" "}
                    {customerInfo.CellPhone &&
                      HelperService.getFormattedContact(customerInfo.CellPhone)}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 row email-view">
              <div className="col-8">
                {customerInfo.Email && (
                  <div className="contact" style={{ marginLeft: 16 }}>
                    <img
                      src={require("../../../assets/images/message.png")}
                      alt="message"
                    />{" "}
                    {customerInfo.Email}
                  </div>
                )}
              </div>
              <div className="col-4 d-flex justify-content-end">
                {customerInfo.LocationClassifications?.map(
                  (res: any, index: number) => {
                    return (
                      <img
                        key={"icon_" + index}
                        src={getImage(res.IconType)}
                        alt="icon"
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className="service-address-view col-12 ">
            <div className="col-12 row">
              <div className="service-addrees col-7">Service Address</div>
              <div
                className="d-flex row col-5 text-end"
                style={{ marginTop: 16 }}
              >
                <div className="address-count">
                  <img
                    src={addressCount === 0 ? LeftIcon : LeftBlueIcon}
                    height={10}
                    width={10}
                    style={{ marginBottom: 4, marginRight: 3 }}
                    onClick={() =>
                      addressCount === 0 ? null : onChangeAddress("BACKWARD")
                    }
                    alt="left-icon"
                  />
                  {addressCount + 1} of {address?.length}
                  <img
                    src={
                      addressCount + 1 === address?.length
                        ? RightIcon
                        : RightBlueIcon
                    }
                    height={10}
                    width={10}
                    style={{ marginBottom: 4, marginLeft: 3 }}
                    onClick={() =>
                      addressCount + 1 === address.length
                        ? null
                        : onChangeAddress("FORWARD")
                    }
                    alt="right-icon"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 d-flex row">
              <div className="col-10">
                {address?.length > 0 &&
                  address?.map((res: any, index: number) => {
                    return (
                      <div key={"address_" + index} className="company-name">
                        {addressCount === index ? (
                          <div>
                            <div className="address">
                              {customerInfo.Address1} {customerInfo.Address2}
                            </div>
                            <div className="address">
                              {customerInfo.City} {customerInfo.State}
                            </div>
                            <div className="address">{customerInfo.Zip}</div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
              </div>
              <div
                className="col-2 d-flex justify-content-end mt-4"
                onClick={() =>
                  history(
                    `/edit-service-master/` + address[addressCount]["SMId"]
                  )
                }
              >
                <img
                  src={require("../../../assets/images/edit.svg").default}
                  alt="edit"
                  className="edit-icon"
                  style={{ marginLeft: 2 }}
                />
              </div>
            </div>
            <div className="col-12 d-flex row">
              <div
                className="google-button ml-27"
                style={{
                  borderColor:
                    customerInfo.IsGoogleVerified === null
                      ? "#D9D9D9"
                      : "#0074CC",
                }}
              >
                <div className="google-text">
                  Google
                  <input
                    type="checkbox"
                    disabled={
                      customerInfo.IsGoogleVerified === null ? true : false
                    }
                    checked={true}
                    readOnly={true}
                    className="google-checkbox"
                  />
                </div>
              </div>
              <div
                className="google-button"
                style={{
                  borderColor:
                    customerInfo.IsGoogleVerified === null
                      ? "#D9D9D9"
                      : "#0074CC",
                }}
              >
                <div className="google-text">
                  Customer
                  <input
                    type="checkbox"
                    disabled={
                      customerInfo.IsGoogleVerified === null ? true : false
                    }
                    checked={true}
                    readOnly={true}
                    className="google-checkbox"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="address-view col-10 mt-2 card-shadow">
          <div className="col-12">
            <div className="col-12 d-flex justify-content-between">
              <div className="billing-address">Billing Address</div>
              {/* <div className='same-as'><input type='checkbox' onClick={() => setSameAddress(!sameAddress)} /> Same as service address</div> */}
            </div>
            <div className="billing-company-name">
              {customerInfo?.ARCustomerMasterId}{" "}
              {customerInfo.ARCustomerMaster?.CompanyName}
            </div>
            <div className="billing-name">
              {customerInfo.ARCustomerMaster?.FirstName}{" "}
              {customerInfo.ARCustomerMaster?.LastName}
            </div>
            {sameAddress === false ? (
              <div className="row col-12 d-flex">
                <div className="col-10">
                  <div className="address ml-17">
                    {
                      customerInfo.ARCustomerMaster?.LocationMaster
                        ?.AddressLine1
                    }
                  </div>
                  <div className="address ml-17">
                    {customerInfo.ARCustomerMaster?.LocationMaster?.City}{" "}
                    {customerInfo.ARCustomerMaster?.LocationMaster?.State}
                  </div>
                  <div className="address ml-17">
                    {customerInfo.ARCustomerMaster?.LocationMaster?.Zip}
                  </div>
                </div>
                <div
                  className="col-2 d-flex justify-content-end mt-4"
                  onClick={() =>
                    history(`/edit-bill-info/` + address[addressCount]["SMId"])
                  }
                >
                  <img
                    src={require("../../../assets/images/edit.svg").default}
                    alt="edit"
                    className="edit-icon"
                  />
                </div>
              </div>
            ) : null}
            <div className="col-12 row d-flex">
              <div className="col-10">
                <div className="payment-terms">Payment Terms</div>
                <div className="cod">
                  {customerInfo.ARCustomerMaster?.TermCode}
                </div>
              </div>
              {customerInfo?.ARCustomerMaster?.AccountOnCreditHold === true && (
                <div className="col-2 d-flex justify-content-end mt-3">
                  <img
                    src={
                      require("../../../assets/images/stop-sign.svg").default
                    }
                    width={20}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="price-view rounded-bottom">
            <div className="col-12 first-price-view row">
              {sales.length > 0 &&
                sales?.map((res: any, index: number) => {
                  return (
                    <div
                      key={"price_" + index}
                      className="col-4 second-price-view"
                    >
                      <div className="price-title">{res["Period"]}</div>
                      <div className="price">
                        {HelperService.getCurrencyFormatter(res["Value"])}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="12 d-flex justify-content-end align-items-center">
              <div className="last-refreshed">
                Last Refreshed{" "}
                {customerInfo?.UpdatedOn &&
                  moment(customerInfo?.UpdatedOn).format("MMM DD,YYYY HH:mm A")}
              </div>
              <img
                src={require("../../../assets/images/refresh.svg").default}
                className="refresh-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceMaster;
