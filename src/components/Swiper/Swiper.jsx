// import Swiper from "swiper";
import "swiper/css";
import "./Swiper.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, EffectFlip } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import toolImage1 from "../../assets/sliderImages/tool1.jpg";
import toolImage2 from "../../assets/sliderImages/tool2.jpg";
import toolImage3 from "../../assets/sliderImages/tool3.jpg";

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
          <div className="iamtesting">
            <img src={toolImage1} className="slider-image" />
            <div className="iamtestinginside">
              <h2>BRAND HOT PRODUCTS</h2>
              <h1>SNOW MASTER FOAM GUN V2</h1>
              <p>
                No pressure washer needed! Easily attach to standard garden hose
                or quick connect
              </p>
              <button>Learn more</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iamtesting">
            <img src={toolImage2} className="slider-image" />
            <div className="iamtestinginside">
              <h2>BRAND HOT PRODUCTS</h2>
              <h1>SNOW MASTER FOAM GUN V2</h1>
              <p>
                No pressure washer needed! Easily attach to standard garden hose
                or quick connect
              </p>
              <button>Learn more</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iamtesting">
            <img src={toolImage3} className="slider-image" />
            <div className="iamtestinginside">
              <h2>BRAND HOT PRODUCTS</h2>
              <h1>SNOW MASTER FOAM GUN V2</h1>
              <p>
                No pressure washer needed! Easily attach to standard garden hose
                or quick connect
              </p>
              <button>Learn more</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
