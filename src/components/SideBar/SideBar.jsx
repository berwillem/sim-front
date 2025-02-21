import { IoHome } from "react-icons/io5";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { BsBorderStyle } from "react-icons/bs";

import { BiSolidCategoryAlt } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { LuNewspaper } from "react-icons/lu";
import { IoMdStats } from "react-icons/io";
import Logo from "../../assets/logosim.png";
const SideBar = () => {
  const infos = [
    { icon: <IoHome />, text: "Home", link: "/admin/home" },
    { icon: <IoMdStats />, text: "Stat", link: "/admin/stat" },
    { icon: <FaUser />, text: "Users", link: "users" },
    { icon: <FaTools />, text: "Products", link: "products" },
    { icon: <BiSolidCategoryAlt />, text: "Parametres", link: "parametres" },
    { icon: <BsBorderStyle />, text: "Orders", link: "orders" },
    { icon: <LuNewspaper />, text: "Newsletter", link: "newsletter" },
    { icon: <FaRegListAlt />, text: "Devis", link: "devis" },
  ];
  const navigate = useNavigate();
  return (
    <>
      <div className="forsidebar"></div>
      <div className="sidebar">
        <img
          src={Logo}
          alt="Logo"
          className="admin-logo"
          onClick={() => navigate("/")}
        />
        <ul className="sidebar-items">
          {infos.map((info, index) => (
            <li key={index} className="sidebar-item">
              <NavLink to={info.link}>
                <div className="side-bar-content">
                  <span className="sidebar-icons">{info.icon}</span>{" "}
                  <span className="sidebar-texts">{info.text}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
