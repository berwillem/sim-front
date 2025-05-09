import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CiGlobe, CiLogout, CiMenuBurger } from "react-icons/ci";
import Logosim from "../../assets/logosim.png";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import Popover from "../Popover/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineProfile } from "react-icons/ai";
import { logout } from "../../redux/slices/authSlice";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { getCart } from "../../services/cartservices";

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isauth = useSelector((state) => state.auth?.isLoggedIn);
  const userId = useSelector((state) => state.auth?.user?._id);
  const fistname = useSelector((state) => state.auth?.user?.FirstName);
  const [menuOpen, setMenuOpen] = useState(false);
  const [backendCart, setBackendCart] = useState([]);
  const dispatch = useDispatch();

  const isAdmin = useSelector((state) => state.auth?.user?.role);
  const cart = useSelector((state) => state.cart.items);

  const fetchCart = async () => {
    try {
      const res = await getCart(userId);
      setBackendCart(res.data.products);
    } catch (error) {
      console.error("Erreur lors de la récupération du panier", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <>
      <nav className="navbar">
        <div className="navbarfirst">
          <Link to={"/"}>
            <img
              src={Logosim}
              alt="Logo"
              className="main-logo"
              onClick={() => navigate("/")}
            />
          </Link>

          <NavLink to={"/"}>{t("homeNav")}</NavLink>
          <NavLink to={"/about"}>{t("about-usNav")}</NavLink>
          <NavLink to={"/products"}>{t("productsNav")}</NavLink>
          <NavLink to={"/contact"}>{t("contact-usNav")}</NavLink>
          {isAdmin === "admin" && <NavLink to={"/admin"}>Dashboard</NavLink>}
        </div>
        <div className="navbarlast">
          <Popover
            icon={<CiGlobe size={25} className="globe" />}
            title1={"francais"}
            title2={"english"}
            rightslot={"🇫🇷"}
            rightslot2={"🇺🇸"}
            userClicked={() => changeLanguage("fr")}
            userClicked2={() => changeLanguage("en")}
          />
          <Link to={"/panier"}>
            {" "}
            <div className="panier-icon">
              <FiShoppingCart />
              {isauth
                ? backendCart.length != 0 && (
                    <span className="panier-nbr">{backendCart.length}</span>
                  )
                : cart.length != 0 && (
                    <span className="panier-nbr">{cart.length}</span>
                  )}
            </div>
          </Link>
          {!isauth ? (
            <button
              onClick={() => {
                navigate("/auth/signin");
              }}
            >
              {t("btnNav")}
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
                title2={t("signout")}
                rightslot={<AiOutlineProfile size={20} />}
                rightslot2={<CiLogout size={18} />}
                userClicked={() => {
                  navigate(`/profile/${userId}`);
                }}
                userClicked2={() => {
                  navigate("/");
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
            <NavLink to={"/"} onClick={() => setMenuOpen(false)}>
              {t("homeNav")}
            </NavLink>
            <NavLink to={"/about"}>{t("about-usNav")}</NavLink>
            <NavLink to={"/products"} onClick={() => setMenuOpen(false)}>
              {t("productsNav")}
            </NavLink>
            <NavLink to={"/contact"} onClick={() => setMenuOpen(false)}>
              {t("contact-usNav")}
            </NavLink>
            <a
              href="https://maps.app.goo.gl/qMZ3dPB5rzpWC9Kk6"
              target="_blank"
              onClick={() => setMenuOpen(false)}
            >
              Localisation
            </a>
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
}
