import search from "../../assets/images/Search.svg";
import React, { useState, Fragment } from "react";
import WebService from "../../utility/WebService";
import Loader from "../Loader/Loader";
import { search_criteria, search_field } from "../../utility/HelperService";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { resetSDMaster, SearchValue } from "../../action/CommonAction";
import SawinSelect, { Options } from "../Select/SawinSelect";
import useClickOutside from "../../hooks/useClickOutside";
import "./Search.scss";


interface PropData {
  data: any;
}

interface Suggestions {
  text: string;
  value: string;
  key: string;
}

const Search = (props: PropData) => {
  let domNode = useClickOutside(() => {
    setSearchResult([]);
    setFilteredSuggestions([]);
    setShowSearchSuggestions(false);
  }, this);

  const dispatch: Dispatch<any> = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestions[]>(
    []
  );
  const [showSuggestions, setShowSuggestions] = useState(false);   // advance search
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);  // normal search and also use for show api output in advance search
  const [userInput, setUserInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showField, setShowField] = useState(false);
  const [value, setValue] = useState("");
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "");

  const onChange = (e: any) => {
    setShowSearchSuggestions(false);
    setShowSuggestions(true);
    setSearchResult([]);
    const userInput = e.currentTarget.value;
    if (value === "Service Master") {
      const suggestions: Suggestions[] = [
        { text: "<b>" + userInput + "</b> in SM#", value: userInput, key: 'Id' },
        { text: "<b>" + userInput + "</b> in SM Name", value: userInput, key: 'SM Name' },
        { text: "<b>" + userInput + "</b> in Company", value: userInput, key: 'CompanyName' },
        { text: "<b>" + userInput + "</b> in Zip", value: userInput, key: 'ZipCode' },
        { text: "<b>" + userInput + "</b> in Address", value: userInput, key: 'Address' },
      ];
      setFilteredSuggestions(suggestions);
    } else if (value === "Proposal") {
      const suggestions: Suggestions[] = [
        { text: "<b>" + userInput + "</b> in SM#", value: userInput, key: 'Id' },
        { text: "<b>" + userInput + "</b> in Name", value: userInput, key: 'Name' },
        { text: "<b>" + userInput + "</b> in Company", value: userInput, key: 'CompanyName' },
        { text: "<b>" + userInput + "</b> in Quote#", value: userInput, key: 'Quote#' },
      ];
      setFilteredSuggestions(suggestions);
    } else if (value === "Service Call") {
      const suggestions: Suggestions[] = [
        { text: "<b>" + userInput + "</b> in  Call#", value: userInput, key: 'Id' },
        { text: "<b>" + userInput + "</b> in Invoice#", value: userInput, key: 'Invoice#' },
        { text: "<b>" + userInput + "</b> in SM#", value: userInput, key: 'SM#' },
        { text: "<b>" + userInput + "</b> in Name", value: userInput, key: 'Name' },
        { text: "<b>" + userInput + "</b> in Quote#", value: userInput, key: 'Quote#' },
      ];
      setFilteredSuggestions(suggestions);
    } else if (value === "Quote") {
      const suggestions: Suggestions[] = [
        { text: "<b>" + userInput + "</b> in Call#", value: userInput, key: 'Id' },
        { text: "<b>" + userInput + "</b> in  SM#", value: userInput, key: 'SM#' },
        { text: "<b>" + userInput + "</b> in Name", value: userInput, key: 'Name' },
        { text: "<b>" + userInput + "</b> in Zip", value: userInput, key: 'ZipCode' },
      ];
      setFilteredSuggestions(suggestions);
    } else if (value === "Invoice") {
      const suggestions: Suggestions[] = [
        { text: "<b>" + userInput + "</b> in  Invoice#", value: userInput, key: 'Id' },
        { text: "<b>" + userInput + "</b> in  Call#", value: userInput, key: 'Call#' },
        { text: "<b>" + userInput + "</b> in  SM#", value: userInput, key: 'SM#' },
        { text: "<b>" + userInput + "</b> in  Name", value: userInput, key: 'Name' },
      ];
      setFilteredSuggestions(suggestions);
    } else if (value === "PO") {
      const suggestions: Suggestions[] = [
        { text: "<b>" + userInput + "</b> in  PO#", value: userInput, key: 'Id' },
        { text: "<b>" + userInput + "</b> in  Call#", value: userInput, key: 'Call#' },
        { text: "<b>" + userInput + "</b> in  SM#", value: userInput, key: 'SM#' },
      ];
      setFilteredSuggestions(suggestions);
    }
    else if (value === "Project") {
      const suggestions: Suggestions[] = [
        { text: "<b>" + userInput + "</b> in  Project#", value: userInput, key: 'Id' },
        { text: "<b>" + userInput + "</b> in  Call#", value: userInput, key: 'Call#' },
        { text: "<b>" + userInput + "</b> in  SM#", value: userInput, key: 'SM#' },
        { text: "<b>" + userInput + "</b> in  Name", value: userInput, key: 'Name' },
        { text: "<b>" + userInput + "</b> in  Invoice#", value: userInput, key: 'Invoice#' },
      ];
      setFilteredSuggestions(suggestions);
    }
    else if (value === "Return") {
      const suggestions: Suggestions[] = [
        { text: "<b>" + userInput + "</b> in  Return#", value: userInput, key: 'Id' },
        { text: "<b>" + userInput + "</b> in  Call#", value: userInput, key: 'Call#' },
        { text: "<b>" + userInput + "</b> in  SM#", value: userInput, key: 'SM#' },
      ];
      setFilteredSuggestions(suggestions);
    }
    else if (value === "Contract") {
      const suggestions: Suggestions[] = [
        { text: "<b>" + userInput + "</b> in  Contract#", value: userInput, key: 'Contract#' },
        { text: "<b>" + userInput + "</b> in  SM#", value: userInput, key: 'SM#' },
        { text: "<b>" + userInput + "</b> in  Name", value: userInput, key: 'Name' },
      ];
      setFilteredSuggestions(suggestions);
    }
    else {
      const suggestions: Suggestions[] = [];
      setFilteredSuggestions(suggestions);
    }
    setActiveSuggestion(0);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  };

  const showSearchField = () => {
    setUserInput("");
    setValue("Service Master");
    setShowField(!showField);
  };

  const onChange1 = (e: any) => {
    setUserInput(e.currentTarget.value);
    if (e.currentTarget.value) {
      //setLoading(true);
      WebService.postAPI({
        action: "SDServiceMaster/SearchSM",
        body: {
          SearchField: search_field,
          SearchCriteria: search_criteria,
          SearchValue: e.currentTarget.value,
          IncludeInactive: true,
          AccountId: user_info["AccountId"],
          CompanyId: user_info["CompanyId"],
        },
      })
        .then((res: any) => {
          setShowSearchSuggestions(true);
          setSearchResult(res);
        })
        .catch((e) => { });
    }
  };

  const onKeyDown = (e: any) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion].text);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const onClick = (e: Suggestions) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setLoading(true);
    setShowSearchSuggestions(true);

    if (value === "Invoice") {
      WebService.getAPI({
        action:
          "/SDInvoice/IsInvoiceExist/" +
          user_info["AccountId"] +
          "/" +
          user_info["CompanyId"] +
          "/" +
          e.value,
        body: {},
      })
        .then((res: any) => {
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else if (value === "Proposal") {
      WebService.postAPI({
        action: "SaiSDQuoteMaster/FilterQuotes",
        body: {
          AccountId: user_info['AccountId'],
          CompanyId: user_info['CompanyId'],
          FieldName: e.key,
          Operator: 1,
          Value: "CPU-Check",
        },
      })
        .then((res: any) => {
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else if (value === "Service Master") {
      WebService.postAPI({
        action: "SDServiceMaster/SearchSM",
        body: {
          AccountId: user_info['AccountId'],
          CompanyId: user_info['CompanyId'],
          SearchField: e.key,
          IncludeInactive: true,
          SearchCriteria:	"4",
          Operator: 1,
          SearchValue: e.value,
        },
      })
        .then((res: any) => {
          setSearchResult(res);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      WebService.postAPI({
        action: "Search/Search",
        body: {
          AccountId: user_info['AccountId'],
          CompanyId: user_info['CompanyId'],
          Field: e.key,
          Operator: search_criteria,
          SearchText: e.value,
        },
      })
        .then((res: any) => {
          setSearchResult(res);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  };

  const onClickSearchResult = (e: any, data: any) => {
    dispatch(resetSDMaster());
    setSearchResult([]);
    setShowSearchSuggestions(false);
    setUserInput("");
    props.data(data);
    dispatch(SearchValue(data));
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion: Suggestions, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li
                className={className}
                key={index}
                onClick={() => onClick(suggestion)}
              >
                <div dangerouslySetInnerHTML={{ __html: suggestion.text }} />
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  let searchResultComponent;

  if (showSearchSuggestions && userInput) {
    if (searchResult.length) {
      searchResultComponent = (
        <ul className="suggestions">
          {searchResult.map((data: any, index) => {
            let className;

            return (
              <li
                className={className}
                key={index}
                onClick={(e) => onClickSearchResult(e, data)}
              >
                <div>
                  {data["Id"]}-{data["SMName"]}
                  <br />
                  <p className="search-address"> {data["Address"]}</p>
                </div>
              </li>
            );
          })}
        </ul>
      );
    } else {
      searchResultComponent = (
        <div className="no-suggestions">
          <em>No search result found</em>
        </div>
      );
    }
  }

  const options: Options[] = [
    { id: 1, value: "Service Master" },
    { id: 2, value: "Invoice" },
    { id: 3, value: "Proposal" },
    { id: 4, value: "Contract" },
    { id: 5, value: "PO" },
    { id: 6, value: "Return" },
    { id: 7, value: "Project" },
    { id: 8, value: "Service Call" },
    { id: 9, value: "Quote" },
  ];

  const selectValue = (data: any) => {
    setUserInput("");
    setValue(data.value);
  };

  return (
    <>
      <Loader show={isLoading} />
      <Fragment>
        <div
          ref={domNode}
          className="row col-8 justify-content-end mr-15 search"
        >
          {showField && (
            <div className="col-4">
              <SawinSelect
                options={options}
                selected={1}
                onChange={selectValue}
                type={"ARROW"}
              />
            </div>
          )}
          {showField ? (
            <div
              className="col-lg-6 form-style position-relative form-style"
              style={{ height: 45 }}
            >
              <input
                className="form-control"
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                placeholder={"Search"}
              />
              {suggestionsListComponent}
              {searchResultComponent}
              <div className="advance-search-text text-end">
                <span
                  onClick={() => showSearchField()}
                  style={{ cursor: "pointer" }}
                >
                  Basic search
                </span>
              </div>
            </div>
          ) : (
            <div
              className="col-lg-7 form-style position-relative form-style"
              style={{ height: 45 }}
            >
              <input
                className="form-control"
                type="text"
                onChange={onChange1}
                value={userInput}
                placeholder={"Search"}
              />
              {searchResultComponent}
              <div className="advance-search-text text-end">
                <span
                  onClick={() => showSearchField()}
                  style={{ cursor: "pointer" }}
                >
                  Advance search
                </span>
              </div>
            </div>
          )}
          <img
            src={search}
            id="img_header"
            className="search-icon"
            alt="search"
          />
        </div>
      </Fragment>
    </>
  );
};

export default Search;
