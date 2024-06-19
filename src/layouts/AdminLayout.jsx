import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import "./AdminLayout.css";
import AdminCheck from "../components/AdminCheck/AdminCheck";
const AdminLayout = () => {
  return (
    <>
      <AdminCheck> </AdminCheck>
      <div className="adminlayout">
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default AdminLayout;
