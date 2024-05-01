import { Link } from "react-router-dom";
import "./Navbar.css";
import { CiGlobe } from "react-icons/ci";
import Logo from "../../assets/logo.png";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
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
              <option value="Fr">
                <img src="" alt="" />
              </option>
              <option value="En">
                <img src="" alt="" />
              </option>
            </select>
          ) : (
            ""
          )}
          <button>Sign in/sign up</button>
        </div>
      </nav>
    </>
  );
}
