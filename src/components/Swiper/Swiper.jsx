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

const swiperItems = [
  {
    id: 1,
    image: toolImage1,
    header2: "BRAND HOT PRODUCTS",
    header1: "MAXSHINE MINI CORDLESS POLISHER V2    ",
    description:
      "Gain the ability to polish tight areas, complex curves, minute details and anywhere a full-sized machine cannot. ",
    button: "Learn more",
  },
  {
    id: 2,
    image: toolImage2,
    header2: "BRAND HOT PRODUCTS",
    header1: "M1300 PRO ROTARY POLISHER",
    description:
      "Automotive detailers, marine enthusiasts and stone polishers rely on Maxshine polishers for high-quality detailing and polishing.",
    button: "Learn more",
  },
  {
    id: 3,
    image: toolImage3,
    header2: "BRAND HOT PRODUCTS",
    header1: "MAXSHINE TWINS MOTOR TOUCHLESS CAR DRYER",
    description: "Touchless drying prevents scratches and swirls",
    button: "Learn more",
  },
];
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
        {swiperItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="iamtesting">
              <img src={item.image} className="slider-image" />
              <div className="iamtestinginside">
                <h2>{item.header2}</h2>
                <h1>{item.header1}</h1>
                <p>{item.description}</p>
                <button>{item.button}</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
