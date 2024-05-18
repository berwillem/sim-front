import { useState } from "react";
import "./AboutUs.css";
import { GoPlay } from "react-icons/go";
import ReactPlayer from "react-player";
import { LiaTimesCircleSolid } from "react-icons/lia";
import bgimg from "../../assets/sliderImages/tool1.jpg";

const AboutUs = () => {
  const [play, setPlay] = useState(false);
  return (
    <section className="aboutus" id="aboutus">
      <div className="aboutusfirst">
        <div className="aboutusimg">
          <img
            src="https://maxshine.cn/wp-content/themes/maxshinecn/assets/img/about-1.jpg"
            alt="loading"
          />
        </div>
        <div className="aboutustext">
          <h2>About us</h2>
          <h1>A propos de SYM INDUSTRIE</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            autem! Doloremque modi quos ea architecto enim maxime laboriosam
            quasi! Saepe, nesciunt nostrum delectus eveniet cum minus, minima
            sed dolores consequuntur et labore assumenda nobis, voluptate
            necessitatibus suscipit non vero sapiente error earum mollitia.
            Placeat quasi vel doloremque ut cum quaerat, eum similique odio
            temporibus natus reprehenderit itaque quae dolor debitis libero
            neque ducimus consectetur? Aliquid ut fugiat laudantium, molestias
            eaque quasi illo harum magni amet autem nostrum deserunt
            repellendus, libero quidem sunt quae nisi laborum quam esse ab
            accusamus. Impedit ipsum rem quod, facilis sit modi non magni ab ea.
          </p>
        </div>
      </div>
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
          <img src={bgimg} alt="" className="imgoverlay" />
          <div className="overlayimgabout"></div>
          <GoPlay className="goplay" size={100} color="white"></GoPlay>
          <h1>Play video</h1>
        </div>

        <div className="aboutussecondbox">
          <h1>IN PURSUIT OF AUTOMOTIVE PERFECTION SINCE 2006</h1>
          <h2>POLISHERS AND OTHER AUTO DETAILING PRODUCTS</h2>
          <div className="aboutussecondboximg">
            <img
              src="https://maxshine.cn/wp-content/themes/maxshinecn/assets/img/img-video-thumb-1.jpg"
              alt=""
            />
            <img
              src="https://maxshine.cn/wp-content/themes/maxshinecn/assets/img/img-video-thumb-1.jpg"
              alt=""
            />
            <img
              src="https://maxshine.cn/wp-content/themes/maxshinecn/assets/img/img-video-thumb-1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
