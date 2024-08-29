import "./MainAuth.css";
import Logo from "../../../assets/logo1.png";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function MainAuth() {
  const { t } = useTranslation();
  return (
    <div className="containerSignin">
      <div className="sign-in">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <h1>{t("welcome")}</h1>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
