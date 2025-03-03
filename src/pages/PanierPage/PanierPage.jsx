import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getUserLevelInfos } from "../../services/usersServices";
import Swal from "sweetalert2";
import { createCommande } from "../../services/commandeservices";
import "./PanierPage.css";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { supprimerDuPanier, viderLePanier } from "../../redux/slices/cartSlice";
import { clearCart, getCart, removeCart } from "../../services/cartservices";
import emailjs from "@emailjs/browser";

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

export default function PanierPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const isAuth = useSelector((state) => state.auth?.isLoggedIn);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [level, setLevel] = useState();
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addresse, setAddresse] = useState("");
  const [backendCart, setBackendCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await getCart(user._id);
      setBackendCart(res.data.products);
    } catch (error) {
      console.error("Erreur lors de la récupération du panier", error);
    }
  };
  const videpanier = async () => {
    try {
      const data = {
        userId: user._id,
      };
      await clearCart(data);
    } catch (error) {
      console.error("Erreur ", error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const [quantities, setQuantities] = useState(() =>
    cart.reduce((acc, item) => {
      acc[item._id] = item.quantity || 1; // Initialisation par défaut
      return acc;
    }, {})
  );

  useEffect(() => {
    if (isAuth && user?._id) {
      getUserLevelInfos(user._id).then((res) => {
        setLevel(res.data?.level?.name);
      });
    }
  }, [isAuth, user]);

  const getDiscountedPrice = (price, level) => {
    switch (level) {
      case "bronze":
        return price * 0.99;
      case "silver":
        return price * 0.97;
      case "gold":
        return price * 0.95;
      case "diamond":
        return price * 0.92;
      default:
        return price;
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
    }
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handleRemove = async (id) => {
    if (isAuth) {
      try {
        await removeCart({ userId: user._id, productId: id });
        fetchCart();
      } catch (error) {
        console.error("Erreur lors de la suppression du panier", error);
      }
    } else {
      dispatch(supprimerDuPanier(id));
    }
  };

  const getTotalPrice = () => {
    const cartToUse = isAuth ? backendCart : cart;
    return cartToUse
      .reduce((total, item) => {
        const quantity = quantities[item._id] || 1;
        return total + getDiscountedPrice(item.price, level) * quantity;
      }, 0)
      .toFixed(2);
  };
  const sendEmailConfirmation = async () => {
    const totalCommandePrice = getTotalPrice();
    const cartToUse = isAuth ? backendCart : cart;
    const emailData = {
      user: isAuth ? `${user.FirstName} ${user.LastName}` : clientName,
      email: user?.email || email,
      phone_number: phoneNumber,
      total: `${totalCommandePrice} DA`,
      products_list: cartToUse
        .map(
          (item) =>
            `- ${item.titlefr || item.titleen} (x${quantities[item._id] || 1})`
        )
        .join("\n"),
    };

    try {
      await emailjs.send(
        "service_j9929fh",
        "template_4ebdnq8",
        emailData,
        "JwvjYGDMFmRwbSfVI"
      );
      console.log("Email envoyé !");
    } catch (error) {
      console.error("Erreur envoi EmailJS :", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart.length && !backendCart.length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Votre panier est vide",
      });
      return;
    }

    const totalCommandePrice = getTotalPrice();
    const cartToUse = isAuth ? backendCart : cart;

    const data = {
      user: user?._id,
      client: isAuth ? `${user.FirstName} ${user.LastName}` : clientName,
      phoneNumber:
        isAuth && user.phoneNumber ? `${user.phoneNumber}` : phoneNumber,
      totalPrice: totalCommandePrice,
      products: cartToUse.map((item) => ({
        product: item._id,
        quantity: quantities[item._id] || 1,
        totalPrice:
          getDiscountedPrice(item.price, level) * (quantities[item._id] || 1),
      })),
    };

    try {
      await createCommande(data);
      await sendEmailConfirmation();
      videpanier();
      dispatch(viderLePanier());
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Commande passée !",
      });
      navigate(isAuth ? `/profile/${user._id}/commandes` : "/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Erreur", text: error.message });
    }
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Panier</title>
      </Helmet>
      {!isAuth && (
        <div className="h1header2">
          <h1>{t("loginbefore")}</h1>
          <Link to="/auth/signin">S'inscrire</Link>
        </div>
      )}
      <div className="container-all">
        <div className="form-achat">
          {(isAuth ? backendCart : cart).length > 0 ? (
            (isAuth ? backendCart : cart).map((item) => (
              <div key={item._id} className="panier-container">
                <div className="cart-item">
                  <div className="info-item">
                    <img src={item?.images[0]} alt="cart-item" />
                    <h2>
                      {i18n.language === "fr" ? item.titlefr : item.titleen}
                    </h2>
                  </div>

                  <div className="price-change">
                    <div className="switch-nbr">
                      <button onClick={() => handleDecrement(item._id)}>
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantities[item._id] || 1}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value)
                          )
                        }
                        readOnly
                      />
                      <button onClick={() => handleIncrement(item._id)}>
                        +
                      </button>
                    </div>
                    <p>{item.price} DA</p>
                  </div>
                  <div className="total-remove">
                    <p>
                      {getDiscountedPrice(
                        item.price * (quantities[item._id] || 1),
                        level
                      ).toFixed(2)}{" "}
                      DA
                    </p>
                    <button onClick={() => handleRemove(item._id)}>
                      {t("remove")}
                      <MdOutlineRemoveShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
              }}
            >
              Votre panier est vide
            </h2>
          )}
        </div>
        {(isAuth ? backendCart : cart).length > 0 && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "40%",
            }}
          >
            <input
              type="text"
              style={inputStyle}
              placeholder="Full Name"
              value={isAuth ? `${user.FirstName} ${user.LastName}` : clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
            <input
              type="email"
              style={inputStyle}
              placeholder="Email"
              value={isAuth ? `${user.email}` : email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              type="tel"
              placeholder={t("phonenumber")}
              value={
                isAuth && user.phoneNumber
                  ? `${user.phoneNumber} `
                  : phoneNumber
              }
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            {/* <input
              type="text"
              style={inputStyle}
              placeholder="Adresse"
              onChange={(e) => setAddresse(e.target.value)}
              required
            /> */}
            <h2>
              {t("totalprice")} {getTotalPrice()} DA
            </h2>
            <button style={buttonStyle} type="submit">
              {t("submit")}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
