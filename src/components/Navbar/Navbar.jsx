import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CiGlobe, CiMenuBurger } from "react-icons/ci";
import Logo from "../../assets/logo.png";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbarfirst">
          <img src={Logo} alt="Logo" />
          <Link>Home</Link>
          <Link>About us</Link>
          <Link>Products</Link>
          <Link>Contact us</Link>
        </div>
        <div className="navbarlast">
          <CiGlobe
            size={25}
            className="globe"
            onClick={() => {
              setisOpen(!isOpen);
            }}
          />
          {isOpen ? (
            <select name="" id="">
              <option value="Fr">option1</option>
              <option value="En">option2</option>
            </select>
          ) : (
            ""
          )}
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
            <Link>Home</Link>
            <Link>About us</Link>
            <Link>Products</Link>
            <Link>Contact us</Link>
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
}
