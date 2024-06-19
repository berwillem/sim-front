import { Outlet } from "react-router-dom";
import MiniNav from "../../components/MiniNav/MiniNav";
import Navbar from "../../components/Navbar/Navbar";

const ProfileLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="userprofile">
        <MiniNav></MiniNav>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default ProfileLayout;
