import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { getFamilleById } from "../../services/parametresServices";
import "./CategoriesList.css";
import { PiKeyReturnLight } from "react-icons/pi";
import { Helmet } from "react-helmet";
import Fixation from "../../assets/fasteners-banner.webp";
import Outillage from "../../assets/outillagelastv.jpg";
import Detailling from "../../assets/detaillingbanner.jpeg";
import { useTranslation } from "react-i18next";
// import Detailling from "../../assets/sliderImages/tool2.jpeg";

const CategoriesList = () => {
  const { famillId } = useParams();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [famille, setFamille] = useState([]);
  useEffect(() => {
    getFamilleById(famillId)
      .then((res) => {
        setFamille(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [famillId]);
  const title = i18n.language === "en" ? famille.titleen : famille.titlefr;
  return (
    <>
      <Helmet>
        <title>Product Categorie</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="familleheaderbig">
        <div
          className="famille-header"
          style={{
            backgroundImage: `url(${
              (famille.titlefr === "Fixation" && Fixation) ||
              (famille.titlefr === "Outillage" && Outillage) ||
              (famille._id === "664e88614cf5a42abd0b5e37" && Detailling)
            }) `,
          }}
        >
          <div className="gobackproduct">
            <Link to="/products">
              <PiKeyReturnLight size={30} />
              {t("productsNav")}
            </Link>
          </div>
          <div className="familycont">
            <h1>{title}</h1>
          </div>
        </div>
      </div>

      <div className="gridfamille">
        {famille?.categories?.map((category) => {
          const title =
            i18n.language === "en" ? category.titleen : category.titlefr;
          return (
            <>
              <div key={category._id} className="productitempreview">
                <img src={category.image} alt="item preview" />
                <div>
                  <h1>{title}</h1>
                  <Link to={`/products/categorie/${category._id}`}>
                    {t("see more")}
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoriesList;
