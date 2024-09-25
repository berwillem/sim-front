import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import logo1 from "../../assets/partners/logomaxshine.jpg";
import logo2 from "../../assets/partners/maydubellogo.png";
import logo3 from "../../assets/partners/netex-logo.png";
import logo4 from "../../assets/partners/elring.svg";

const LogoCarousel = () => {
  return (
    <>
      <h1>Discover Our Partners</h1>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        modules={[Autoplay]}
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
          <img src={logo4} alt="Brand 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={logo4} alt="Brand 4" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default LogoCarousel;
