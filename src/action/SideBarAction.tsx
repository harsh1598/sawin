import { IS_SHOW_HUMBERG_MENU } from "./Types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../config/Store";
import { AnyAction } from "redux";


export const handleHumburgMenu = (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        dispatch({
            type: IS_SHOW_HUMBERG_MENU,
        })
    }