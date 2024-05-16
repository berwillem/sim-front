import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CiGlobe, CiLogout, CiMenuBurger } from "react-icons/ci";
import Logo from "../../assets/logo.png";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import Popover from "../Popover/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineProfile } from "react-icons/ai";
import { logout } from "../../redux/slices/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const isauth = useSelector((state) => state.auth?.isLoggedIn);
  console.log(isauth);
  const userId = useSelector((state) => state.auth?.user?._id);
  const fistname = useSelector((state) => state.auth?.user?.FirstName);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="navbar">
        <div className="navbarfirst">
          <img
            src={Logo}
            alt="Logo"
            className="main-logo"
            onClick={() => navigate("/")}
          />
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to="/#aboutus">About us</NavLink>
          <NavLink to={"/products"}>Products</NavLink>
          <NavLink to={"/contact"}>Contact us</NavLink>
        </div>
        <div className="navbarlast">
          <Popover
            icon={<CiGlobe size={25} className="globe" />}
            title1={"francais"}
            title2={"english"}
            rightslot={"🇫🇷"}
          />
          {!isauth ? (
            <button
              onClick={() => {
                navigate("/auth/signin");
              }}
            >
              Sign in/sign up
            </button>
          ) : (
            <div>
              <Popover
                icon={
                  <div className="userisconnected">
                    <FaUser size={20} color="white" />
                    <h1>{fistname}</h1>
                  </div>
                }
                title1={"Profile"}
                title2={"Sign out"}
                rightslot={<AiOutlineProfile size={20} />}
                rightslot2={<CiLogout size={18} />}
                userClicked={() => {
                  navigate(`/profile/${userId}`);
                }}
                userClicked2={() => {
                  dispatch(logout());
                }}
              ></Popover>
            </div>
          )}
        </div>
        <div className="navbarrespo">
          <CiMenuBurger
            className="burgermenu"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        </div>
        {menuOpen ? (
          <div className="openmenurespo">
            <NavLink>Home</NavLink>
            <NavLink>About us</NavLink>
            <NavLink>Products</NavLink>
            <NavLink>Contact us</NavLink>
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
}
