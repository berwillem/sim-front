import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

const AdminLayout = () => {
  return (
    <>
      <SideBar></SideBar>
      <Outlet></Outlet>
    </>
  );
};

export default AdminLayout;
