/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { BsBorderStyle } from "react-icons/bs";
import "./Products.css";
import { useEffect, useState } from "react";
import Addbutton from "../../components/AddButton/Addbutton";
import {
  getAllProducts,
  getTotalProductsCount,
} from "../../services/productsServices";
import { Pagination } from "@mui/material";

const Users = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const fetchProducts = (page) => {
    getAllProducts(page)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  useEffect(() => {
    fetchProducts(page);
  }, [page]);
  useEffect(() => {
    getTotalProductsCount().then((res) => {
      setTotalProductCount(res.data.count);
    });
  }, [totalProductCount]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard
            icon={<BsBorderStyle />}
            title={"Products"}
            stat={totalProductCount}
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
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
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
