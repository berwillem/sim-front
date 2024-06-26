import { useState } from "react";
import "./PasswordReset.css";
import Swal from "sweetalert2";
import { PasswordReseting } from "../../services/authservices";
import { useNavigate } from "react-router-dom";
const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const id = urlParams.get("id");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Le mot de passe n'est pas identique !",
        text: "rentrez a nouveau le mot de pass!",
      });
      return;
    } else {
      PasswordReseting({ password, token, id })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Mot de passe modifier avec succes",
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
    }
  };
  return (
    <>
      <div className="password-reset">
        <div className="password-reset-header">
          <h1 className="password-reset-title">Reset Password</h1>
        </div>
        <form className="password-reset-form" onSubmit={handleSubmit}>
          <div className="password-reset-input-container">
            <label className="password-reset-label" htmlFor="password">
              New Password:
            </label>
            <input
              className="password-reset-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password-reset-input-container">
            <label className="password-reset-label" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="password-reset-input"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="password-reset-button" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default PasswordReset;
