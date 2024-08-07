// import Swiper from "swiper";
import "swiper/css";
import "./Swiper.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, EffectFlip } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import toolImage1 from "../../assets/sliderImages/tool1.jpg";
import toolImage2 from "../../assets/sliderImages/tool2.jpeg";
import toolImage3 from "../../assets/sliderImages/tool3.png";

const swiperItems = [
  {
    id: 1,
    image: toolImage1,
    header2: "BRAND HOT PRODUCTS",
    header1: "Outillage Professionnel de Qualité    ",
    description:
      "SYM Industrie vous offre des outils professionnels de marques prestigieuses comme Milwaukee, garantissant performance et durabilité pour toutes vos applications industrielles. ",
    button: "Learn more",
  },
  {
    id: 2,
    image: toolImage2,
    header2: "BRAND HOT PRODUCTS",
    header1: "Solutions de Fixation de Qualité Supérieure",
    description:
      "SYM Industrie vous offre des systèmes de fixation robustes et fiables pour toutes vos applications industrielles, garantissant performance et durabilité.",
    button: "Learn more",
  },
  {
    id: 3,
    image: toolImage3,
    header2: "BRAND HOT PRODUCTS",
    header1: "Excellence en Detailing Automobile",
    description: "SYM Industrie fournit des équipements de detailing de marques renommées, assurant une finition parfaite et un entretien supérieur pour vos véhicules.",
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
                <h2></h2>
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
