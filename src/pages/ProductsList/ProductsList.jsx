import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { getFamilleById } from "../../services/parametresServices";
import "./ProductsList.css";
const ProductsList = () => {
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
      <Navbar></Navbar>
      <div className="famille-header">
        <div className="gobackproduct">
          <Link to="/products">
            <h2>PRODUCTS</h2>
          </Link>
        </div>
        <h1>Fasteners</h1>
      </div>
    </>
  );
};

export default ProductsList;
