import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "../reducer/AuthReducer";
import { sideBarReducer } from "../reducer/SideBarReducer";
import { SDMasterReducer, SearchResultReducer, getPageTitle, getActivePage, getAdditionalInfo, getCustomerInfoModal, getAddress } from "../reducer/CommonReducer";

const reducers = combineReducers({
    userLogin: userLoginReducer,
    sideBar: sideBarReducer,
    sdMaster: SDMasterReducer,
    search: SearchResultReducer,
    pageTitle: getPageTitle,
    pageActive: getActivePage,
    additionalInformation: getAdditionalInfo,
    customerModal: getCustomerInfoModal,
    address: getAddress,
})

const initialState = {}

const middleware = [thunk]

const store = legacy_createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;

export type RootState = ReturnType<typeof store.getState>