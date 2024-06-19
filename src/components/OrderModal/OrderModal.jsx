import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createCommande } from "../../services/commandeservices";
import Swal from "sweetalert2";

const style = {
  width: "500px",
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
  const totalPrice = product?.price * quantity;

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
          navigate(`/profile/${user._id}/oders`);
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
          <div>
            <h1>
              Login before making an order and benefit from a discount on our
              products
            </h1>
            <Link to="/auth/signin">
              <button>Sign in</button>
            </Link>
          </div>
        )}
        <div style={style}>
          <h1>Make An Order</h1>
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
              placeholder="Phone Number"
              style={inputStyle}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder={t("product")}
              style={inputStyle}
              value={product.title}
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
            <h2>Total Price: {totalPrice} DA</h2>
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
