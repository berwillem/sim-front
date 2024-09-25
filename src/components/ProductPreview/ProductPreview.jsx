import "./ProductPreview.css";
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { LiaTimesCircleSolid } from "react-icons/lia";
import OrderModal from "../OrderModal/OrderModal";
import { useTranslation } from "react-i18next";

export default function App({ product, functio, language }) {
  const { t } = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = useState("null");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
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
          <h2>{product?.price} DA</h2>

          <button onClick={handleOpenModal}>{t("order")}</button>
        </div>
      </div>
      <OrderModal
        open={openModal}
        onClose={handleCloseModal}
        product={product}
      />
    </>
  );
}
