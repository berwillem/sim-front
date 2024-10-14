import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; // Import navigation styles
import "./LogoCaroussel.css"; // Custom styles for arrows
import logo1 from "../../assets/partners/demirizlogo.png";
import logo2 from "../../assets/partners/elringlogo.png";
import logo3 from "../../assets/partners/ESPIROFLEX.png";
import logo4 from "../../assets/partners/febilogo.jpg";
import logo5 from "../../assets/partners/maxshinelogo.jpg";
import logo7 from "../../assets/partners/MilwaukeeLogo.jpg";
import logo8 from "../../assets/partners/netexlogo.jpg";
import logo9 from "../../assets/partners/normholdinglogo.jpg";
import logo10 from "../../assets/partners/omegacivatalogo.jpg";
import logo11 from "../../assets/partners/saragrouplogo.jpg";
import logo12 from "../../assets/partners/refine.png";
import logo13 from "../../assets/partners/spitlogo.png";
import logo14 from "../../assets/partners/wufu.png";
import logo15 from "../../assets/partners/symfasteners.png";
import { useTranslation } from "react-i18next";
import Marquee from "react-fast-marquee";

const LogoCarousel = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "35px" }}>
        {t("dicoverpartners")}
      </h1>

      <Marquee
        style={{ height: "310px", overflow: "hidden", marginBottom: "50px" }}
        gradient={false}
        speed={120}
        className="marquee"
      >
        <img src={logo14} alt="Brand 7" />
        <img src={logo15} alt="Brand 7" />
        <img src={logo1} alt="Brand 1" />
        <img src={logo2} alt="Brand 2" />
        <img src={logo3} alt="Brand 3" />
        <img src={logo4} alt="Brand 4" />
        <img src={logo5} alt="Brand 5" />
        <img src={logo7} alt="Brand 7" />
        <img src={logo8} alt="Brand 8" />
        <img src={logo9} alt="Brand 9" />
        <img src={logo13} alt="Brand 7" />
        <img src={logo10} alt="Brand 10" />
        <img src={logo11} alt="Brand 11" />
        <img src={logo12} alt="Brand 7" />
      </Marquee>
    </>
  );
};

export default LogoCarousel;
