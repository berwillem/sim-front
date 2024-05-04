import { useState } from "react";
import "./PasswordReset.css";
import Swal from "sweetalert2";
const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Le mot de passe n'est pas identique !",
        text: "rentrez a nouveau le mot de pass!",
      });
      return;
    }
    console.log("test");
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
