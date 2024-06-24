import "./Cards.css";
import Maximg from "../../assets/max.webp";
import Milimg from "../../assets/mil.jpg";
import Fixation from "../../assets/fixation.webp";
import { useNavigate } from "react-router-dom";

export default function Cards() {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      title: "Fixation",
      image: Fixation,
      navigate: "/664e87fc4cf5a42abd0b5e33",
    },
    {
      id: 2,
      title: "outillages",
      image: Milimg,
      navigate: "/664e88294cf5a42abd0b5e35",
    },
    {
      id: 3,
      title: "Detailling tools",
      image: Maximg,
      navigate: "/664e88294cf5a42abd0b5e35",
    },
  ];
  const all = products.map((product) => {
    return (
      <div className="cardsmain" key={product.id}>
        <div
          className="cardscard"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          <h1 onClick={() => navigate(`/products${product.navigate}`)}>
            {product.title}
          </h1>
        </div>
      </div>
    );
  });

  return <div className="allcardsmain">{all}</div>;
}
