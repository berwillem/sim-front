import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CiMenuBurger } from "react-icons/ci";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import Popover from "../Popover/Menu";
export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbarfirst">
          <img src={Logo} alt="Logo" className="main-logo" />
          <NavLink>Home</NavLink>
          <NavLink>About us</NavLink>
          <NavLink>Products</NavLink>
          <NavLink to={"/contact"}>Contact us</NavLink>
        </div>
        <div className="navbarlast">
          <Popover />

          <button
            onClick={() => {
              navigate("/auth/signin");
            }}
          >
            Sign in/sign up
          </button>
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
