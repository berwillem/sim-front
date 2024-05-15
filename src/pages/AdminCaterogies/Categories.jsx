/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { BsBorderStyle } from "react-icons/bs";
import "./Categories.css";
import { useEffect, useState } from "react";
import {
  // getAllUsers,
  // getTotalUserCount,
  // deleteUser,
  getTotalUserCount,
} from "../../services/usersServices";
import {
  getAllCategories,
  CreateCategory,
  CreateGamme,
  CreateMarque,
  getAllGammes,
  getAllMarques,
} from "../../services/categoriesServices";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";

const categories = () => {
  const [categories, setCategories] = useState([]);
  const [totalUserCount, setTotalUserCount] = useState(0);
  console.log(totalUserCount);
  const fetchCategories = (page) => {
    getAllCategories(page)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(categories);

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
    getTotalUserCount().then((res) => {
      setTotalUserCount(res.data.count);
    });
  }, [addcategory]);
  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard
            icon={<BsBorderStyle />}
            title={"Products"}
            // stat={totalUserCount}
          />
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
                <DeleteButon
                  handledelet={() => addcategory(categories._id)}
                ></DeleteButon>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default categories;
