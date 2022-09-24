import WebService from "./WebService";

interface PropData {
  data?: any;
  user_info?: any;
  is_new?: boolean;
}

var caches = {
  locations: undefined,
  cusId: undefined,
  smId: undefined,
  address: undefined,
  business: undefined,
  sourceCode: undefined,
  serviceType: undefined,
  technician: undefined,
  priceSheet: undefined,
  labels: undefined,
  equipments: undefined,
};

export const getServiceMaster = (props: PropData) => {
  return WebService.getAPI({
    action: `SDserviceMaster/${props.data["Id"]}_${props.user_info["AccountId"]}_${props.user_info["CompanyId"]}`,
    body: null,
  })
    .then((res: any) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const getAddress = (props: PropData) => {
  return new Promise((resolve, reject) => {
    if (
      props.is_new ||
      props.data.sd_master.SDEquipmentMasters[0].ARCustomerMasterId !=
        caches.cusId
    ) {
      caches.address = undefined;
    }

    if (caches.address) {
      resolve(caches.address);
      return;
    }

    WebService.getAPI({
      action: `SDserviceMaster/GetSmListByArV2/${props.data.sd_master.SDEquipmentMasters[0].ARCustomerMasterId}/${props.user_info["AccountId"]}/${props.user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        caches.cusId =
          props.data.sd_master.SDEquipmentMasters[0].ARCustomerMasterId;
        caches.address = res;
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getLocation = (props: PropData) => {
  return new Promise((resolve, reject) => {
    if (props.is_new) {
      caches.locations = undefined;
    }

    if (caches.locations) {
      resolve(caches.locations);
      return;
    }

    WebService.getAPI({
      action: `SetupGLBreak/${props.user_info["AccountId"]}/${props.user_info["CompanyId"]}/1`,
      body: null,
    })
      .then((res: any) => {
        caches.locations = res;
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getBusiness = (props: PropData) => {
  return new Promise((resolve, reject) => {
    if (props.is_new) {
      caches.business = undefined;
    }

    if (caches.business) {
      resolve(caches.business);
      return;
    }

    WebService.getAPI({
      action: `SetupGLBreak/${props.user_info["AccountId"]}/${props.user_info["CompanyId"]}/2`,
      body: null,
    })
      .then((res: any) => {
        caches.business = res;
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getSourceCode = (props: PropData) => {
  return new Promise((resolve, reject) => {
    if (props.is_new) {
      caches.sourceCode = undefined;
    }

    if (caches.sourceCode) {
      resolve(caches.sourceCode);
      return;
    }

    WebService.getAPI({
      action: `SetupSDSourceCode/GetSetupSDSourceCodes/${props.user_info["AccountId"]}/${props.user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        caches.sourceCode = res;
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getServiceTypeAll = (props: PropData) => {
  return new Promise((resolve, reject) => {
    if (props.is_new) {
      caches.serviceType = undefined;
    }

    if (caches.serviceType) {
      resolve(caches.serviceType);
      return;
    }

    WebService.getAPI({
      action: `SetupSDServiceType/GetAll/${props.user_info["AccountId"]}/${props.user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        caches.serviceType = res;
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getTechnician = (props: PropData) => {
  return new Promise((resolve, reject) => {
    if (props.is_new) {
      caches.technician = undefined;
    }

    if (caches.technician) {
      resolve(caches.technician);
      return;
    }

    WebService.getAPI({
      action: `SetupSaiSDTechMaster/${props.user_info["AccountId"]}/${props.user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        caches.technician = res;
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getPriceSheet = (props: PropData) => {
  return new Promise((resolve, reject) => {
    if (props.is_new) {
      caches.priceSheet = undefined;
    }

    if (caches.priceSheet) {
      resolve(caches.priceSheet);
      return;
    }

    WebService.getAPI({
      action: `SetupSDPriceSheet/GetAll/${props.user_info["AccountId"]}/${props.user_info["CompanyId"]}/true`,
      body: null,
    })
      .then((res: any) => {
        caches.priceSheet = res;
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getLabels = (props: PropData) => {
  return new Promise((resolve, reject) => {
    if (props.is_new) {
      caches.labels = undefined;
    }

    if (caches.labels) {
      resolve(caches.labels);
      return;
    }

    WebService.getAPI({
      action: `SetupGLCompany/${props.user_info["AccountId"]}/${props.user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        caches.labels = res;
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getEquipments = (props: PropData) => {
  return new Promise((resolve, reject) => {
    if (props.is_new || props.data.sd_master.Id != caches.smId) {
      caches.equipments = undefined;
    }

    if (caches.equipments) {
      resolve(caches.equipments);
      return;
    }

    WebService.getAPI({
      action:
        "SDEquipmentMaster/GetServiceMasterEquipments/" +
        props.user_info["AccountId"] +
        "/" +
        props.user_info["CompanyId"] +
        "/" +
        props.data.sd_master.Id,
      body: null,
    })
      .then((res: any) => {
        caches.smId = props.data.sd_master.Id;
        caches.equipments = res;
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
