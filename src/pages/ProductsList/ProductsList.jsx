import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./ProductsList.css";
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const fetchProductsByCategories = () => {
    console.log("products");
  };
  const fetchTypes = () => {
    console.log("types");
  };
  useEffect(() => {
    fetchProductsByCategories();
    fetchTypes();
  }, []);
  return (
    <>
      <Navbar></Navbar>
    </>
  );
};

export default ProductsList;
