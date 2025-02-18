import "./ProductPreview.css";
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useDispatch, useSelector } from "react-redux";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { LiaTimesCircleSolid } from "react-icons/lia";
import OrderModal from "../OrderModal/OrderModal";
import { useTranslation } from "react-i18next";
import { ajouterAuPanier } from "../../redux/slices/cartSlice";

export default function App({ product, functio, language }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [thumbsSwiper, setThumbsSwiper] = useState("null");
  const cart = useSelector((state) => state.cart);
  console.log("====================================");
  console.log(cart);
  console.log("====================================");

  const handleAddToCart = () => {
    if (product) {
      dispatch(ajouterAuPanier(product));
    }
  };

  const [openDevisModal, setOpenDevisModal] = useState(false);
  const handleOpenDevisModal = () => {
    setOpenDevisModal(true);
  };
  const handleCloseDevisModal = () => {
    setOpenDevisModal(false);
  };

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
              thumbs={{ swiper: thumbsSwiper ? thumbsSwiper : "null" }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper22"
            >
              {product?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <h1> {language === "fr" ? product?.titlefr : product?.titleen} </h1>
          <h4>Gamme : {product?.gamme}</h4>
          <h4>Marque : {product?.marque}</h4>
          <h4>Type : {typeTitle}</h4>
          <p className="textpreview">Description : {product?.description}</p>
          {product?.price ? <h2>{product?.price} DA</h2> : <h2>Sur devis</h2>}
          {product?.price ? (
            <button onClick={handleAddToCart}>{t("order")}</button>
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
