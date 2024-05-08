import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import "./AdminLayout.css";
const AdminLayout = () => {
  return (
    <div className="adminlayout">
      <SideBar></SideBar>
      <Outlet></Outlet>
    </div>
  );
};

export default AdminLayout;
