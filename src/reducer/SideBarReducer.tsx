import { IS_SHOW_HUMBERG_MENU } from "../action/Types"

export interface HumbrugState {
    isShow: false
}

interface Action {
    type: string,
}
export const sideBarReducer = (state: HumbrugState = { isShow: false }, action: Action) => {
    switch (action.type) {
        case IS_SHOW_HUMBERG_MENU:
            return { isShow: !state.isShow }
        default:
            return state
    }

}