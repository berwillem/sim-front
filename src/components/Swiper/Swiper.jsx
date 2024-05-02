// import Swiper from "swiper";
import "swiper/css";
import "./Swiper.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, EffectFlip } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import toolImage1 from "../../assets/sliderImages/tool1.jpg";
import toolImage2 from "../../assets/sliderImages/tool2.webp";

export default function App() {
  return (
    <div className="forswiper">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        effect={"Flip"}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[EffectFlip, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={toolImage1} className="slider-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={toolImage2} className="slider-image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
