/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { BsBorderStyle } from "react-icons/bs";
import "./Products.css";
import { useEffect, useState } from "react";
import Addbutton from "../../components/AddButton/Addbutton";
import { getAllProducts } from "../../services/productsServices";

const Users = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = (page) => {
    getAllProducts(page)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard
            icon={<BsBorderStyle />}
            title={"Products"}
            // stat={totalUserCount}
          />
          <div className="foraddbutton">
            <Addbutton
              title={"Add Product"}
              navigate={"/admin/products/addproduct"}
            ></Addbutton>
          </div>
        </div>
        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne">
              <div className="info-stat">
                <li>title</li>
                <li>price</li>
                <li>desc.</li>
                <li>famille</li>
                <li>category</li>
                <li>type</li>
                <li>marque</li>
                <li>gamme</li>
              </div>
              <li>preview</li>
            </ul>
          </div>
          {products?.map((product, index) => (
            <ul key={index} className="stores">
              <Productitem product={product} />
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;

const Productitem = ({ product, index }) => {
  return (
    <li key={index} className="ligne">
      <span> {product?.title}</span>
      <span>{product?.price}</span>
      <span>{product?.description}</span>
      <span>{product?.famille?.title}</span>
      <span>{product?.category?.title}</span>
      <span>{product?.type?.title}</span>
      <span>{product?.marque}</span>
      <span>{product?.gamme}</span>
      <span>
        {product.images.map((image) => (
          <img key={image} src={image} alt="store" className="store-image" />
        ))}
      </span>
    </li>
  );
};
