import { useState } from "react";
import "./AboutUs.css";
import { GoPlay } from "react-icons/go";
import ReactPlayer from "react-player";
import { LiaTimesCircleSolid } from "react-icons/lia";
import bgimg from "../../assets/sliderImages/tool1.jpg";
import { useTranslation } from "react-i18next";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import image from "../../assets/logo2.png";
import pic1 from "../../assets/pic1.webp";
import pic2 from "../../assets/pic2.webp";
import pic3 from "../../assets/pic3.webp";

const AboutUs = () => {
  const { t } = useTranslation();
  const [play, setPlay] = useState(false);

  return (
    <section className="aboutus" id="aboutus">
      <ScrollAnimation
        className="topScroll"
        animateOnce={true}
        duration={1}
        animateIn="fadeInRight"
        offset={270}
        delay={0.2}
      >
        <div className="aboutusfirst">
          <div className="aboutusimg">
            <img src={image} alt="loading" />
          </div>

          <div className="aboutustext">
            <h2>{t("aboutushomeh2")}</h2>
            <h1>{t("aboutushomeh1")}</h1>
            <p>{t("aboutushomep")}</p>
          </div>
        </div>
      </ScrollAnimation>

      {play && (
        <div className="react-player">
          <ReactPlayer
            controls={true}
            playing={true}
            height={"100%"}
            width={"100%"}
            url="https://maxshine.cn/wp-content/themes/maxshinecn/about-maxshine.mp4"
          />
          <LiaTimesCircleSolid
            onClick={() => setPlay(false)}
            className="liabuttonexit"
          />
        </div>
      )}

      <div className="aboutussecond">
        <div className="clip-path" onClick={() => setPlay(true)}>
          <LazyLoadImage src={bgimg} alt="" className="imgoverlay" />
          <div className="overlayimgabout"></div>
          <GoPlay className="goplay" size={100} color="white"></GoPlay>
          <h1>{t("play_video")}</h1>
        </div>

        <ScrollAnimation
          style={{ cursor: "auto" }}
          duration={1}
          className="box"
          animateOnce={true}
          animateIn="fadeInLeft"
        >
          <div className="aboutussecondbox">
            <h1>{t("aboutus_title")}</h1>
            <h2>{t("our_values")}</h2>
            <div className="aboutussecondboximg">
              <div className="overlayimg">
                <LazyLoadImage src={pic1} alt="icon" />
                <p>{t("economic")}</p>
              </div>
              <div className="overlayimg">
                <LazyLoadImage src={pic2} alt="icon" />
                <p>{t("quality")}</p>
              </div>
              <div className="overlayimg">
                <LazyLoadImage src={pic3} alt="icon" />
                <p>{t("efficient")}</p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default AboutUs;
