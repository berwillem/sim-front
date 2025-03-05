import { Outlet, useParams } from "react-router-dom";
import MiniNav from "../../components/MiniNav/MiniNav";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const useridCheck = useSelector((state) => state?.auth?.user?._id);
  const role = useSelector((state) => state?.auth?.user?.role);

  useEffect(() => {
    if (role != "admin") {
      if (useridCheck !== userId) {
        return navigate("/notfound");
      }
    }
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="userprofile">
        <MiniNav tour={false}></MiniNav>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default ProfileLayout;
