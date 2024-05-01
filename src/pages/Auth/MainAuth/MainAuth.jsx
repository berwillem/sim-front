import "./MainAuth.css";
import Logo from "../../../assets/logo.png";
import { Outlet } from "react-router-dom";
export default function SignIn() {
  return (
    <div className="containerSignin">
      <div className="sign-in">
        <img src={Logo} alt="Logo" />
        <h1>Bienvenue</h1>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
