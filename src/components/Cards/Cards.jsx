import "./Cards.css";
import Maximg from "../../assets/max.webp";
import Milimg from "../../assets/mil.jpg";
import { useNavigate } from "react-router-dom";

export default function Cards() {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      title: "Maxshine",
      image: Maximg,
      navigate: "/maxshine",
    },
    {
      id: 2,
      title: "Milwaukee",
      image: Milimg,
      navigate: "/milwaukee",
    },
    {
      id: 3,
      title: "Maxshine",
      image: Maximg,
      navigate: "/maxshine",
    },
    {
      id: 4,
      title: "Milwaukee",
      image: Milimg,
      navigate: "/milwaukee",
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