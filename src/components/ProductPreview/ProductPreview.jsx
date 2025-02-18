import "./ProductPreview.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { LiaTimesCircleSolid } from "react-icons/lia";
import DevisModal from "../DevisModal/DevisModal";
import { useTranslation } from "react-i18next";
import {
  ajouterAuPanier,
  supprimerDuPanier,
} from "../../redux/slices/cartSlice";
import { addCart, getCart, removeCart } from "../../services/cartservices";

export default function ProductPreview({ product, functio, language }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth?.user);
  const isAuth = useSelector((state) => state.auth?.isLoggedIn);

  const [backendCart, setBackendCart] = useState([]);

  useEffect(() => {
    if (isAuth) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await getCart(user._id);
      setBackendCart(res.data.products);
    } catch (error) {
      console.error("Erreur lors de la récupération du panier", error);
    }
  };

 
  const isInCart = isAuth
    ? backendCart.some((item) => item._id === product._id)
    : cartItems.some((item) => item._id === product._id);

  const handleAddToCart = async () => {
    if (isAuth) {
      try {
        await addCart({ userId: user._id, productId: product._id });
        fetchCart();
      } catch (error) {
        console.error("Erreur lors de l'ajout au panier", error);
      }
    } else {
      dispatch(ajouterAuPanier(product));
    }
  };

  const handleRemoveFromCart = async () => {
    if (isAuth) {
      try {
        await removeCart({ userId: user._id, productId: product._id });
        fetchCart();
      } catch (error) {
        console.error("Erreur lors de la suppression du panier", error);
      }
    } else {
      dispatch(supprimerDuPanier(product._id));
    }
  };

  const [openDevisModal, setOpenDevisModal] = useState(false);
  const handleOpenDevisModal = () => setOpenDevisModal(true);
  const handleCloseDevisModal = () => setOpenDevisModal(false);

  const typeTitle =
    language === "fr" ? product.type?.titlefr : product?.type?.titleen;

  return (
    <>
      <div className="menuopenforfinal">
        <div className="menuopen-final">
          <LiaTimesCircleSolid className="liabuttonexit2" onClick={functio} />
          <div className="forswiperwrapper">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: null }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper22"
            >
              {product?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`product-${index}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <h1>{language === "fr" ? product?.titlefr : product?.titleen}</h1>
          <h4>Gamme : {product?.gamme}</h4>
          <h4>Marque : {product?.marque}</h4>
          <h4>Type : {typeTitle}</h4>
          <p className="textpreview">Description : {product?.description}</p>
          {product?.price ? <h2>{product?.price} DA</h2> : <h2>Sur devis</h2>}
          {product?.price ? (
            <>
              {isInCart ? (
                <button onClick={handleRemoveFromCart}>
                  {t("remove_cart")}
                </button>
              ) : (
                <button onClick={handleAddToCart}>{t("addcart")}</button>
              )}
            </>
          ) : (
            <button onClick={handleOpenDevisModal}>{t("demande-devis")}</button>
          )}
        </div>
      </div>
      <DevisModal
        open={openDevisModal}
        onClose={handleCloseDevisModal}
        product={product}
      />
    </>
  );
}
