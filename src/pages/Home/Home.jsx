import Swiper from "../../components/Swiper/Swiper";
import AboutUs from "../../components/AboutUs/AboutUs";
import Cards from "../../components/Cards/Cards";
import Newsletter from "../../components/Newsletter/Newsletter";

export default function Home() {
  return (
    <>
      <Swiper></Swiper>
      <AboutUs></AboutUs>
      <Cards title={"Maxshine"}></Cards>
      <Newsletter></Newsletter>
    </>
  );
}
