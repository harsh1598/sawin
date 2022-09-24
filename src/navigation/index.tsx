import { Routes, Route, Navigate, RouteProps } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../screens/Auth/Login/Login";
import SignUp from "../screens/Auth/Signup/Signup";
import Main from "../screens/Main";
import Service from "../screens/ServiceMaster/Service";
import ServiceJob from "../screens/ServiceMaster/ServiceJob/ServiceJob";
import SalesCall from "../screens/ServiceMaster/SalesCall/SalesCall";
import ContactInvoices from "../screens/ServiceMaster/ContractInvoices/ContractInvoices";
import Contracts from "../screens/ServiceMaster/Contracts/Contracts";
import AddContract from "../screens/ServiceMaster/Contracts/AddContract/AddContract";
import AddContractMaintenanceSchedule from "../screens/ServiceMaster/Contracts/AddContract/AddContractMaintenanceSchedule";
import AddContractBilling from "../screens/ServiceMaster/Contracts/AddContract/AddContractBilling";
import ViewDetails from "../screens/ServiceMaster/Contracts/AddContract/ViewDetails";
import Equipment from "../screens/ServiceMaster/Equipment/Equipment";
import Proposal from "../screens/ServiceMaster/Proposal/Proposal";
import Projects from "../screens/ServiceMaster/Projects/Projects";
import ProspectNote from "../screens/ServiceMaster/ProspectNote/ProspectNote";
import Document from "../screens/ServiceMaster/Document/Document";
import Recommendations from "../screens/ServiceMaster/Recommendations/Recommendations";
import EditAddress from "../screens/ServiceMaster/EditAddress/EditAddress";
import DashBoard from "../screens/DashBoard/DashBoard";
import Contact from "../screens/ServiceMaster/Contact/Contact";
import { useSelector } from "react-redux";
import { RootState } from "../config/Store";
import MainMasterComponent from "../components/ServiceMasterComponents/MainMasterComponent/MainMasterComponent";

// Admin Module
import CompanyInfo from "../screens/Admin/CompanySetup/Company/Information/CompanyInfo";
import { UserState } from "../reducer/AuthReducer";
import AddDocument from "../screens/ServiceMaster/Document/AddDocument";
import Communication from "../screens/ServiceMaster/Communication/Communication";

const Navigation = () => {
  const login: any = useSelector<RootState, UserState>((state) => state.userLogin);

  console.log("Login", login.loginSuccess)

  interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    authenticationPath: string;
  }

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: localStorage.getItem("token") !== null,
    authenticationPath: "/login",
  };

  return (
    <>
      <div id="main-wraper">
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route
            path="/login"
            element={
              defaultProtectedRouteProps.isAuthenticated || login.loginSuccess ? (
                <Navigate replace to="/dashboard" />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={
              defaultProtectedRouteProps.isAuthenticated || login.loginSuccess ? (
                <Navigate replace to="/dashboard" />
              ) : (
                <SignUp />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<Main />}
              />
            }
          >
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/" element={<Service />}>
              <Route path="/service-master" element={<MainMasterComponent />} />
              <Route path="/service-job" element={<ServiceJob />} />
              <Route path="/sales-call" element={<SalesCall />} />
              <Route path="/contact-invoices" element={<ContactInvoices />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/add-contract" element={<AddContract />} />
              <Route path="/add-contract-2" element={<AddContractMaintenanceSchedule />} />
              <Route path="/add-contract-3" element={<AddContractBilling />} />
              <Route path="/view-details" element={<ViewDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/proposal" element={<Proposal />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/prospect-note" element={<ProspectNote />} />
              <Route path="/document" element={<Document />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/communication" element={<Communication />} />
            </Route>
            <Route path="/new-service-master" element={<EditAddress />} />
            <Route path="/comapany-information" element={<CompanyInfo />} />
            <Route path="/edit-service-master/:id" element={<EditAddress />} />
            <Route path="/edit-bill-info/:id" element={<EditAddress />} />
            <Route path="/add-document" element={<AddDocument />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </>
  );
};

export default Navigation;
