import { useState, useEffect } from "react";
import "./EditAddress.scss";
import { Label } from "../../../components/Label/Label";
import { Button } from "../../../components/Button/Button";
import { useSelector } from 'react-redux';
import { RootState } from '../../../config/Store';
import { AddressState, APIState } from '../../../reducer/CommonReducer';

import { useParams } from "react-router-dom";
import WebService from "../../../utility/WebService";
import Loader from "../../../components/Loader/Loader";
import { useForm, Controller } from "react-hook-form";
import DraggableModal from "../../../components/DraggableModal/DraggableModal";
import SawinSelect from "../../../components/Select/SawinSelect";

const EditAddress = () => {
  const { id } = useParams();
  const { register, handleSubmit, watch, reset, control } = useForm();
  const watchAllFields = watch();
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "{}");
  const [isShowGoogleModel, setShowGoogleModel] = useState(false);
  const addAddress: any = useSelector<RootState, AddressState>(state => state.address)
  const [isShowEditModel, setShowEditModel] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [termsList, setTermsList] = useState<any>([]);
  const [zoneList, setZoneList] = useState<any>([]);
  const [address, setAddress] = useState<any>({});
  const [addressModalData, setAddressModalData] = useState();


  useEffect(() => {
    if (window.location.pathname !== '/new-service-master') {
      getAddressDetail();
    } else {
      if (addAddress.addressData.type === 'SERVICE_LOCATION') {
        setAddress(addAddress.addressData.ARCustomerMaster)
      } else {
        setAddress(addAddress.addressData)
      }
    }
    getTermsList();
    getZoneList();
  }, [addAddress]);

  useEffect(() => {
    if (window.location.pathname !== '/new-service-master') {
      reset(address);
    }
  }, [address]);
  
  const goBack = () => {
    window.history.back();
  };

  const getAddressDetail = () => {
    setLoading(true);
    WebService.getAPI({
      action: `SDserviceMaster/${id}_${user_info["AccountId"]}_${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        setAddress(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log("e", e);
        setLoading(false);
      });
  };

  const getTermsList = () => {
    setLoading(true);
    WebService.getAPI({
      action: `SetupARPaymentTerms/GetActive/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        setTermsList(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log("e", e);
        setLoading(false);
      });
  };
  const getZoneList = () => {
    setLoading(true);
    WebService.getAPI({
      action: `SetupSDZone/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].Zone, value: res[i].ZoneDescr })
        }
        setZoneList(array);
        setLoading(false);
      })
      .catch((e) => {
        console.log("e", e);
        setLoading(false);
      });
  };
  const closeAddressModel = (value: any, showGoogleModal: any, data: any) => {
    setShowEditModel(value);
    if (showGoogleModal === 'ON_SAVE') {
      setShowGoogleModel(true)
      setAddressModalData(data)
    }

  };
  const closeGoogleModel = (value: any) => {
    setShowGoogleModel(value);
  };
  const onSubmit = (data: any) => {
    setLoading(true);
    WebService.putAPI({
      action: `SDServiceMaster/${id}_${user_info["AccountId"]}_${user_info["CompanyId"]}/PutStep1`,
      body: data,
    })
      .then((res: any) => {
        getAddressDetail();
        reset();
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };


  const onAddAddress = (type: string) => {
    setShowEditModel(!isShowEditModel)
    localStorage.setItem('MODAL_TYPE', type)
  }


  return (
    <>
      <Loader show={isLoading} />
      <div className="edit-address">
        <DraggableModal
          isOpen={isShowEditModel}
          onClose={closeAddressModel}
          title="Add New Service Master"
          type="ADDRESS"
          previousData={address}
        />
        <DraggableModal
          isOpen={addressModalData ? isShowGoogleModel : false}
          onClose={closeGoogleModel}
          title="Google Address"
          type="GOOGLE_ADDRESS"
          previousData={addressModalData}
        />
        <div className="main-edit-address">
          <div onClick={goBack} className="back-arrow">
            <img
              src={
                require("../../../assets/images/left-arrow-black.svg").default
              }
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12 row">
              {
                window.location.pathname.includes('/edit-service-master/') || window.location.pathname.includes('/new-service-master') ?
                  <div className={window.location.pathname.includes('/new-service-master') ? 'col-6' : 'col-12'}>
                    <div className="service-location-info">
                      Service Location Info
                    </div>

                    <div className="service-location-form form-style">
                      <div className="col-12 row">
                        <div className="col-12">
                          <Label title="Company" showStar={true} />
                          <input
                            className="form-control input"
                            type="text"
                            {...register("CompanyName", { required: false })}
                            placeholder="Company Name"
                          />
                        </div>
                      </div>
                      <Label title="Name" showStar={true} />
                      <div className="col-12 row">
                        <div className="col-6">
                          <input
                            className="form-control input"
                            type="text"
                            {...register("FirstName", { required: false })}
                            placeholder="First Name"
                          />
                        </div>
                        <div className="col-6">
                          <input
                            className="form-control input"
                            type="text"
                            {...register("LastName", { required: false })}
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="horizontal-line" />
                      <div className="d-flex row col-12">
                        <div className="col-6">
                          <Label title="Address" showStar={true} />
                        </div>
                        {window.location.pathname.includes('/new-service-master') && !address?.Address1 && <div
                          className="col-6 d-flex justify-content-end add-button-view"
                        >
                          <div
                            className="add-button d-flex"
                            onClick={() => onAddAddress('SERVICE_LOCATION')}
                          >
                            + Add
                          </div>
                        </div>}
                      </div>
                      {watchAllFields?.ARCustomerMaster?.DefaultBillToFromServiceLocation === false ?
                        <div>
                          {address?.Address1 && <div className="service-location-address col-12 row">
                            <div className="col-11">
                              <div className="address-text">{address?.Address1} {address.Address2}</div>
                              <div className="address-text">{address.City}, {address.ZipCode}, {address.State}</div>
                            </div>
                            <div className="col-1 text-end" onClick={() => address.length === 0 ? null : setShowEditModel(!isShowEditModel)}>
                              <img src={require('../../../assets/images/edit.svg').default} alt='edit' className='edit-icon' />
                            </div>
                          </div>}
                        </div> : <div>
                          {address?.ARCustomerMaster?.Address1 &&
                            <div>
                              <div className="service-location-address col-12 row">
                                <div className="col-11">
                                  <div className="address-text">{address?.ARCustomerMaster?.Address1} {address?.ARCustomerMaster?.AddressLine2}</div>
                                  <div className="address-text">{address?.ARCustomerMaster?.City} {address?.ARCustomerMaster?.Zip} {address?.ARCustomerMaster?.State}</div>
                                </div>
                                <div className="col-1 text-end">
                                  <img src={require('../../../assets/images/edit.svg').default} alt='edit' className='edit-icon' />
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                      }
                      <div>
                      </div>
                      <div className="horizontal-line" />
                      <div className="col-12 row">
                        <div className="col-6">
                          <Label title="Primary Number" />
                          <input
                            className="form-control input"
                            type="text"
                            {...register("WorkPhone", { required: false })}
                            placeholder="Primary Number"
                          />
                        </div>
                        <div className="col-6">
                          <Label title="Secondary Number" />
                          <input
                            className="form-control input"
                            type="text"
                            {...register("HomePhone", { required: false })}
                            placeholder="Secondary Number"
                          />
                        </div>
                      </div>

                      <div className="col-12 row">
                        <div className="col-12">
                          <Label title="Email" />
                          <input
                            className="form-control input"
                            type="text"
                            {...register("Email", { required: false })}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-12 row">
                        <div className="col-6">
                          <Label title="Zone" showStar={true} />
                          <Controller
                            control={control}
                            name="Zone"
                            render={({ field }) => (
                              <SawinSelect
                                options={zoneList}
                                selected={address && address.Zone}
                                disValue="BreakName"
                                value="BreakCode"
                                onChange={(data: any) => field.onChange(data.id)}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div> : null
              }
              {
                window.location.pathname.includes('/edit-bill-info/') || window.location.pathname.includes('/new-service-master') ?
                  <div className={window.location.pathname.includes('/new-service-master') ? 'col-6' : 'col-12'}>
                    <div className="col-12 d-flex row">
                      <div className="service-location-info col-4">
                        Bill To Info
                      </div>
                      {window.location.pathname.includes('/new-service-master') &&
                        <div className="col-7 text-end default-service">
                          Default from service location
                          <input
                            type="checkbox"
                            className="checkbox"
                            {...register(
                              "ARCustomerMaster.DefaultBillToFromServiceLocation",
                              { required: false }
                            )}
                          />
                        </div>}
                    </div>
                    {
                      watchAllFields?.ARCustomerMaster?.DefaultBillToFromServiceLocation === false ?
                        <div className="service-location-form form-style">
                          <div className="col-12 row">
                            <div className="col-12">
                              <Label title="Company" showStar={true} />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("ARCustomerMaster.CompanyName", {
                                  required: false,
                                })}
                                placeholder="Company Name"
                              />
                            </div>
                          </div>
                          <Label title="Name" showStar={true} />
                          <div className="col-12 row">
                            <div className="col-6">
                              <input
                                className="form-control input"
                                type="text"
                                {...register("ARCustomerMaster.FirstName", {
                                  required: false,
                                })}
                                placeholder="First Name"
                              />
                            </div>
                            <div className="col-6">
                              <input
                                className="form-control input"
                                type="text"
                                {...register("ARCustomerMaster.LastName", {
                                  required: false,
                                })}
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                          <div className="horizontal-line" />
                          <div className="d-flex row col-12">
                            <div className="col-6">
                              <Label title="Address" showStar={true} />
                            </div>
                            {window.location.pathname.includes('/new-service-master') && !address?.ARCustomerMaster?.Address1 && <div
                              className="col-6 d-flex justify-content-end add-button-view"
                            >
                              <div
                                className="add-button d-flex"
                                onClick={() => onAddAddress('BILL_INFO')}
                              >
                                + Add
                              </div>
                            </div>}
                          </div>
                          {address?.ARCustomerMaster?.Address1 &&
                            <div>
                              <div className="service-location-address col-12 row">
                                <div className="col-11">
                                  <div className="address-text">{address?.ARCustomerMaster?.Address1} {address?.ARCustomerMaster?.AddressLine2}</div>
                                  <div className="address-text">{address?.ARCustomerMaster?.City} {address?.ARCustomerMaster?.Zip} {address?.ARCustomerMaster?.State}</div>
                                </div>
                                <div className="col-1 text-end">
                                  <img src={require('../../../assets/images/edit.svg').default} alt='edit' className='edit-icon' />
                                </div>
                              </div>
                            </div>}
                          <div className="horizontal-line" />

                          <div className="col-12 row">
                            <div className="col-6">
                              <Label title="Primary Number" />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("ARCustomerMaster.WorkPhone", {
                                  required: false,
                                })}
                                placeholder="Primary Number"
                              />
                            </div>
                            <div className="col-6">
                              <Label title="Secondary Number" />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("ARCustomerMaster.HomePhone", {
                                  required: false,
                                })}
                                placeholder="Secondary Number"
                              />
                            </div>
                          </div>
                          <div className="col-12 row">
                            <div className="col-12">
                              <Label title="Email" />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("ARCustomerMaster.Email", {
                                  required: false,
                                })}
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="col-12 row">
                            <div className="col-6">
                              <Label title="Terms" showStar={true} />
                              <select
                                className="form-control custom-select"
                                {...register("TermDescription", { required: false })}
                                placeholder="Terms"
                              >
                                {termsList.map((res: any) => {
                                  return (
                                    <option value={res["TermCode"]}>
                                      {res["TermDescription"]}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-6">
                              <Label title="Credit Limit" />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("ARCustomerMaster.CreditLimit", {
                                  required: false,
                                })}
                                placeholder="Credit Limit"
                              />
                            </div>
                          </div>
                        </div>
                        :
                        <div className="service-location-form form-style">
                          <div className="col-12 row">
                            <div className="col-12">
                              <Label title="Company" showStar={true} />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("CompanyName", {
                                  required: false,
                                })}
                                placeholder="Company Name"
                              />
                            </div>
                          </div>
                          <Label title="Name" showStar={true} />
                          <div className="col-12 row">
                            <div className="col-6">
                              <input
                                className="form-control input"
                                type="text"
                                {...register("FirstName", {
                                  required: false,
                                })}
                                placeholder="First Name"
                              />
                            </div>
                            <div className="col-6">
                              <input
                                className="form-control input"
                                type="text"
                                {...register("LastName", {
                                  required: false,
                                })}
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                          <div className="horizontal-line" />
                          <div className="d-flex row col-12">
                            <div className="col-6">
                              <Label title="Address" showStar={true} />
                            </div>
                            <div
                              className="col-6 d-flex justify-content-end add-button-view"
                            >
                              <div
                                className="add-button d-flex"
                                onClick={() => setShowEditModel(!isShowEditModel)}
                              >
                                + Add
                              </div>
                            </div>
                          </div>
                          {address?.ARCustomerMaster?.Address1 &&
                            <div>
                              <div className="service-location-address col-12 row">
                                <div className="col-11">
                                  <div className="address-text">{address?.ARCustomerMaster?.Address1} {address?.ARCustomerMaster?.AddressLine2}</div>
                                  <div className="address-text">{address?.ARCustomerMaster?.City} {address?.ARCustomerMaster?.Zip} {address?.ARCustomerMaster?.State}</div>
                                </div>
                                <div className="col-1 text-end">
                                  <img src={require('../../../assets/images/edit.svg').default} alt='edit' className='edit-icon' />
                                </div>
                              </div>
                            </div>}
                          <div className="horizontal-line" />

                          <div className="col-12 row">
                            <div className="col-6">
                              <Label title="Primary Number" />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("WorkPhone", {
                                  required: false,
                                })}
                                placeholder="Primary Number"
                              />
                            </div>
                            <div className="col-6">
                              <Label title="Secondary Number" />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("HomePhone", {
                                  required: false,
                                })}
                                placeholder="Secondary Number"
                              />
                            </div>
                          </div>

                          <div className="col-12 row">
                            <div className="col-12">
                              <Label title="Email" />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("Email", {
                                  required: false,
                                })}
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="col-12 row">
                            <div className="col-6">
                              <Label title="Terms" showStar={true} />
                              <select
                                className="form-control custom-select"
                                {...register("TermDescription", { required: false })}
                                placeholder="Terms"
                              >
                                {termsList.map((res: any) => {
                                  return (
                                    <option value={res["TermCode"]}>
                                      {res["TermDescription"]}
                                    </option>
                                  );
                                })}
                              </select>
                              {/* <Controller
                                control={control}
                                name="TermCode"
                                render={({ field }) => (
                                  <SawinSelect
                                    options={termsList}
                                    selected={address && address.Zone}
                                    disValue="TermCode"
                                    value="TermCode"
                                    onChange={(data: any) => field.onChange(data.id)}
                                  />
                                )}
                              /> */}
                            </div>
                            <div className="col-6">
                              <Label title="Credit Limit" />
                              <input
                                className="form-control input"
                                type="text"
                                {...register("ARCustomerMaster.CreditLimit", {
                                  required: false,
                                })}
                                placeholder="Credit Limit"
                              />
                            </div>
                          </div>
                        </div>
                    }
                  </div> : null
              }
            </div>
            <div className="edit-address-button-view d-flex">
              <div className="button">
                <Button size="large" label="Save" b_type="SAVE" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAddress;
