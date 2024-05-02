import "./MainAuth.css";
import Logo from "../../../assets/logo.png";
import { Link, Outlet } from "react-router-dom";
export default function MainAuth() {
  return (
    <div className="containerSignin">
      <div className="sign-in">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <h1>Bienvenue</h1>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
