import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createCommande } from "../../services/commandeservices";
import Swal from "sweetalert2";
import "./OrderModal.css";
import { getUserLevelInfos } from "../../services/usersServices";

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
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const isAuth = useSelector((state) => state.auth?.isLoggedIn);
  const [quantity, setQuantity] = useState(1);
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [level, setLevel] = useState();

  useEffect(() => {
    if (isAuth) {
      getUserLevelInfos(user?._id).then((res) =>
        setLevel(res.data?.level?.name)
      );
    }
  }, [isAuth, user]);

  const getDiscountedPrice = (price, level) => {
    switch (level) {
      case "bronze":
        return price * 0.99;
      case "silver":
        return price * 0.98;
      case "gold":
        return price * 0.95;
      case "diamond":
        return price * 0.92;
      default:
        return price;
    }
  };

  const originalPrice = product?.price * quantity || 0;
  const totalPrice = getDiscountedPrice(originalPrice, level) || 0;
  const discountAmount = originalPrice - totalPrice;
  console.log(quantity);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      user: user?._id,
      product: product._id,
      quantity,
      totalPrice,
      phoneNumber,
      client: isAuth ? `${user.FirstName} ${user.LastName}` : clientName,
    };
    createCommande(data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your order has been placed successfully",
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
          <h1>{t("makeorder")} </h1>
          <form
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder={t("product")}
              style={inputStyle}
              value={product.titlefr}
              readOnly
            />
            <input
              type="number"
              placeholder={t("quantity")}
              style={inputStyle}
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <h2>
              {t("totalprice")}
              {discountAmount > 0 ? (
                <>
                  <span
                    style={{ textDecoration: "line-through", color: "red" }}
                  >
                    {isNaN(originalPrice) ? "0.00" : originalPrice.toFixed(2)}{" "}
                    DA
                  </span>{" "}
                  <span>
                    {isNaN(totalPrice) ? "0.00" : totalPrice.toFixed(2)} DA
                  </span>
                </>
              ) : (
                <span>
                  {isNaN(totalPrice) ? "0.00" : totalPrice.toFixed(2)} DA
                </span>
              )}
            </h2>
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
