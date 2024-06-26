import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { getFamilleById } from "../../services/parametresServices";
import "./CategoriesList.css";
import { PiKeyReturnLight } from "react-icons/pi";
import { Helmet } from "react-helmet";

const CategoriesList = () => {
  const { famillId } = useParams();
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

  return (
    <>
      <Helmet>
            <title>Product Categorie</title>
         
        </Helmet>
      <Navbar></Navbar>
      <div className="famille-header">
        <div className="gobackproduct">
          <Link to="/products">
            <PiKeyReturnLight size={30} />
            PRODUCTS
          </Link>
        </div>
        <div className="familycont">
          <h1>{famille.titlefr}</h1>
          <h2
            style={{
              color: "#5D6164",
              fontSize: "16px",
              width: "40%",
              fontWeight: "100",
            }}
          >
            {famille?.categories?.map((category) => {
              return `${category.titlefr} / `;
            })}
          </h2>
        </div>
      </div>

      <div className="gridfamille">
        {famille?.categories?.map((category) => {
          return (
            <>
              <div key={category._id} className="productitempreview">
                <img src={category.image} alt="item preview" />
                <div>
                  <h1>{category.titlefr}</h1>
                  <Link to={`/products/categorie/${category._id}`}>
                    See more{" "}
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
