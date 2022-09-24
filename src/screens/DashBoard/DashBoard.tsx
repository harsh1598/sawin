import React, {useEffect} from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { SetPageTitle } from "../../action/CommonAction";

const DashBoard = () => {
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(SetPageTitle("Dashboard"));
  }, []);


  return <></>;
};

export default DashBoard;
