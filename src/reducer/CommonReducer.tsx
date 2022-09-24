import {
  RESET_SD_MASTER_DATA,
  RESET_SEARCH_RESULT,
  SEARCH_RESULT,
  SET_SD_MASTER_DATA,
  PAGE_TITLE,
  PAGE_ACTIVE,
  SET_ADDITIONAL_INFORMATION,
  SET_CUSTOMER_INFO_MODAL,
  SET_ADDRESS,
} from "../action/Types";

export interface APIState {
  sd_master: {};
  ar_master: {};
  address: any;
}

export interface PageTitle {
  title: string;
}

export interface PageActiveState {
  title: string;
}

export interface AdditionalInfoState {
  AdditionalInfo: object;
}

export interface SearchState {
  searchData: any;
}

export interface CustomerModalState {
  isShow: boolean;
}

export interface AddressState {
  addressData: object;
}

interface Action {
  type: string;
  payload?: any;
}

export const SDMasterReducer = (
  state: APIState = { sd_master: {}, ar_master: {}, address: null },
  action: Action
) => {
  switch (action.type) {
    case SET_SD_MASTER_DATA:
      return {
        sd_master: action.payload["SDserviceMaster"],
        ar_master: action.payload["ARCustomerMaster"],
        address: action.payload["Address"],
      };
    case RESET_SD_MASTER_DATA:
      return { sd_master: {}, ar_master: {}, address: "", searchData: {} };
    default:
      return state;
  }
};

export const SearchResultReducer = (
  state: SearchState = { searchData: {} },
  action: Action
) => {
  switch (action.type) {
    case SEARCH_RESULT:
      return { searchData: action.payload };
    case RESET_SEARCH_RESULT:
      return { searchData: {} };
    default:
      return state;
  }
};

export const getPageTitle = (
  state: PageTitle = { title: "" },
  action: Action
) => {
  switch (action.type) {
    case PAGE_TITLE:
      return { title: action.payload };
    default:
      return state;
  }
};

export const getActivePage = (
  state: PageActiveState = { title: "" },
  action: Action
) => {
  switch (action.type) {
    case PAGE_ACTIVE:
      return { title: action.payload };
    default:
      return state;
  }
};

export const getAdditionalInfo = (
  state: AdditionalInfoState = { AdditionalInfo: {} },
  action: Action
) => {
  switch (action.type) {
    case SET_ADDITIONAL_INFORMATION:
      return { AdditionalInfo: action.payload };
    default:
      return state;
  }
};


export const getCustomerInfoModal = (
  state: CustomerModalState = { isShow: false },
  action: Action
) => {
  switch (action.type) {
    case SET_CUSTOMER_INFO_MODAL:
      return { isShow: action.payload };
    default:
      return state;
  }
};


export const getAddress = (
  state: AddressState = { addressData: {} },
  action: Action
) => {
  switch (action.type) {
    case SET_ADDRESS:
      return { addressData: action.payload };
    default:
      return state;
  }
};