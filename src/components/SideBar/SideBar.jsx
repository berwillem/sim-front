import React from "react";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import Logo from "../../assets/logo.png";

const SideBar = () => {
  const infos = [
    { icon: <IoHome />, text: "Home", link: "/admin/home" },
    { icon: <FaUser />, text: "Users", link: "users" },
    { icon: <FaTools />, text: "Products", link: "products" },
    { icon: <BiSolidCategoryAlt />, text: "Categories", link: "categories" },
  ];

  return (
    <div className="sidebar">
      <img src={Logo} alt="Logo" className="admin-logo" />
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
  );
};

export default SideBar;
