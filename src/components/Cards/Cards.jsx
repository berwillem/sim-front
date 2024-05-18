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
      navigate: "/Fixation",
    },
    {
      id: 2,
      title: "outillages",
      image: Milimg,
      navigate: "/outillages",
    },
    {
      id: 3,
      title: "Detailling tools",
      image: Maximg,
      navigate: "/detailling-tools",
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
