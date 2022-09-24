import { useEffect, useState } from "react";
import "./SendTextMessage.scss";
import { Label } from "../../components/Label/Label";
import { useSelector } from "react-redux";
import { RootState } from "../../config/Store";
import { APIState } from "../../reducer/CommonReducer";
import SawinSelect, { Options } from "../Select/SawinSelect";
import HelperService from "../../utility/HelperService";
import { Controller, useForm } from "react-hook-form";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import WebService from "../../utility/WebService";
import DraggableModal from "../DraggableModal/DraggableModal";
import { toast } from 'react-toastify';

interface PropData {
  isShow: boolean;
  title: any;
  isClose: any;
}

const SendTextMessage = (props: PropData) => {
  const onCloseModal = () => {
    props.isClose(!props.isShow);
  };
  const dispatch: Dispatch<any> = useDispatch();
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "{}");
  const [userMessage, setuserMessage] = useState('');
  const [customerInfo, setCustomerInfo] = useState(Object);
  const [showStatndardDescriptionModel, setShowStatndardDescriptionModel] =
    useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }, control
  } = useForm();
  const closeModal = (value: any) => {
    setShowStatndardDescriptionModel(value);
  };
 

  const contactType: Options[] = [
    { id: 1, value: "Dispatch  Early" },
    { id: 2, value: "Dispatch" },
  ];
  const onSubmit = (requestBody: any) => {
    props.isClose(!props.isShow, "ON_SAVE");
    requestBody.AccountId = customerInfo.AccountId;
    requestBody.CompanyId = customerInfo.CompanyId;
    requestBody.SDServiceMasterId = customerInfo.Id;
    WebService.postAPI({
      action: `SDserviceMaster/SendTextMessage/${customerInfo.AccountId}/${customerInfo.CompanyId}`,
      body: requestBody,
    })
      .then((res: any) => {
        toast.success("Message Sent successfully.")
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    const value = JSON.stringify(data?.sd_master) === "{}";
    if (data?.address !== "" || (data?.address !== null && data?.address)) {
      setCustomerInfo(data.sd_master);
    }
  }, [data]);
  const onDefault = (e: any) => {
    if (e == 1) {
      setuserMessage("Hi, Technician has been dispatched to your location early than the time ")
    }
    else if (e == 2) {
      setuserMessage("Hi, Technician has been dispatched to your location. Please share the OTP once the work is completed. ")
    }
  }

  return (
    <>
      <Offcanvas show={props.isShow} onHide={onCloseModal} placement={'end'} className="offcanvas-large" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Send Text Message</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="border-bottom px-0 information-main-view">
          <div className="col-12">
            <div className="send-text-message col-8 row">
              <div className="col-10">
                <div className="send-text-text">
                  Sending text message to technician "{customerInfo.CompanyName}"
                </div>
              </div>

            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row px-4">
              <div className="col-6">
                <Label title='Phone #' type="BOLD" />
                <input
                  className="form-control input"
                  type="text"
                  {...register(`PhoneNumber`, { required: true })}
                  onKeyPress={(e) => HelperService.allowOnlyNumericValue(e)}
                  onKeyUp={(e) => HelperService.contactFormatter(e)}
                  placeholder="Phone"
                ></input>
                {errors.PhoneNumber && (
                  <Label title={"Please enter phone number"} modeError={true} />
                )}
              </div>
              <div className="col-6 mt-1">
                <Label title="Default" type="BOLD" />
                <Controller
                  control={control}
                  name=""
                  render={({ field }) => (
                    <SawinSelect
                      options={contactType}
                      disValue="BreakName"
                      value="BreakCode"
                      onChange={(data: any) => onDefault(data.id)}
                    />
                  )}
                />
              </div>
              <div className="col-12">
                <Label title='Message' type="BOLD" />
                <textarea
                  className="form-control form-control-textarea"
                  {...register(`MessageText`, { required: true })}
                  placeholder="Message"
                  value={userMessage}
                  onChange={e => setuserMessage(e.target.value)}
                  rows={10} />
                {errors.MessageText && (
                  <Label title={"Please enter message"} modeError={true} />
                )}
              </div>
            </div>
            <div className="offcanvas-footer mt-4">
              <Button variant="primary" className="btn-brand-solid me-3" type="button" onClick={() =>
                setShowStatndardDescriptionModel(
                  !showStatndardDescriptionModel
                )
              }>Standard Description</Button>
              <Button variant="primary" className="btn-brand-solid me-3" type="submit">Submit</Button>
              <Button variant="primary" className="btn-brand-outline" type="button" onClick={onCloseModal}>Cancel</Button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
      <DraggableModal
        isOpen={showStatndardDescriptionModel}
        onClose={closeModal}
        title="Standard Descriptions"
        type="STANDARD_DESCRIPTION"
        previousData={null}
      />
    </>
  );
};

export default SendTextMessage;
