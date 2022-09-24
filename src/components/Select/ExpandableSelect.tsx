import "./SawinSelect.scss";
import { useState, Fragment, useEffect } from "react";
import { Options } from "./SawinSelect";
import useClickOutside from "../../hooks/useClickOutside";

import {
  CaretRightFill,
  CaretDownFill,
  ChevronDown,
} from "react-bootstrap-icons";

interface PropData {
  placeholder?: string;
  options: ExpandOption[];
  selected: any;
  onChange: any;
}

export interface ExpandOption {
  isView?: boolean;
  value: string;
  values: Options[];
}

const ExpandableSelect = (props: PropData) => {
  const [options, setOptions] = useState(props.options);
  const [selectedOption, setSelectedOption] = useState(props.selected);
  const [isFocus, setIsFocus] = useState(false);

  let index = -1;
  let selectedValue = "";
  const [userInput, setUserInput] = useState(
    selectedValue ? selectedValue : props.placeholder
  );
  const [selectedIndex, setSelectedIndex] = useState(index);

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  useEffect(() => {
    setSelectedOption(props.selected);
    setUserInput(selectedValue ? selectedValue : props.placeholder);
  }, [props.selected]);

  let domNode = useClickOutside(() => {
    setIsFocus(false);
  }, this);

  let optionsListComponent;

  if (options.length) {
    optionsListComponent = (
      <ul className="expand-option">
        {options.map((suggestion: ExpandOption, i) => {
          return (
            <li>
              {suggestion.isView ? (
                <CaretDownFill
                  className="expandIcon"
                  onClick={() => {
                    onclickArrow(suggestion);
                  }}
                />
              ) : (
                <CaretRightFill
                  className="expandIcon"
                  onClick={() => {
                    onclickArrow(suggestion);
                  }}
                />
              )}
              {suggestion.value}
              {suggestion.isView ? (
                <ul className="primary">
                  {suggestion.values.map((option: Options, index) => {
                    let className = "";
                    if (index === selectedIndex) {
                      className = "option-active";
                    }

                    return (
                      <li
                        className={className}
                        key={index}
                        onMouseDown={() => onSelect(option)}
                      >
                        {option.code ? (
                          <div className="row option">
                            <div className="col-3 code-div">
                              {" "}
                              {option.code}{" "}
                            </div>
                            <span className="col-1 vertical-line"></span>
                            <div className="col-6">{option.value}</div>
                          </div>
                        ) : (
                          <div className="option">{option.value}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    );
  } else {
    optionsListComponent = (
      <div className="no-options">
        <em>No data found</em>
      </div>
    );
  }

  const onclickArrow = (e: ExpandOption) => {
    setOptions(
      options.map((option: ExpandOption) =>
        option.value === e.value
          ? { ...option, isView: !option.isView }
          : { ...option, isView: false }
      )
    );
  };

  const onSelect = (e: Options) => {
    setIsFocus(false);
    setUserInput(e.value);
    setSelectedOption(e.id);
    setSelectedIndex(index);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleKey = (e: any) => {
    if (e.keyCode === 40) {
      if (selectedIndex < options.length - 1)
        setSelectedIndex(selectedIndex + 1);
    } else if (e.keyCode === 38) {
      if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    } else if (e.keyCode === 13) {
      //   options.map((value: Options, i: number) => {
      //     if (selectedIndex === i) {
      //       onSelect(value);
      //     }
      //   });
    }
  };

  return (
    <>
      <Fragment>
        <div ref={domNode} className="row select">
          <div
            className={"form-style " + (isFocus ? "zindex" : "")}
            style={{ height: 45 }}
            onKeyDown={(e) => {
              handleKey(e);
            }}
            tabIndex={0}
            onMouseDown={() => {
              if (!isFocus) {
                setIsFocus(true);
              }
            }}
          >
            <div className="form-control select-div">
              {userInput}
              <div
                className="right-icon"
                onMouseDown={() => {
                  if (isFocus) {
                    setIsFocus(false);
                  }
                }}
              >
                <ChevronDown id="img_downarrow" className="downarrow" />
              </div>
            </div>
            {isFocus ? optionsListComponent : ""}
          </div>
        </div>
      </Fragment>
    </>
  );
};

ExpandableSelect.defaultProps = {
  placeholder: "Select",
  selected: "",
  isView: false,
};

export default ExpandableSelect;
