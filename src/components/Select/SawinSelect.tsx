import "./SawinSelect.scss";
import React, { useState, Fragment, useEffect } from "react";
import useClickOutside from "../../hooks/useClickOutside";

import { ChevronDown } from "react-bootstrap-icons";

interface PropData {
  placeholder?: string;
  options: Options[];
  selected: any;
  isSearchable?: boolean;
  onChange: any;
  type?: string;
  sakey?: string;
  disValue?: string;
  disCode?: string;
  value?: string;
  isHideArrow?: boolean;
}

export interface Options {
  id: any;
  code?: string;
  value: string;
  parentCode?: string;
}

const SawinSelect = (props: PropData) => {
  let textInput = React.createRef<HTMLInputElement>();
  const [isSearchable, setIsSearchable] = useState(props.isSearchable);
  const [placeholder, setPlaceholder] = useState(props.placeholder);
  const [options, setOptions] = useState(props.options);
  const [selectedOption, setSelectedOption] = useState(props.selected);
  const [isFocus, setIsFocus] = useState(false);
  const [search, setSearch] = useState("");

  let index = 0;
  let selectedValue = "";
  const [userInput, setUserInput] = useState(
    isSearchable ? "" : props.placeholder
  );

  options.map((value, i: number) => {
    if (value.id === selectedOption) {
      index = i;
      selectedValue = value.value;
      if (userInput !== selectedValue) {
        setUserInput(selectedValue);
      }
    }
  });

  useEffect(() => {
    setSelectedOption(props.selected);
  }, [props.selected]);

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  const [selectedIndex, setSelectedIndex] = useState(index);

  let domNode = useClickOutside(() => {
    setIsFocus(false);
  }, this);

  let optionsListComponent;

  let searchOption: Options[] = search
    ? options.filter(function (option) {
        return option.value.includes(search);
      })
    : options;

  if (searchOption.length) {
    optionsListComponent = (
      <ul className="options">
        {searchOption.map((suggestion: Options, index) => {
          let className;
          if (index === selectedIndex) {
            className = "option-active";
          }

          return (
            <li
              className={className}
              key={index}
              onMouseDown={() => onSelect(suggestion)}
            >
              {suggestion.code ? (
                <div className="row option">
                  <div className="col-3 code-div"> {suggestion.code} </div>
                  <span className="col-1 vertical-line"></span>
                  <div className="col-6">{suggestion.value}</div>
                </div>
              ) : (
                <div className="option">{suggestion.value}</div>
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

  const onSelect = (e: Options) => {
    setSearch("");
    setIsFocus(false);
    setUserInput(e.value);
    setSelectedOption(e.id);
    options.map((value, i: number) => {
      if (value.id === e.id) {
        index = i;
        selectedValue = value.value;
      }
    });

    setSelectedIndex(index);
    if (props.onChange) {
      props.onChange(e);
    }
    //emit event
  };

  const handleKey = (e: any) => {
    if (e.keyCode === 40) {
      if (selectedIndex < options.length - 1)
        setSelectedIndex(selectedIndex + 1);
    } else if (e.keyCode === 38) {
      if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    } else if (e.keyCode === 13) {
      options.map((value: Options, i: number) => {
        if (selectedIndex === i) {
          onSelect(value);
        }
      });
    }
  };

  return (
    <>
      <Fragment>
        <div
          ref={domNode}
          id={props.sakey}
          key={props.sakey}
          className="select w-100"
        >
          {isSearchable ? (
            <div
              className={"form-style " + (isFocus ? "zindex" : "")}
              style={{ height: 45 }}
              tabIndex={0}
            >
              <input
                ref={textInput}
                className="form-control"
                value={isFocus ? search : userInput}
                type="text"
                onKeyDown={(e) => {
                  handleKey(e);
                }}
                onMouseDown={() => {
                  setIsFocus(!isFocus);
                }}
                placeholder={placeholder}
                onChange={(e) => setSearch(e.target.value)}
              />
              {!props.isHideArrow || !isFocus ? (
                <div className="col-12 d-flex justify-content-end">
                  <ChevronDown id="img_downarrow" className="searchdownarrow" />
                </div>
              ) : (
                ""
              )}
              {isFocus ? optionsListComponent : ""}
            </div>
          ) : (
            <div
              className={"form-style " + (isFocus ? "zindex" : "")}
              style={{ height: 45 }}
              onKeyDown={(e) => {
                handleKey(e);
              }}
              tabIndex={0}
              onMouseDown={() => {
                setIsFocus(!isFocus);
              }}
            >
              <div className="form-control select-div">
                <span>{userInput}</span>
                {!props.isHideArrow || isFocus ? (
                  <div className="right-icon">
                    <ChevronDown id="img_downarrow" className="downarrow" />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {isFocus ? optionsListComponent : ""}
            </div>
          )}
        </div>
      </Fragment>
    </>
  );
};

SawinSelect.defaultProps = {
  placeholder: "Select",
  selected: "",
  isSearchable: false,
  sakey: new Date().getTime(),
  type: "ARROW",
  isHideArrow: false,
  options: [],
};

export default SawinSelect;
