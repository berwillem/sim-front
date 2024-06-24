import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./ProductsList.css";
import { PiKeyReturnLight } from "react-icons/pi";
import { getProductsByCategory } from "../../services/productsServices";
import { Link, useParams } from "react-router-dom";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import i18n from "../../i18n/i18n";

const ProductsList = () => {
  const currentLanguage = i18n.language;

  const { CategoryId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    getProductsByCategory(CategoryId)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [CategoryId]);
  const handleClick = () => {
    setIsMenuOpen(true);
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="famille-header-final">
        <div className="gobackproduct-final">
          <Link to="/products">
            <PiKeyReturnLight size={30} />
            Products
          </Link>
        </div>
        <div className="familycont-final">
          <h1>
            {products.length < 1
              ? "aucun produit disponible"
              : "Produits disponibles"}
          </h1>
          <h2
            style={{
              color: "#5D6164",
              fontSize: "16px",
              width: "40%",

              fontWeight: "100",
            }}
          ></h2>
        </div>
      </div>
      <div className="productslist-final">
        {isMenuOpen && (
          <ProductPreview
            product={data}
            language={currentLanguage}
            functio={() => setIsMenuOpen(false)}
          />
        )}
        <div className="gridfamille-final">
          {products?.map((item) => {
            return (
              <>
                <div key={item._id} className="productitempreview-final">
                  <img src={item.images[0]} alt="item preview-final" />
                  <h1>
                    {currentLanguage === "fr" ? item.titlefr : item.titleen}
                  </h1>
                  <h2>{item.price} DA</h2>
                  <h3
                    onClick={() => {
                      handleClick();
                      setData(item);
                    }}
                  >
                    {"Plus d'info"}
                  </h3>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
