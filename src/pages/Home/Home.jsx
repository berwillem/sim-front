import Swiper from "../../components/Swiper/Swiper";
import AboutUs from "../../components/AboutUs/AboutUs";
import Cards from "../../components/Cards/Cards";
import Newsletter from "../../components/Newsletter/Newsletter";
import ScrollAnimation from "react-animate-on-scroll";
import { Helmet } from "react-helmet";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import logo from "../../assets/whatsapp.png"

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Swiper></Swiper>
      <AboutUs></AboutUs>
      <ScrollAnimation animateOnce={true} duration={1} animateIn="fadeIn">
        <Cards title={"Maxshine"}></Cards>
      </ScrollAnimation>
      <FloatingWhatsApp
        phoneNumber="+213 552 74 14 09"
        accountName="SYM"
        allowEsc
        allowClickAway
        notification
        notificationSound
        avatar={logo}
        chatMessage={<><p>Bonjour👋</p><p>comment pouvons nous vous aider? </p></>}
      />

      <Newsletter></Newsletter>
    </>
  );
}
