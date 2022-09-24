import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./BookNewServiceCall.scss";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { Label } from "../../../components/Label/Label";
import WebService from "../../../utility/WebService";
import crossblack from "../../../assets/images/cross-black.svg";
import calculator from "../../../assets/images/calculator.png";
import HelperService from "../../../utility/HelperService";
import SawinSelect, { Options } from "../../Select/SawinSelect";
import "react-datepicker/dist/react-datepicker.css";
import ExpandableSelect, { ExpandOption } from "../../Select/ExpandableSelect";
import DraggableModal from "../../DraggableModal/DraggableModal";
import AdditionalInformationModal from "../../AdditionalInformationModal/AdditionalInformationModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../config/Store";
import {
  AdditionalInfoState,
  APIState,
  CustomerModalState,
} from "../../../reducer/CommonReducer";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {
  getLocation,
  getBusiness,
  getSourceCode,
  getServiceTypeAll,
  getTechnician,
  getLabels,
  getPriceSheet,
} from "../../../utility/CommonApiCall";
import SawinDatePicker from "../../SawinDatePicker/SawinDatePicker";
import Grid, { GridHeader, GridRow, GridColumn } from "../../Grid/Grid";
import AddEquipmentModal from "../../AddEquipmentModal/AddEquipmentModal";

