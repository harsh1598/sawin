import ReactModal from "react-modal-resizable-draggable";
import "./DraggableModal.scss";
import EditAddressModal from "../EditAddressModal/EditAddressModal";
import GoogleAddressModal from "../GoogleAddressModal/GoogleAddressModal";
import CallBugetModal from "../CallBugetModal/CallBugetModel";
import NotesModal from "../NotesModal/NotesModal";
import StandardDescriptionModel from "../StandardDescriptionModel/StandardDescriptionModel";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";
import ContractMaintanceModel from "../ContractMaintanceModel/ContractMaintanceModel";
import AlertModal from "../AlertModal/AlertModal";

const DraggableModal = (props) => {
  const closeModal = (showGoogleModal, data) => {
    if (showGoogleModal && data) {
      props.onClose(false, showGoogleModal, data);
    } else {
      props.onClose(false);
    }
  };

  return (
    <>
      <div className="dragModal">
        <ReactModal
          initWidth={
            props.width
              ? props.width
              : window.innerWidth - window.innerWidth / 3
          }
          initHeight={"auto"}
          onRequestClose={props.closeModal}
          disableResize={true}
          isOpen={props.isOpen}
        >
          <div className="modal-header">
            <div className="modal-title d-flex justify-content-start mt-2">
              {props.title}{" "}
            </div>
            <div className="modal-title d-flex justify-content-end ">
              <img
                src={require("../../assets/images/cross-black.svg").default}
                alt="right-arrow"
                onClick={() => closeModal()}
                width={20}
                height={15}
                className="right-icon"
              />
            </div>
          </div>
          <div className="body">
            {props.type === "ADDRESS" && (
              <EditAddressModal close={closeModal} data={props.previousData} />
            )}
            {props.type === "GOOGLE_ADDRESS" && (
              <GoogleAddressModal
                close={closeModal}
                data={props.previousData}
              />
            )}
            {props.type === "CALL_BUDGET" && (
              <CallBugetModal close={closeModal} />
            )}
            {props.type === "STANDARD_DESCRIPTION" && (
              <StandardDescriptionModel close={closeModal} />
            )}
            {props.type === "Internal Notes" ||
            props.type === "External Notes" ? (
              <NotesModal
                close={closeModal}
                title={props.type}
                data={props.previousData}
              />
            ) : null}
            {props.type === "FORGOT_PASSWORD" && (
              <ForgotPasswordModal close={closeModal} />
            )}
            {props.type === "CONTRACT_MAINTAANCE" && (
              <ContractMaintanceModel
                close={closeModal}
                data={props.previousData}
              />
            )}
              {props.type === "ALERT_MODEL" && (
              <AlertModal
                close={closeModal}
                message={props.previousData}
              />
            )}
          </div>
        </ReactModal>
      </div>
    </>
  );
};

export default DraggableModal;
