import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./ProductsList.css";
import { PiKeyReturnLight } from "react-icons/pi";
import { getProductsByCategory } from "../../services/productsServices";
import { Link, useParams } from "react-router-dom";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import i18n from "../../i18n/i18n";
import { getAllTypes } from "../../services/parametresServices";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Helmet } from "react-helmet";
import Fixation from "../../assets/fasteners-banner.webp";
import Outillage from "../../assets/outillagelastv.jpg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import Detailling from "../../assets/detailing.webp";

const ProductsList = () => {
  const currentLanguage = i18n.language;
  const { t } = useTranslation();

  const { CategoryId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState();
  const [data, setData] = useState();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

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

  //types
  const fetchTypes = () => {
    getAllTypes()
      .then((res) => {
        setTypes(res.data.types);
      })
      .catch((error) => {
        console.error("Error fetching type:", error);
      });
  };

  useEffect(() => {
    fetchTypes();
  }, []);
  //filter
  useEffect(() => {
    if (!filter || filter === "all") {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter((product) => product?.type?._id === filter)
      );
    }
  }, [filter, products, filterProducts]);

  return (
    <>
      <Navbar></Navbar>
      <Helmet>
        <title>Product list</title>
      </Helmet>
      <div
        className="famille-header-final"
        style={{
          backgroundImage: `url(${
            (products[0]?.famille._id === "664e87fc4cf5a42abd0b5e33" &&
              Fixation) ||
            (products[0]?.famille._id === "664e88294cf5a42abd0b5e35" &&
              Outillage) ||
            (products[0]?.famille._id === "664e88614cf5a42abd0b5e37" &&
              "https://maxshine.cn/wp-content/themes/maxshinecn/assets/img/about-1.jpg")
          }) `,
        }}
      >
        <div className="gobackproduct-final">
          <Link to="/products">
            <PiKeyReturnLight size={30} />
            {t("productsNav")}
          </Link>
        </div>
        <div className="familycont-final">
          <h1>
            {products.length < 1
              ? t("aucunproduitdisponible")
              : t("produitdisponibles")}
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
      <div className="filter2">
        <FormControl
          variant="outlined"
          style={{ minWidth: 120 }}
          className="filterParent"
        >
          <InputLabel>Type</InputLabel>
          <Select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            label="Type"
          >
            <MenuItem value="all">All</MenuItem>
            {types?.map((type, index) => {
              return (
                <MenuItem key={index} value={type._id}>
                  {type.titlefr}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
          {filterProducts?.map((item) => {
            return (
              <>
                <div key={item._id} className="productitempreview-final">
                  <img src={item.images[0]} alt="Product-img" />
                  <h1>
                    {currentLanguage === "fr" ? item.titlefr : item.titleen}
                  </h1>

                  {user && item.price ? (
                    <h2>
                      {user.type === "client"
                        ? item.price
                        : user.type === "revendeur"
                        ? item.priceRevendeur
                        : user.type === "grossiste"
                        ? item.priceGrossiste
                        : user.type === "entreprise"
                        ? item.priceRevendeur
                        : item.price}{" "}
                      DA
                    </h2>
                  ) : (
                    <h2>Sur devis</h2>
                  )}
                  {!user && !item.price && <h2>Sur devis</h2>}

                  <h3
                    onClick={() => {
                      handleClick();
                      setData(item);
                    }}
                  >
                    {t("plus d'infos")}
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
