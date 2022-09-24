import "./Button.scss";

interface PropData {
  primary?: boolean;
  size?: string;
  label: string;
  b_disabled?: boolean;
  b_type?: string;
  onClick: any;
}

export const Button = (props: PropData) => {
  const mode = props.primary ? "primary-button" : "secondary-button";
  return (
    <button
      type="submit"
      disabled={props.b_disabled}
      className={
        props.b_type === "CANCEL"
          ? "cancel-button"
          : mode + " sawin-button " + "button-" + props.size
      }
      {...props}
    >
      {props.label}
    </button>
  );
};

Button.defaultProps = {
  primary: false,
  size: "medium",
  onClick: undefined,
  b_disabled: false,
  b_type: "SAVE",
};