const BookNewServiceCall = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState<any[]>([]);
  const [customerInfo, setCustomerInfo] = useState(Object);
  const [business, setBusiness] = useState<any[]>([]);
  const [contractMaintance, setContractMaintance] = useState<any[]>([]);
  const [location, setLocation] = useState<any[]>([]);
  const [source, setSource] = useState<any[]>([]);
  const [serviceType, setServiceType] = useState<any[]>([]);
  const [technician, setTechnician] = useState<any[]>([]);
  const [label, setLabel] = useState<any[]>([]);
  const [ps, setPS] = useState<any[]>([]);
  const [additionalModelData, setAdditionalModelData] = useState();
  const [isShowCallBudgetModel, setShowCallBudgetModel] = useState(false);
  const [showReturnCall, setShowReturnCall] = useState(false);
  const [showReturn, setShowReturn] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(new Date());
  const [rows, setRows] = useState<GridRow[]>([]);
  const [showStatndardDescriptionModel, setShowStatndardDescriptionModel] =
    useState(false);
  const [showContractMaintanceModel, setContractMaintanceModel] =
    useState(false);
  const [showAlertModel, setAlertModel] = useState(false);
  const [showAdditionalInformationModal, setShowAdditionalInformationModal] =
    useState(false);
  const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);
  const [showAdditionalInformationdata, setShowAdditionalInformationdata] =
    useState(false);
  let history = useNavigate();
  const searchData: any = useOutletContext();
  const dispatch: Dispatch<any> = useDispatch();
  const value: any = useSelector<RootState, APIState>(
    (state) => state.sdMaster
  );
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "{}");
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const customerInfoModal: any = useSelector<RootState, CustomerModalState>(
    (state) => state.customerModal
  );
  const addInfoData: any = useSelector<RootState, AdditionalInfoState>(
    (state) => state.additionalInformation
  );

  useEffect(() => {
    getLocationValues();
    getBusinessValues();
    getSource();
    getServiceType();
    getTechnicanValues();
    getLableName();
    getPSValues();
    taskCodeOptions();
    timePromisedOptions();
  }, []);

  useEffect(() => {
    if (data.sd_master.Id) {
      reset(data.sd_master);
      getContractMaintenanceSchedule();
    }
  }, [data.sd_master.Id]);

  useEffect(() => {
    if (data?.address !== "" || (data?.address !== null && data?.address)) {
      setAddress(data.address);
      setCustomerInfo(data.sd_master);
    }
    if (addInfoData) {
      let rows: GridRow[] = [];
      for (var i in addInfoData.AdditionalInfo.selectedEquipment) {
        let columns: GridColumn[] = [];
        columns.push({
          value:
            addInfoData.AdditionalInfo.selectedEquipment[i].EqpManufacturer,
        });
        columns.push({
          value: addInfoData.AdditionalInfo.selectedEquipment[i].EqpModel,
        });
        columns.push({
          value: addInfoData.AdditionalInfo.selectedEquipment[i].Description,
        });
        rows.push({ data: columns });
      }
      setRows(rows);
    }
  }, [searchData, data, addInfoData]);
  const [selctedTask,setSelectedTask] = useState({})
  const selectTask = (e: Options) => {
    setSelectedTask(e)
    data.TaskCode = e.id;
    if (e.parentCode == "FPM") {
      if (contractMaintance.length > 0) {
        setContractMaintanceModel(true);
      } else {
        setAlertModel(!showAlertModel);
      }
    }
  };

  const onSubmit = (data: any) => {
    data.SDServiceMasterId = customerInfo.Id;
    // data.PhoneType = "1";
    data.SetupSDPaymentMethodId = customerInfo.PaymentMethod;
    data.BillTo = customerInfo.ARCustomerMaster.ARCustomerMasterId;
    data.AccountId = user_info["AccountId"];
    data.ReturnCallNum = showReturn ? showReturn : "";
    data.CompanyId = user_info["CompanyId"];
    data.Field1 = addInfoData.AdditionalInfo.CustomFields.field1;
    data.Field2 = addInfoData.AdditionalInfo.CustomFields.field2;
    data.Field3 = addInfoData.AdditionalInfo.CustomFields.field3;
    data.Field4 = addInfoData.AdditionalInfo.CustomFields.field4;
    data.PriceCodeLab = addInfoData.AdditionalInfo.PriceCodeLab;
    data.PriceCodeMat = addInfoData.AdditionalInfo.PriceCodeMat;
    data.PriceCodeOther = addInfoData.AdditionalInfo.PriceCodeOther;
    data.SpecialInstructions = addInfoData.AdditionalInfo.SpecialInstructions;
    data.CustomerPONum = addInfoData.AdditionalInfo.CustomerPONum;
    data.Id = "";
    for (var i in serviceType) {
      if (serviceType[i].ServiceType == data.ServiceType1) {
        data.BreakType1 = serviceType[i].BreakType1;
        data.BreakType2 = serviceType[i].BreakType2;
      }
    }
    data.CustomFields = {
      AccountId: user_info["AccountId"],
      CompanyId: user_info["CompanyId"],
      EntityType: 2,
      Field1: addInfoData.AdditionalInfo.CustomFields.field1,
      Field2: addInfoData.AdditionalInfo.CustomFields.field2,
      Field3: addInfoData.AdditionalInfo.CustomFields.field3,
      Field4: addInfoData.AdditionalInfo.CustomFields.field4,
    };

    //will Go static
    data.Force1 = "NR";
    data.CallStatus = "U";
    data.DateReceived = "09/19/22 02:46 PM";
    data.TotalBudgetTime = "2.00";
    data.ProblemTaskFunctionCode1 = "INS";
    data.ProblemTaskComponentCode1 = "2HR";
    data.QuoteAmount = "0";
    setLoading(true);
    WebService.postAPI({
      action: "SDCallMaster",
      body: data,
    })
      .then((res: any) => {
        reset();
        setLoading(false);
        toast.success("Call booked successfully.");
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getLocationValues = () => {
    getLocation({ data, user_info })
      .then((res: any) => {
        var locationarray = [];
        for (var i in res) {
          locationarray.push({ id: res[i].BreakCode, value: res[i].BreakName });
        }
        setLocation(locationarray);
      })
      .catch((e: any) => {});
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

  const getTechnicanValues = () => {
    getTechnician({ data, user_info })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({
            id: res[i].TechNum,
            value: res[i].TechNameInternal,
            code: res[i].TechNum,
          });
        }
        setTechnician(array);
        setLoading(false);
      })
      .catch(() => {
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

  const getPSValues = () => {
    getPriceSheet({ data, user_info })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].PriceCode, value: res[i].PriceCodesDesc });
        }
        setPS(array);
      })
      .catch(() => {});
  };

  const headers: GridHeader[] = [
    {
      title: "Contract.No",
      isSorting: false,
    },
    {
      title: "Select",
      isSorting: false,
    },
    {
      title: "Manufacturer",
      isSorting: false,
    },
    {
      title: "Model",
      isSorting: false,
    },
    {
      title: "Description",
      isSorting: false,
    },
    {
      title: "Serial #",
      isSorting: false,
    },
    {
      title: "System",
      isSorting: false,
    },
    {
      title: "Location",
      isSorting: false,
    },
  ];
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

  const closeModal = (value: any, data: any, addedData: any) => {
    reset({ ProblemDescription: addedData });
    setShowCallBudgetModel(value);
    setShowAdditionalInformationModal(value);
    setShowStatndardDescriptionModel(value);
    setContractMaintanceModel(value);
    setAlertModel(value);
  };

  const closeAdditionalModal = (value: any, type: any) => {
    setShowAdditionalInformationModal(value);
    setShowAddEquipmentModal(value);
    if (type === "ON_SAVE") {
      setShowAdditionalInformationdata(true);
    }
    if (type === "OPEN_EQUIPMENT") {
      setShowAddEquipmentModal(true);
    }
  };

  const closeEquipmentModal = (value: any) => {
    setShowAddEquipmentModal(value);
  };

  const contactType: Options[] = [
    { id: 1, value: "Primary Number" },
    { id: 2, value: "Secondary Number" },
  ];

  const [timeOption, setTimeOption] = useState<Options[]>([]);

  const [newexpandOption, setNewexpandOption] = useState<ExpandOption[]>([]);

  const taskCodeOptions = () => {
    WebService.getAPI({
      action: `SetupSDProblemTaskCode/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        const temp = [];
        let innerTemp: Options[] = [];
        for (var i in res) {
          innerTemp = res[i].items.map((item: any, index: any): Options => {
            return {
              value: item.Description,
              id: item.ComponentCode + "_" + item.FunctionCode,
              code: item.ComponentCode,
              parentCode: item.FunctionCode,
            };
          });
          temp.push({ value: res[i].text, values: innerTemp });
        }
        setNewexpandOption(temp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const timePromisedOptions = () => {
    WebService.getAPI({
      action: `SetupSDTimePromised/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        const temp = [];
        for (var i in res) {
          temp.push({
            id: `${i + 1}`,
            value: res[i].Description,
            code: res[i].TimeCode,
          });
        }
        setTimeOption(temp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getData = (data: any) => {
    setAdditionalModelData(data);
  };

  const getDescription = (data: any) => {
    console.log("data", data);
  };

  const getContractMaintenanceSchedule = () => {
    const requestBody = {
      AccountId: user_info["AccountId"],
      CompanyId: user_info["CompanyId"],
      SDServiceMasterId: data.sd_master.Id,
      ProblemTaskFunctionCode: "FPM",
      ProblemTaskComponentCode: "RC",
    };

    WebService.postAPI({
      action: "SaiSDContractMaintenanceSchedule/GetContractMaintenanceSchedule",
      body: requestBody,
    })
      .then((res: any) => {        
        setContractMaintance(res);
      })
      .catch((e) => {});
  };

  const updateReturnCall = () => {
    setShowReturn("");
  };

  return (
    <>
      <AdditionalInformationModal
        isShow={showAdditionalInformationModal}
        title="Additional Information"
        isClose={closeAdditionalModal}
      />
      <AddEquipmentModal
        isShow={showAddEquipmentModal}
        title="Equipment"
        isClose={closeEquipmentModal}
        popupData={getData}
      />
      <DraggableModal
        isOpen={isShowCallBudgetModel}
        onClose={closeModal}
        title="Call Budget"
        type="CALL_BUDGET"
      />
      <DraggableModal
        isOpen={showStatndardDescriptionModel}
        onClose={closeModal}
        title="Standard Descriptions"
        type="STANDARD_DESCRIPTION"
      />
      <DraggableModal
        isOpen={showContractMaintanceModel}
        onClose={closeModal}
        title="Contract Maintenance Schedule List"
        type="CONTRACT_MAINTAANCE"
        previousData={contractMaintance}
      />
      <DraggableModal
        isOpen={showAlertModel}
        onClose={closeModal}
        title="Quick Service Call Booking"
        type="ALERT_MODEL"
        width={600}
        previousData="There is no maintenance schedule associated with this task code"
      />
      <div className="d-flex flex-row main-overview">
        <div className="box-main-view form-style label">
          {customerInfoModal.isShow === true && (
            <div className="title-box" style={{ marginRight: 20 }}>
              <div className="col-12 title-name row">
                <div className="col-6 mt-1 text-start">
                  <label style={{ marginLeft: "12px" }}> Job location</label>
                  <div className="name">
                    {address?.length > 0
                      ? address[0].AddressLine1 +
                        " " +
                        address[0].City +
                        " " +
                        address[0].Zip
                      : ""}
                  </div>
                </div>

                <div className="col-6 text-end mt-1 mr-1">
                  <label> Bill To</label>
                  <div className="name">
                    {customerInfo.ARCustomerMaster &&
                    customerInfo.ARCustomerMaster.LocationMaster
                      ? customerInfo.ARCustomerMaster?.LocationMaster
                          ?.AddressLine1 +
                        " " +
                        customerInfo.ARCustomerMaster?.LocationMaster?.City +
                        " " +
                        customerInfo.ARCustomerMaster?.LocationMaster?.Zip
                      : ""}
                  </div>
                </div>
                <div className="line"></div>
                <div className="col-6 text-start">
                  <label style={{ marginLeft: "12px" }}>
                    {" "}
                    {data.Notes ? data.Notes : "No AR Notes"}
                  </label>
                  {/* <div className="name">Please Collect dues after service</div> */}
                </div>
              </div>
            </div>
          )}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-style col-12 row">
                <div className="col-3">
                  <Label
                    title={label.length > 0 ? label[0].Break1Label : ""}
                    showStar={true}
                  />
                  <Controller
                    control={control}
                    name="BreakCode1"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SawinSelect
                        options={location}
                        disValue="BreakName"
                        selected={data?.sd_master?.BreakCode1}
                        value="BreakCode"
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                  {errors.BreakCode1 && (
                    <Label title={"Please select location."} modeError={true} />
                  )}
                </div>

                <div className="col-3">
                  <Label
                    title={label.length > 0 ? label[0].Break2Label : ""}
                    showStar={true}
                  />
                  <Controller
                    control={control}
                    name="BreakCode2"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SawinSelect
                        options={business}
                        selected={data?.sd_master?.BreakCode2}
                        disValue="BreakName"
                        value="BreakCode"
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                  {errors.BreakCode2 && (
                    <Label title={"Please select business."} modeError={true} />
                  )}
                </div>
                <div className="col-3">
                  <Label title="Source Code" />
                  <Controller
                    control={control}
                    name="SetupSDSourceCodeId"
                    rules={{ required: true }}
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
                  {errors.SetupSDSourceCodeId && (
                    <Label
                      title={"Please select source code."}
                      modeError={true}
                    />
                  )}
                </div>

                <div className="col-3 appointment-view">
                  <Label title="Appointment Confirmed" showStar={true} /> <br />
                  <input
                    type="checkbox"
                    className="sawin-checkbox new-check"
                    {...register("IsAppointmentConfirmed")}
                  />
                </div>
                <div className="col-3 ">
                  <Label title="Person Calling" showStar={true} />
                  <input
                    className="form-control input"
                    type="text"
                    {...register("PersonCalling", { required: true })}
                    placeholder="Person Calling"
                  ></input>
                  {errors.PersonCalling && (
                    <Label
                      title={"Please enter person calling."}
                      modeError={true}
                    />
                  )}
                </div>
                <div className="col-3 ">
                  <Label title="Contacts" showStar={true} />
                  <input
                    className="form-control input"
                    type="text"
                    {...register("ContactPerson", { required: true })}
                    placeholder="Contacts"
                  ></input>
                  {errors.ContactPerson && (
                    <Label title={"Please select contact."} modeError={true} />
                  )}
                </div>
                <div className="col-3 ">
                  <Label title="Contact Type" />
                  <Controller
                    control={control}
                    name="PhoneType"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SawinSelect
                        options={contactType}
                        type={"ARROW"}
                        onChange={(data: any) => field.onChange(data.id)}
                      />
                    )}
                  />
                  {errors.PhoneType && (
                    <Label title={"Please select contact."} modeError={true} />
                  )}
                </div>
                <div className="col-3 ">
                  <Label title="Contact #" />
                  <input
                    className="form-control input"
                    type="text"
                    {...register("ContactPhone", { required: true })}
                    onKeyPress={(e) => HelperService.allowOnlyNumericValue(e)}
                    onKeyUp={(e) => HelperService.contactFormatter(e)}
                  ></input>
                  {errors.ContactPhone && (
                    <Label title={"Please select contact."} modeError={true} />
                  )}
                </div>
                <div className="col-12 row mt-4 mb-2">
                  <div className="col-6  justify-content-between mb-2">
                    {" "}
                    <Label title="Description" />
                  </div>
                  <div className="col-6 mt-1 d-flex justify-content-end mb-2">
                    <div
                      className="col-6 p-0 new-add-button d-flex"
                      onClick={() =>
                        setShowStatndardDescriptionModel(
                          !showStatndardDescriptionModel
                        )
                      }
                    >
                      + Standard Descriptions
                    </div>
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control booknew-textarea"
                      {...register("ProblemDescription", { required: true })}
                      rows={10}
                    />
                    {errors.ProblemDescription && (
                      <Label
                        title={"Please select contact."}
                        modeError={true}
                      />
                    )}
                  </div>
                </div>
                <div className="col-12 row">
                  <div className="col-3 mt-5">
                    <Label title="Task Code" showStar={true} />
                    <ExpandableSelect
                      options={newexpandOption}
                      selected={data.TaskCode}
                      onChange={(data: any) => selectTask(data)}
                    />
                    {errors.task_code && (
                      <Label
                        title={"Please select task code."}
                        modeError={true}
                      />
                    )}
                  </div>
                  <div className="col-3 mt-5">
                    <div className="col-12 w-100" style={{ marginTop: -4 }}>
                      <div className="col-12 search-form rounded-pill p-1 mr-3">
                        <Label title="Time Required" showStar={true} />
                        <input
                          className="form-control input"
                          type="text"
                          {...register("time_required", { required: true })}
                        ></input>

                        <div className="col-12 d-flex justify-content-end">
                          <button
                            className="btn border-0 rounded-0 bg-transparent"
                            type="button"
                          >
                            <img
                              src={calculator}
                              onClick={() =>
                                setShowCallBudgetModel(!isShowCallBudgetModel)
                              }
                              width="24"
                              className="calculator"
                              alt="hamburg"
                            />
                          </button>
                        </div>
                        {errors.time_required && (
                          <Label
                            title={"Please select time required."}
                            modeError={true}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-3 mt-5">
                    <Label title="Time Promised" showStar={true} />
                    <Controller
                      control={control}
                      name="TimePromisedCode"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <SawinSelect
                          options={timeOption}
                          onChange={(data: any) => field.onChange(data.code)}
                          type={"ARROW"}
                        />
                      )}
                    />
                    {errors.TimePromisedCode && (
                      <Label
                        title={"Please select time promised."}
                        modeError={true}
                      />
                    )}
                  </div>

                  <div className="col-3 mt-5">
                    <input
                      type="checkbox"
                      {...register("ReturnCall", { required: true })}
                      className="book-new-checkbox"
                      onClick={() => setShowReturnCall(!showReturnCall)}
                    />
                    <Label title="Return Call" />
                    <input
                      className="form-control input"
                      type="text"
                      disabled={!showReturnCall}
                      value={showReturn}
                      onChange={(e) => setShowReturn(e.target.value)}
                    ></input>
                    {errors.ReturnCall && (
                      <Label
                        title={"Please select time promised."}
                        modeError={true}
                      />
                    )}
                    <div className="col-12 d-flex justify-content-end">
                      <button
                        className="btn border-0 rounded-0 bg-transparent"
                        type="button"
                      >
                        {showReturn && (
                          <img
                            src={crossblack}
                            onClick={() => updateReturnCall()}
                            width="20"
                            className="cross"
                            alt="hamburg"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="col-3">
                    <Label title="Service Type" showStar={true} />
                    <Controller
                      control={control}
                      name="ServiceType1"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <SawinSelect
                          options={serviceType}
                          onChange={(data: any) => field.onChange(data.id)}
                          type={"ARROW"}
                        />
                      )}
                    />
                    {errors.ServiceType1 && (
                      <Label
                        title={"Please select time promised."}
                        modeError={true}
                      />
                    )}
                  </div>
                  <div className="col-3 ">
                    <div className="col-12 w-100" style={{ marginTop: -7 }}>
                      <div className="col-12 search-form rounded-pill p-1 mr-3">
                        <Label title="Date Start" showStar={true} />
                        <Controller
                          control={control}
                          name="StartDate"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <SawinDatePicker
                              onChange={(data: any) => field.onChange(data)}
                            />
                          )}
                        />
                        {errors.start_date && (
                          <Label
                            title={"Please select start date."}
                            modeError={true}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-3 ">
                    <div className="col-12 w-100" style={{ marginTop: -7 }}>
                      <div className="col-12 search-form rounded-pill p-1 mr-3">
                        <Label title="Date End" showStar={true} />
                        <Controller
                          control={control}
                          name="EndDate"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <SawinDatePicker
                              onChange={(data: any) => field.onChange(data)}
                            />
                          )}
                        />
                        {errors.end_date && (
                          <Label
                            title={"Please select end date."}
                            modeError={true}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-3">
                    <Label title="Technician" />
                    <SawinSelect
                      options={technician}
                      onChange={() => console.log("fd")}
                      type={"ARROW"}
                    />
                  </div>
                </div>
                {showAdditionalInformationModal == false &&
                  showAdditionalInformationdata == false && (
                    <div className="col-12 mt-1 d-flex justify-content-end mt-3">
                      <div
                        className="col-6 new-add-button d-flex"
                        onClick={() =>
                          setShowAdditionalInformationModal(
                            !showAdditionalInformationModal
                          )
                        }
                      >
                        + Additional Information
                      </div>
                    </div>
                  )}

                {showAdditionalInformationdata && (
                  <div>
                    <hr className="line" />
                    <div className="col-12 row d-flex justify-content-between mt-3">
                      <div className="col-6">
                        <h2>Additional Information</h2>
                      </div>
                      <div className="col-6 text-end">
                        <img
                          onClick={() =>
                            setShowAdditionalInformationModal(
                              !showAdditionalInformationModal
                            )
                          }
                          className="image"
                          src={
                            require("../../../assets/images/edit.svg").default
                          }
                        />
                      </div>
                    </div>
                    <div className="col-12 mt-1">
                      <Label title="Customer PO#" type="Normal" />
                      <input
                        className="form-control input"
                        type="text"
                        value={addInfoData?.AdditionalInfo?.CustomerPONum}
                        disabled={true}
                      />
                    </div>
                    <div className="col-12">
                      <div className="mt-5">
                        <h3>Special Instruction</h3>
                      </div>
                      {/* <div className="mb-4">
                        <Label title="Special Instructions" type="BOLD" />
                      </div> */}
                      <div className="service-location-address col-12">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              addInfoData?.AdditionalInfo?.ProblemDescription,
                          }}
                        />
                      </div>
                    </div>
                    <hr className="line" />
                    <div className=" col-12 row ">
                      <div className="mt-5">
                        <h3>Notifications</h3>
                      </div>
                      <div>
                        {addInfoData?.AdditionalInfo?.notification.length >
                          0 && (
                          <div>
                            {addInfoData?.AdditionalInfo?.notification.map(
                              (res: any) => {
                                return (
                                  <div className="col-12 row">
                                    <div className="col-4">
                                      <Label title="Name" />
                                      <input
                                        className="form-control input"
                                        type="text"
                                        value={res.name}
                                        disabled={true}
                                      ></input>
                                    </div>
                                    <div className="col-4">
                                      <Label title="Email" />
                                      <input
                                        className="form-control input"
                                        type="text"
                                        value={res.email}
                                        disabled={true}
                                      ></input>
                                    </div>
                                    <div className="col-4">
                                      <Label title="Contact Number" />
                                      <input
                                        className="form-control input"
                                        type="text"
                                        value={res.contact_number}
                                        disabled={true}
                                      ></input>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <hr className="line" />
                    <div className=" col-12 row">
                      <div className="mt-5">
                        <h3>Price Sheet</h3>
                      </div>
                      <div className="col-4">
                        <Label title="Labor Price Sheet" />
                        <SawinSelect
                          options={ps}
                          type="AROOW"
                          selected={addInfoData?.AdditionalInfo?.PriceCodeLab}
                          onChange={() => console.log("ds")}
                        />
                      </div>
                      <div className="col-4">
                        <Label title="Material Price Sheet" />
                        <SawinSelect
                          options={ps}
                          type="AROOW"
                          selected={addInfoData?.AdditionalInfo?.PriceCodeMat}
                          onChange={() => console.log("ds")}
                        />
                      </div>
                      <div className="col-4">
                        <Label title="Other Price Sheet" />
                        <SawinSelect
                          options={ps}
                          type="AROOW"
                          selected={addInfoData?.AdditionalInfo?.PriceCodeOther}
                          onChange={() => console.log("ds")}
                        />
                      </div>
                    </div>
                    <hr className="line" />
                    <div className="col-12 row">
                      <div className="col-6 mt-1">
                        <Label title="Label 1" />
                        <input
                          className="form-control input"
                          type="text"
                          value={
                            addInfoData?.AdditionalInfo?.CustomFields?.field1
                          }
                          disabled={true}
                          placeholder="Label 1"
                        ></input>
                      </div>
                      <div className="col-6 mt-1">
                        <Label title="Label 2" />
                        <input
                          className="form-control input"
                          type="text"
                          value={
                            addInfoData?.AdditionalInfo?.CustomFields?.field2
                          }
                          disabled={true}
                          placeholder="Label 2"
                        ></input>
                      </div>
                      <div className="col-6">
                        <Label title="Label 3" />
                        <input
                          className="form-control input"
                          value={
                            addInfoData?.AdditionalInfo?.CustomFields?.field3
                          }
                          disabled={true}
                          type="text"
                          placeholder="Label 3"
                        ></input>
                      </div>
                      <div className="col-6">
                        <Label title="Label 4" />
                        <input
                          className="form-control input"
                          value={
                            addInfoData?.AdditionalInfo?.CustomFields?.field4
                          }
                          disabled={true}
                          type="text"
                          placeholder="Label 4"
                        ></input>
                      </div>
                    </div>
                    <hr className="line" />
                    <div className="col-12 row">
                      <div className="">
                        <h3>Equipment</h3>
                      </div>
                      <Grid headers={headers} rows={rows} />
                    </div>
                  </div>
                )}
                <div className="bottom-buttons col-12 mb-4 row text-center">
                  <div className="col-12 d-flex align-item-center justify-content-center">
                    <div className="col-2">
                      <Button
                        size={"large"}
                        label="BOOK SERVICE"
                        b_type="SAVE"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookNewServiceCall;
