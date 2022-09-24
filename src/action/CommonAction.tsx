import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../config/Store";
import { AnyAction } from "redux";
import {
  RESET_SD_MASTER_DATA,
  SEARCH_RESULT,
  SET_SD_MASTER_DATA,
  PAGE_TITLE,
  PAGE_ACTIVE,
  SET_ADDITIONAL_INFORMATION,
  SET_CUSTOMER_INFO_MODAL,
  SET_ADDRESS,
} from "./Types";

export const SDMaster =
  (data: object): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
      dispatch({
        type: SET_SD_MASTER_DATA,
        payload: data,
      });
    };

export const resetSDMaster = () => ({ type: RESET_SD_MASTER_DATA });

export const SearchValue =
  (data: object): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
      dispatch({
        type: SEARCH_RESULT,
        payload: data,
      });
    };

export const SetPageTitle =
  (data: string): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
      dispatch({
        type: PAGE_TITLE,
        payload: data,
      });
    };

export const ActivePage =
  (data: string): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
      dispatch({
        type: PAGE_ACTIVE,
        payload: data,
      });
    };

export const AdditionalInfo =
  (data: object): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
      dispatch({
        type: SET_ADDITIONAL_INFORMATION,
        payload: data,
      });
    };


export const CustomerView =
  (data: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
      dispatch({
        type: SET_CUSTOMER_INFO_MODAL,
        payload: data,
      });
    };

export const AddAddress =
  (data: object): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
      dispatch({
        type: SET_ADDRESS,
        payload: data,
      });
    };    