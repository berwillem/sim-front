import "./Cards.css";
import Maximg from "../../assets/max.webp";
import Milimg from "../../assets/mil.jpg";
import Fixation from "../../assets/fixation.webp";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import { useTranslation } from "react-i18next"; // Importer le hook

export default function Cards() {
  const { i18n } = useTranslation(); // Utiliser useTranslation pour obtenir l'instance i18n
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      titlefr: "Fixation",
      titleen: "Fasteners",
      image: Fixation,
      navigate: "/664e87fc4cf5a42abd0b5e33",
      animateIn: "fadeInLeft",
    },
    {
      id: 2,
      titlefr: "Outillages",
      titleen: "Tools",
      image: Milimg,
      navigate: "/664e88294cf5a42abd0b5e35",
      animateIn: "fadeIn",
    },
    {
      id: 3,
      titlefr: "Outils de détail",
      titleen: "Detailing tools",
      image: Maximg,
      navigate: "/664e88614cf5a42abd0b5e37",
      animateIn: "fadeInRight",
    },
  ];

  // Mapping des produits avec le titre en fonction de la langue courante
  const all = products.map((product) => {
    const title = i18n.language === "fr" ? product.titlefr : product.titleen;

    return (
      <ScrollAnimation
        initiallyVisible={true}
        animateOnce={true}
        className="productAnim"
        key={product.id}
        duration={1}
        animateIn={product.animateIn}
      >
        <div className="cardsmain">
          <div
            className="cardscard"
            style={{ backgroundImage: `url(${product.image})` }}
          >
            <h1 onClick={() => navigate(`/products${product.navigate}`)}>
              {title}
            </h1>
          </div>
        </div>
      </ScrollAnimation>
    );
  });

  return <div className="allcardsmain">{all}</div>;
}
