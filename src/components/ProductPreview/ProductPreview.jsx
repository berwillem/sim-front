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

export default function App({ product, functio }) {
  const [thumbsSwiper, setThumbsSwiper] = useState("null");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
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
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper22"
          >
            {product?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper11"
          >
            {product?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <h1> {product?.title} </h1>
        <p className="textpreview">{product?.description}</p>
        <h2>{product?.price}</h2>
        <button onClick={handleOpenModal}>Acheter</button>
      </div>
      <OrderModal
        open={openModal}
        onClose={handleCloseModal}
        product={product}
      />
    </>
  );
}
