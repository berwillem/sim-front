import Modal from "@mui/material/Modal";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./DevisModal.css";
import emailjs from "@emailjs/browser";

import { createDevis } from "../../services/devisServices";

const style = {
  width: "36%",
  minWidth: "350px",
  height: "auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  outline: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  gap: "20px",
  color: "black",
  fontSize: "20px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};
const inputStyle2 = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
  height: "120px",
  resize: "none",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#db011c",
  color: "white",
  cursor: "pointer",
  marginTop: "10px",
  textAlign: "center",
};

const OrderModal = ({ open, onClose, product }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const isAuth = useSelector((state) => state.auth?.isLoggedIn);
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5c7xedp",
        "template_9c8fqej",
        form.current, // Passing the form reference
        "JwvjYGDMFmRwbSfVI"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },

        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      product: product.titlefr,
      phoneNumber,
      email: user?.email,
      name: isAuth ? `${user.FirstName} ${user.LastName}` : clientName,
      message,
    };
    createDevis(data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your message has been placed successfully",
        });
        if (isAuth) {
          navigate(`/profile/${user._id}/commandes`);
        } else {
          navigate(`/`);
        }
        onClose();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
  console.log(user);
  const title = i18n.language === "fr" ? product.titlefr : product.titleen;

  useEffect(() => {
    if (isAuth) {
      setClientName(`${user.FirstName} ${user.LastName}`);
      setPhoneNumber(user.phoneNumber);
    }
  }, [isAuth, user]);

  return (
    <Modal open={open} onClose={onClose}>
      <>
        {!isAuth && (
          <div className="h1header">
            <h1> {t("loginbefore")} </h1>
            <Link to="/auth/signin">{"S'inscrire"}</Link>
          </div>
        )}
        <div style={style}>
          <h1>{t("askdevis")} </h1>
          <form
            ref={form}
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="Full Name"
              style={inputStyle}
              value={isAuth ? `${user.FirstName} ${user.LastName}` : clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder={t("phonenumber")}
              style={inputStyle}
              defaultValue={isAuth ? user.phoneNumber : ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder={t("product")}
              style={inputStyle}
              value={title}
              readOnly
            />
            <textarea
              type="text"
              placeholder={t("Details")}
              style={inputStyle2}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" style={buttonStyle}>
              {t("submit")}
            </button>
          </form>
        </div>
      </>
    </Modal>
  );
};

export default OrderModal;
