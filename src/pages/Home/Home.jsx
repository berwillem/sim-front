import Swiper from "../../components/Swiper/Swiper";
import AboutUs from "../../components/AboutUs/AboutUs";
import Cards from "../../components/Cards/Cards";
import Newsletter from "../../components/Newsletter/Newsletter";
import ScrollAnimation from "react-animate-on-scroll";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
     <Helmet>
            <title>Home</title>
         
        </Helmet>
      <Swiper></Swiper>
      <AboutUs></AboutUs>
      <ScrollAnimation  animateOnce={true}    duration={2}   animateIn="fadeIn">
      <Cards title={"Maxshine"}></Cards>
      </ScrollAnimation>
    
      <Newsletter></Newsletter>
    </>
  );
}
