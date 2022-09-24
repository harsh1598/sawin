import { Button } from "../Button/Button";

const AlertModal = (props) => {
  return (
    <>
      <div className="p-3">
        <div className="ml-3">{props.message}</div>
      </div>
      <div className="m-2 text-end">
        <Button
          size="large"
          onClick={() => props.close()}
          label="OK"
        >
        </Button>
      </div>
    </>
  );
};
export default AlertModal;
