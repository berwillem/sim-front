/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { BsBorderStyle } from "react-icons/bs";
import "./Categories.css";
import { useEffect, useState } from "react";
import { getTotalUserCount } from "../../services/usersServices";
import {
  getAllCategories,
  CreateCategory,
} from "../../services/categoriesServices";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";
import { getTotalProductsCount } from "../../services/productsServices";
import Addbutton from "../../components/AddButton/Addbutton";

const categories = () => {
  const [categories, setCategories] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);

  const fetchCategories = (page) => {
    getAllCategories(page)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const addcategory = () => {
    CreateCategory()
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "user deleted succefuly",
          icon: "success",
        });
        fetchCategories();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };
  useEffect(() => {
    getTotalProductsCount().then((res) => {
      setTotalProductCount(res.data.count);
    });
  }, [totalProductCount]);
  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard
            icon={<BsBorderStyle />}
            title={"Categories"}
            stat={totalProductCount}
          />
          <div className="foraddbutton">
            <Addbutton
              title={"Add Category"}
              navigate={"/addcategory"}
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
                <li>image</li>
                <li>marque</li>
                <li>gamme</li>
                <li>category</li>
              </div>
              <li>action</li>
            </ul>
          </div>

          {categories?.map((categories, index) => (
            <ul key={index} className="stores">
              <li className="ligne">
                <span>{categories._id}</span>
                <span>{categories.title}</span>
                <span> {categories.gamme.title}</span>
                <DeleteButon></DeleteButon>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default categories;
