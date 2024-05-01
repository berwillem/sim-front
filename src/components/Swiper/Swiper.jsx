// import Swiper from "swiper";
import "swiper/css";
import "./Swiper.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

// // init Swiper:
// const swiper = new Swiper(".swiper", {
//   modules: [Navigation, Pagination],
// });

export default function App() {
  return (
    <div className="forswiper">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://timelinecovers.pro/facebook-cover/download/morning-road-facebook-cover.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://timelinecovers.pro/facebook-cover/download/forest_in_the_morning-facebook-cover.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.pinimg.com/736x/e2/28/0b/e2280b4e7d0786c61098b2f128fbf192.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.profilerehab.com/facebook_covers/autumn/Fall_forest_trees_cover_25.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
