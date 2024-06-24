import "./Cards.css";
import Maximg from "../../assets/max.webp";
import Milimg from "../../assets/mil.jpg";
import Fixation from "../../assets/fixation.webp";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
export default function Cards() {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      title: "Fixation",
      image: Fixation,
      navigate: "/664e87fc4cf5a42abd0b5e33",
      animateIn:"bounceInLeft"
    },
    {
      id: 2,
      title: "outillages",
      image: Milimg,
      navigate: "/664e88294cf5a42abd0b5e35",
      animateIn:"bounceIn"
    },
    {
      id: 3,
      title: "Detailling tools",
      image: Maximg,
      navigate: "/664e88294cf5a42abd0b5e35",
      animateIn:"bounceInRight"
    },
  ];
  const all = products.map((product) => {
    return (
      <ScrollAnimation initiallyVisible={true} animateOnce={true} className="productAnim"  key={product.id} duration={2}   animateIn={product.animateIn}>
 <div className="cardsmain" >
        <div
          className="cardscard"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          <h1 onClick={() => navigate(`/products${product.navigate}`)}>
            {product.title}
          </h1>
        </div>
      </div>
      </ScrollAnimation>
     
    );
  });

  return <div className="allcardsmain">{all}</div>;
}
