import moment from "moment";
const HelperService = {
  allowOnlyNumericValue(e: any) {
    var numbers = /^[0-9]$/;
    if (!e.key.match(numbers) && e.keyCode !== 8) {
      e.preventDefault();
      return false;
    }

    if (e.currentTarget.value.length > 11) {
      e.preventDefault();
      return false;
    }
  },
  contactFormatter: function (e: any) {
    e.currentTarget.value = this.getFormattedContact(
      e.currentTarget.value ? e.currentTarget.value.replaceAll("-", "") : ""
    );
  },
  getFormattedContact: function (e: any) {
    const match = e.replace(/\D+/g, "");
    const part1 = match.length > 2 ? `${match.substring(0, 3)}` : match;
    const part2 = match.length > 3 ? `-${match.substring(3, 6)}` : "";
    const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : "";
    var x = part1 + "" + part2 + "" + part3;
    return x;
  },

  getCurrencyFormatter: function (e: any) {
    var num = e;
    var formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
    return formatted;
  },

  getFormatedDate(d: any) {
    return d ? moment(d).format("MM/DD/YYYY") : "";
  },

  getFormatedDateAndTime(dt: any) {
    return moment.utc(dt).local().format("MM/DD/YYYY, hh:mm A")
  },

  removeHtml(data: string) {
    if (data) {
      return data
        .replace(/<\/?[^>]+(>|$)/g, " ")
        .replace(/\&nbsp;/g, "")
        .replaceAll("&amp;", "&")
        .replaceAll("&quot;", '"')
        .replaceAll("&#39;", "'")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .trim();
    }

    return "";
  },

  isEmptyObject(data: object) {
    return Object.keys(data).length === 0;
  }
};

export const search_criteria = "4";
export const search_field = "Name";

export default HelperService;

export const getCurrentPage = (url: string) => {
  if (url === "/dashboard") {
    return "Dashboard";
  } else if (url === "/service-master") {
    return "Service";
  } else {
    return "Dashboard";
  }
};
