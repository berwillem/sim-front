import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { getFamilleById } from "../../services/parametresServices";
import "./CategoriesList.css";
import { PiKeyReturnLight } from "react-icons/pi";

const CategoriesList = () => {
  const { CategoryId } = useParams();
  const [Categorie, setCategory] = useState([]);
  useEffect(() => {
    getFamilleById(CategoryId)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [CategoryId]);
  console.log(Categorie);
  return (
    <>
      <Navbar></Navbar>
      <div className="famille-header">
        <div className="gobackproduct">
          <Link to="/products">
            <PiKeyReturnLight size={30} />
            BROOOOOOOOOODUCT NIGGA im teesting
          </Link>
        </div>
        <div className="familycont">
          <h1>{Categorie.titlefr}</h1>
          <h2
            style={{
              color: "#5D6164",
              fontSize: "16px",
              width: "40%",

              fontWeight: "100",
            }}
          >
            {Categorie?.categories?.map((category) => {
              return <>{`${category.titlefr} `}</>;
            })}
          </h2>
        </div>
      </div>

      <div className="gridfamille">
        {Categorie?.categories?.map((category) => {
          return (
            <>
              <div key={category._id} className="productitempreview">
                <img src={category.image} alt="item preview" />
                <h1>{category.titlefr}</h1>
                <Link to={`/products/${category._id}`}>Read more </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoriesList;
