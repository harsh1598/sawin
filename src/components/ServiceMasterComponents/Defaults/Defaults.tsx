import React, { useEffect, useState } from "react";
import { APIState } from "../../../reducer/CommonReducer";
import { Label } from "../../Label/Label";
import WebService from "../../../utility/WebService";
import Loader from "../../Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import "./Defaults.scss";
import { Button } from "../../Button/Button";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import SawinSelect from "../../Select/SawinSelect";
import {
  getBusiness,
  getLabels,
  getLocation,
  getPriceSheet,
  getServiceTypeAll,
  getSourceCode,
} from "../../../utility/CommonApiCall";

const Defaults = () => {
  const [isLoading, setLoading] = useState(false);
  const [editDefaults, setEditDefaults] = useState(false);
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "{}");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const [PS, setPS] = useState<any[]>([]);
  const [customerLevel, setCustomerLevel] = useState<any[]>([]);
  const [serviceType, setServiceType] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<any[]>([]);
  const [invoiceType, setInvoiceType] = useState<any[]>([]);
  const [taxCodeList, setTaxCode] = useState<any[]>([]);
  const [business, setBusiness] = useState<any[]>([]);
  const [location, setLocation] = useState<any[]>([]);
  const [source, setSource] = useState<any[]>([]);
  const [businessType, setBusinessType] = useState<any[]>([]);
  const [zone, setZone] = useState<any[]>([]);
  const [label, setLabel] = useState<any[]>([]);

  useEffect(() => {
    getlocationValues();
    getBusinessValues();
    getPSValues();
    getCustomerLevel();
    getServiceType();
    getpaymentMethod();
    getInvoiceType();
    getTaxCode();
    getSource();
    getBusinessType();
    getZone();
    getLableName();
  }, []);
  useEffect(() => {
    if (data.sd_master) {
      reset(data.sd_master);
    }
  }, [data.sd_master]);
  const getlocationValues = () => {
    getLocation({ data, user_info })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].BreakCode, value: res[i].BreakName });
        }
        setLocation(array);
      })
      .catch((e: any) => {});
  };
  const getBusinessValues = () => {
    getBusiness({ data, user_info })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].BreakCode, value: res[i].BreakName });
        }
        setBusiness(array);
      })
      .catch((e) => {});
  };
  const getPSValues = () => {
    getPriceSheet({ data, user_info })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].PriceCode, value: res[i].PriceCodesDesc });
        }
        setPS(array);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getCustomerLevel = () => {
    WebService.getAPI({
      action: `SetupPICustomerLevel/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({
            id: res[i].ServiceMasterLevel,
            value: res[i].LevelDescription,
          });
        }
        setCustomerLevel(array);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const getServiceType = () => {
    getServiceTypeAll({ data, user_info })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({
            id: res[i].ServiceType,
            value: res[i].ServiceTypeDescription,
          });
        }
        setServiceType(array);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getpaymentMethod = () => {
    WebService.getAPI({
      action: `SetupSDPaymentMethod/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({
            id: res[i].PaymentMethod,
            value: res[i].PaymentDescription,
          });
        }
        setPaymentMethod(array);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getInvoiceType = () => {
    WebService.getAPI({
      action: `SetupSaiSDEmailStyle/GetAll/${user_info["AccountId"]}/${user_info["CompanyId"]}/SDInvoice`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].Code, value: res[i].Description });
        }
        setInvoiceType(array);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getTaxCode = () => {
    WebService.getAPI({
      action: `SetupSaiTaxCode/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({
            id: res[i].ReportAuthorityCode,
            value: res[i].TaxCodeDescription,
          });
        }
        setTaxCode(array);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getSource = () => {
    getSourceCode({ data, user_info })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].Code, value: res[i].Description });
        }
        setSource(array);
      })
      .catch((e: any) => {});
  };
  const getBusinessType = () => {
    WebService.getAPI({
      action: `SetupSDTypeOfBusiness/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].BTCode, value: res[i].BTDescription });
        }
        setBusinessType(array);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getZone = () => {
    WebService.getAPI({
      action: `SetupSDZone/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i], value: res[i].ZoneDescr });
        }
        setZone(array);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getLableName = () => {
    getLabels({ user_info })
      .then((res: any) => {
        setLabel(res);
      })
      .catch((e) => {});
  };

  const onSubmit = (requestBody: any) => {
    requestBody.CustomFields.CompanyId = user_info["CompanyId"];
    requestBody.CustomFields.AccountId = user_info["AccountId"];
    requestBody.CustomFields.EntityCode = data.sd_master.Id;
    WebService.putAPI({
      action: `SDServiceMaster/${data.sd_master.Id}_${user_info["AccountId"]}_${user_info["CompanyId"]}/UpdateDefaults`,
      body: requestBody,
    })
      .then((res: any) => {
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Loader show={isLoading} />
      <div className="defaults info-card">
        <div className="d-flex flex-row justify-content-between">
          <div className="default-title">Defaults</div>
          {editDefaults === false ? (
            <div onClick={() => setEditDefaults(!editDefaults)}>
              <img
                src={require("../../../assets/images/edit.svg").default}
                className="edit-icon"
              />
            </div>
          ) : null}
        </div>
        {editDefaults === false ? (
          <div>
            <div className="main-view">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <div className="title">
                    {label.length > 0 && label[0].Break1Label}
                  </div>
                  <div className="sub-title">
                    {data && data?.sd_master?.BreakName1
                      ? data?.sd_master?.BreakName1
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="title text-end">
                    {label.length > 0 && label[0].Break2Label}
                  </div>
                  <div className="sub-title text-end">000</div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <div className="title">Customer Level</div>
                  <div className="sub-title">
                    {data && data?.sd_master?.ServiceMasterLevel
                      ? data?.sd_master?.ServiceMasterLevel
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="title text-end">Source</div>
                  <div className="sub-title text-end">
                    {data && data?.sd_master?.Code
                      ? data?.sd_master?.Code
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <div className="title">Service Type</div>
                  <div className="sub-title">
                    {data && data?.sd_master?.ServiceType
                      ? data?.sd_master?.ServiceType
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="title text-end">Invoice Type</div>
                  <div className="sub-title text-end">
                    {data && data?.sd_master?.EmailStyleCode
                      ? data?.sd_master?.EmailStyleCode
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <div className="title">Zone</div>
                  <div className="sub-title">
                    {data && data?.sd_master?.Zone
                      ? data?.sd_master?.Zone
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="title text-end">Pay Method</div>
                  <div className="sub-title text-end">
                    {data && data?.sd_master?.PaymentMethod
                      ? data?.sd_master?.PaymentMethod
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <div className="title">Labor PS</div>
                  <div className="sub-title">
                    {data && data?.sd_master?.PriceCodesLabDesc
                      ? data?.sd_master?.PriceCodesLabDesc
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="title text-end">Material PS</div>
                  <div className="sub-title text-end">
                    {data && data?.sd_master?.PriceCodesMatDesc
                      ? data?.sd_master?.PriceCodesMatDesc
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <div className="title">Other PS</div>
                  <div className="sub-title">
                    {data && data?.sd_master?.PriceCodesOtherDesc
                      ? data?.sd_master?.PriceCodesOtherDesc
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="title text-end"># of System</div>
                  <div className="sub-title text-end">
                    {data && data?.sd_master?.NumberOfSystems
                      ? data?.sd_master?.NumberOfSystems
                      : "-"}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="title">Business Type</div>
                  <div className="sub-title">Apartment</div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div className="mt-4">
                  <div datatype="">
                    <input
                      type="checkbox"
                      disabled
                      value={data?.sd_master?.IsTaxable}
                      checked={data?.sd_master?.IsTaxable}
                    />
                    <span className="check-box-text ml-2"> Taxable</span>
                  </div>
                </div>
                <div>
                  <div className="title text-end">Tax</div>
                  <div className="sub-title text-end">
                    {data && data?.sd_master?.TaxCode
                      ? data.sd_master.TaxCode
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between mt-2">
                <div>
                  {data && data?.sd_master?.SendNotifications}
                  <div>
                    <input
                      type="checkbox"
                      disabled
                      value={data?.sd_master?.SMSAllowed}
                      checked={data?.sd_master?.SMSAllowed}
                    />
                    <span className="check-box-text ml-2"> Text Allowed</span>
                  </div>
                </div>
                {/* <div>
                  <div>
                    <input
                      type="checkbox"
                      disabled
                      value={data?.sd_master?.SendNotifications}
                      checked={data?.sd_master?.SendNotifications}
                    />
                    <span className="check-box-text ml-2">
                      {" "}
                      Send Notification
                    </span>
                  </div>
                </div> */}
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <div className="title">Label 1</div>
                  <div className="sub-title">
                    {data?.sd_master?.CustomFields?.Field1
                      ? data?.sd_master?.CustomFields?.Field1
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="title text-end">Label 2</div>
                  <div className="sub-title text-end">
                    {data?.sd_master?.CustomFields?.Field2
                      ? data?.sd_master?.CustomFields?.Field2
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <div className="title">Label 3</div>
                  <div className="sub-title">
                    {data?.sd_master?.CustomFields?.Field3
                      ? data?.sd_master?.CustomFields?.Field3
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="title text-end">Label 4</div>
                  <div className="sub-title text-end">
                    {data?.sd_master?.CustomFields?.Field4
                      ? data?.sd_master?.CustomFields?.Field4
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between created-view mt-2 rounded-bottom">
              <div className="created-name-view d-flex flex-column align-items-start">
                <div className="created-text">Created By</div>
                <div className="created-text">
                  {data?.sd_master?.CreatedBy
                    ? data?.sd_master?.CreatedBy
                    : "-"}
                </div>
                <div className="created-text mt-1">Updated By</div>
                <div className="created-text">
                  {data?.sd_master?.UpdatedBy
                    ? data?.sd_master?.UpdatedBy
                    : "-"}
                </div>
              </div>
              <div className="created-date-view">
                <div className="created-text">Created On</div>
                <div className="created-text">
                  {data?.sd_master?.CreatedOn
                    ? moment(data?.sd_master?.CreatedOn).format(
                        "MM/DD/YYYY HH:mm A"
                      )
                    : "-"}
                </div>
                <div className="created-text mt-1">Updated On</div>
                <div className="created-text">
                  {data?.sd_master?.UpdatedOn
                    ? moment(data?.sd_master?.UpdatedOn).format(
                        "MM/DD/YYYY HH:mm A"
                      )
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-style">
              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div className="left-side">
                    <Label title={label.length > 0 && label[0].Break1Label} />
                  </div>

                  <Controller
                    control={control}
                    name="BreakCode1"
                    render={({ field }) => (
                      <SawinSelect
                        options={location}
                        selected={data?.sd_master?.BreakCode1}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
                <div className="col-6">
                  <div className="left-side">
                    <Label title={label.length > 0 && label[0].Break2Label} />
                  </div>
                  <Controller
                    control={control}
                    name="BreakCode2"
                    render={({ field }) => (
                      <SawinSelect
                        options={business}
                        selected={data?.sd_master?.BreakCode2}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Customer Level" />
                  </div>
                  <Controller
                    control={control}
                    name="CreatedBy"
                    render={({ field }) => (
                      <SawinSelect
                        options={customerLevel}
                        selected={data?.sd_master?.CreatedBy}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Source" />
                  </div>
                  <Controller
                    control={control}
                    name="Code"
                    render={({ field }) => (
                      <SawinSelect
                        options={source}
                        selected={data?.sd_master?.Code}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Service Type" />
                  </div>
                  <Controller
                    control={control}
                    name="ServiceType"
                    render={({ field }) => (
                      <SawinSelect
                        options={serviceType}
                        selected={data?.sd_master?.ServiceType}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Invoice Type" />
                  </div>
                  <Controller
                    control={control}
                    name="EmailStyleCode"
                    render={({ field }) => (
                      <SawinSelect
                        options={invoiceType}
                        selected={data?.sd_master?.EmailStyleCode}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => {
                          alert(data.id);
                          field.onChange(data.id);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Zone" />
                  </div>
                  <Controller
                    control={control}
                    name="EmailStyleCode"
                    render={({ field }) => (
                      <SawinSelect
                        options={zone}
                        selected={data?.sd_master?.EmailStyleCode}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Pay Method" />
                  </div>
                  <Controller
                    control={control}
                    name="PaymentMethod"
                    render={({ field }) => (
                      <SawinSelect
                        options={paymentMethod}
                        selected={data?.sd_master?.PaymentMethod}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Labor PS" />
                  </div>
                  <Controller
                    control={control}
                    name="PriceCodeLab"
                    render={({ field }) => (
                      <SawinSelect
                        options={PS}
                        selected={data?.sd_master?.PriceCodeLab}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Material Ps" />
                  </div>
                  <Controller
                    control={control}
                    name="PriceCodeMat"
                    render={({ field }) => (
                      <SawinSelect
                        options={PS}
                        selected={data?.sd_master?.PriceCodeMat}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Other PS" />
                  </div>
                  <Controller
                    control={control}
                    name="PriceCodeOther"
                    render={({ field }) => (
                      <SawinSelect
                        options={PS}
                        selected={data?.sd_master?.PriceCodeOther}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
                <div className="col-6">
                  <div className="left-side">
                    <Label title="# of System" />
                  </div>
                  <input
                    className="form-control input"
                    type="text"
                    value={data?.sd_master?.NumberOfSystems}
                    {...register(`NumberOfSystems`)}
                  />
                </div>
              </div>
              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Business Type" />
                  </div>
                  <Controller
                    control={control}
                    name="SetupSDTypeOfBusinessId"
                    render={({ field }) => (
                      <SawinSelect
                        options={businessType}
                        selected={data?.sd_master?.SetupSDTypeOfBusinessId}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Label 1" />
                  </div>
                  <input
                    className="form-control input"
                    type="text"
                    placeholder="Select"
                    value={data?.sd_master?.CustomFields?.Field1}
                    {...register(`CustomFields[field1]`)}
                  />
                </div>
              </div>

              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Label 2" />
                  </div>
                  <input
                    className="form-control input"
                    type="text"
                    value={data?.sd_master?.CustomFields?.Field2}
                    placeholder="Select"
                    {...register(`CustomFields[field2]`)}
                  />
                </div>
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Label 3" />
                  </div>
                  <input
                    className="form-control input"
                    type="text"
                    value={data?.sd_master?.CustomFields?.Field3}
                    placeholder="Select"
                    {...register(`CustomFields[field3]`)}
                  />
                </div>
              </div>
              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Label 4" />
                  </div>
                  <input
                    className="form-control input"
                    type="text"
                    placeholder="Select"
                    value={data?.sd_master?.CustomFields?.Field4}
                    {...register(`CustomFields[field4]`)}
                  />
                </div>
              </div>
              <div className="col-12 d-flex row main-defaults">
                <div className="col-6">
                  <div style={{ marginTop: 44 }}>
                    <input
                      type="checkbox"
                      value={data?.sd_master?.SMSAllowed}
                      {...register("SMSAllowed")}
                    />
                    <span className="check-box-text ml-2"> Text Allowed</span>
                  </div>
                </div>
                {/* <div className="col-6">
                  <div>
                    <input type="checkbox" value={data?.sd_master?.DoNotEmail} {...register("DoNotEmail")} />
                    <span className="check-box-text ml-2">
                      {" "}
                      Send Notifications
                    </span>
                  </div>
                </div> */}
                <div className="col-6">
                  <div className="left-side">
                    <Label title="Tax" />
                  </div>
                  <Controller
                    control={control}
                    name="TaxCode"
                    render={({ field }) => (
                      <SawinSelect
                        options={taxCodeList}
                        // selected={data?.sd_master?.TaxCode}
                        disValue="BreakName"
                        value="BreakCode"
                        isHideArrow={true}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                </div>
              </div>
              <div
                className="col-12 d-flex row main-defaults"
                style={{ marginTop: 20 }}
              >
                <div className="col-6">
                  <div>
                    <input
                      type="checkbox"
                      value={data?.sd_master?.IsTaxable}
                      {...register("IsTaxable")}
                    />
                    <span className="check-box-text ml-2"> Is Taxable</span>
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <input
                      type="checkbox"
                      value={data?.sd_master?.SendNotifications}
                      {...register("SendNotifications")}
                    />
                    <span className="check-box-text ml-2"> Email Allowed</span>
                  </div>
                </div>
              </div>
              <div
                className="col-12 d-flex row main-defaults"
                style={{ marginTop: 20, marginBottom: 80 }}
              >
                <div className="col-6">
                  <div>
                    <input
                      type="checkbox"
                      value={data?.sd_master?.SendSurvey}
                      {...register("SendSurvey")}
                    />
                    <span className="check-box-text ml-2">
                      {" "}
                      Opt-in for survey
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="col-12 d-flex row justify-content-center buttons-view"
                style={{ marginBottom: 80, marginTop: 20 }}
              >
                <div className="col-5">
                  <Button
                    label="Cancel"
                    size="large"
                    b_type="CANCEL"
                    onClick={() => setEditDefaults(!editDefaults)}
                  />
                </div>
                <div className="col-5">
                  <Button label="Save" size="large" b_type="SAVE" />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Defaults;
