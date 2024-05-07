import "./PasswordForgot.css";
import passForgotImage from "../../assets/svg/passforgot.svg";
import { useNavigate } from "react-router-dom";
const PasswordFortgot = () => {
  const navigate = useNavigate();
  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log("test");
  };
  return (
    <>
      <div className="pass-forgot-container">
        <div className="pass-forgot-image-container">
          <img src={passForgotImage} alt="Image" />
        </div>
        <div className="pass-forgot-form-container">
          <h2>Mot de passe oublié </h2>
          <form onSubmit={handleResetPassword}>
            <label htmlFor="user_login">Saisissez votre email :</label>
            <input type="email" id="user_login" name="user_login" required />
            <button type="submit" onClick={() => navigate("/passwordreset")}>
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
