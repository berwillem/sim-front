import Swiper from "../../components/Swiper/Swiper";
import AboutUs from "../../components/AboutUs/AboutUs";
import Cards from "../../components/Cards/Cards";
import Newsletter from "../../components/Newsletter/Newsletter";
import ScrollAnimation from "react-animate-on-scroll";

export default function Home() {
  return (
    <>
      <Swiper></Swiper>
      <AboutUs></AboutUs>
      <ScrollAnimation  animateOnce={true}    duration={2}   animateIn="fadeIn">
      <Cards title={"Maxshine"}></Cards>
      </ScrollAnimation>
    
      <Newsletter></Newsletter>
    </>
  );
}
