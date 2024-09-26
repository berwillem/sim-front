import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; // Import navigation styles
import "./LogoCaroussel.css"; // Custom styles for arrows
import logo1 from "../../assets/partners/demirizlogo.png";
import logo2 from "../../assets/partners/elringlogo.png";
import logo3 from "../../assets/partners/ESPIROFLEX.png";
import logo4 from "../../assets/partners/febilogo.jpg";
import logo5 from "../../assets/partners/maxshinelogo.png";
import logo6 from "../../assets/partners/maydubellogo.png";
import logo7 from "../../assets/partners/MilwaukeeLogo.webp";
import logo8 from "../../assets/partners/netexlogo.jpg";
import logo9 from "../../assets/partners/normholdinglogo.webp";
import logo10 from "../../assets/partners/omegacivatalogo.jpg";
import logo11 from "../../assets/partners/saragrouplogo.jpg";
import logo12 from "../../assets/partners/spitlogo.jpg";
import logo13 from "../../assets/partners/starklips.png";
import { useTranslation } from "react-i18next";

const LogoCarousel = () => {
  const { t } = useTranslation();

  return (
    <div style={{ overflow: "visible" }}>
      <h1 style={{ textAlign: "center", margin: "50px" }}>
        {t("dicoverpartners")}
      </h1>
      <Swiper
        spaceBetween={30}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        modules={[Autoplay, Navigation]}
        className="myswiperpartner"
        style={{ marginBottom: "100px", width: "80%", position: "relative" }}
        breakpoints={{
          320: { slidesPerView: 1 }, // Mobile view
          640: { slidesPerView: 2 }, // Small tablets
          768: { slidesPerView: 3 }, // Tablets
          1024: { slidesPerView: 4 }, // Desktops
        }}
      >
        <SwiperSlide>
          <img src={logo1} alt="Brand 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo2} alt="Brand 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo3} alt="Brand 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo4} alt="Brand 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo5} alt="Brand 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo6} alt="Brand 6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo7} alt="Brand 7" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo8} alt="Brand 8" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo9} alt="Brand 9" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo10} alt="Brand 10" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo11} alt="Brand 11" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo12} alt="Brand 12" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo13} alt="Brand 13" />
        </SwiperSlide>

        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
};

export default LogoCarousel;
