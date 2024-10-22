import "./PasswordForgot.css";
import passForgotImage from "../../assets/svg/passforgot.svg";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PasswordForgot } from "../../services/authservices";
import Swal from "sweetalert2";
import { useState } from "react";
const PasswordFortgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleResetPassword = (e) => {
    e.preventDefault();
    PasswordForgot(email)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "An email has been sent to your email address Please check Your spams too.",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };
  return (
    <>
      <Helmet>
        <title>Password forgot </title>
      </Helmet>
      <div className="pass-forgot-container">
        <div className="pass-forgot-image-container">
          <img src={passForgotImage} alt="Image" />
        </div>
        <div className="pass-forgot-form-container">
          <h2>Mot de passe oublié </h2>
          <form onSubmit={handleResetPassword}>
            <label htmlFor="user_login">Saisissez votre email :</label>
            <input
              type="email"
              id="user_login"
              name="user_login"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" onClick={() => handleResetPassword}>
              {" "}
              Réinitialiser le mot de passe.
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordFortgot;
