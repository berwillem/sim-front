import { useState } from "react";
import "./AboutUs.css";
import { GoPlay } from "react-icons/go";
import ReactPlayer from "react-player";
import { LiaTimesCircleSolid } from "react-icons/lia";
import bgimg from "../../assets/sliderImages/tool1.jpg";
import { useTranslation } from "react-i18next";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css"
import { LazyLoadImage } from "react-lazy-load-image-component";
const AboutUs = () => {
  const { t } = useTranslation();
  const [play, setPlay] = useState(false);
  return (
    <section className="aboutus" id="aboutus">
       <ScrollAnimation animateOnce={true} duration={2}  animateIn='fadeInRight'
  >
      <div className="aboutusfirst">
     
        <div className="aboutusimg">
      
          <img
            src="https://maxshine.cn/wp-content/themes/maxshinecn/assets/img/about-1.jpg"
            alt="loading"
          />
          
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
          <h1>Play video</h1>
        </div>
        <ScrollAnimation duration={2.5} className="box" animateOnce={true}  animateIn='fadeInLeft' >
        <div className="aboutussecondbox">
          <h1>IN PURSUIT OF AUTOMOTIVE PERFECTION SINCE 2016</h1>
          <h2>POLISHERS AND OTHER AUTO DETAILING PRODUCTS</h2>
          <div className="aboutussecondboximg">
            <LazyLoadImage
              src="https://maxshine.cn/wp-content/themes/maxshinecn/assets/img/img-video-thumb-1.jpg"
              alt=""
            />
            <LazyLoadImage
              src="https://maxshine.cn/wp-content/themes/maxshinecn/assets/img/img-video-thumb-1.jpg"
              alt=""
            />
            <LazyLoadImage
              src="https://maxshine.cn/wp-content/themes/maxshinecn/assets/img/img-video-thumb-1.jpg"
              alt=""
            />
          </div>
        </div>
        </ScrollAnimation>
  
      </div>
    </section>
  );
};

export default AboutUs;
