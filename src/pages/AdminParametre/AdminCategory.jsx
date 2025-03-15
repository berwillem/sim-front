import { FaUsers } from "react-icons/fa6";
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import DeleteButton from "../../components/DeleteButton/DeleteButon";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import "./Para.css";

import {
  deleteCategory,
  getAllCategories,
  getTotalCategoriesCount,
} from "../../services/parametresServices";
import Swal from "sweetalert2";
import AddButton from "../../components/AddButton/Addbutton";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategoriesCount, setTotalCategoriesCount] = useState(0);
  const navigate = useNavigate();

  const fetchCategories = () => {
    getAllCategories(page)
      .then((res) => {
        setCategories(res.data.categories);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getTotalCategoriesCount().then((res) => {
      console.log(res.data, "dAAAAAAAAAAAAAAAA");
      setTotalCategoriesCount(res.data.count);
    });
  }, [categories]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    deleteCategory(id)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Category deleted successfully",
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

  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard
            icon={<FaUsers />}
            title={"Total Categories"}
            stat={totalCategoriesCount}
          />
          <div className="foraddbutton">
            <AddButton
              title={"Add Category"}
              navigate={"/admin/parametres/addcategory"}
            ></AddButton>
          </div>
        </div>

        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne">
              <div className="info-stat categoryinfostat">
                <li>Nom en français</li>
                <li>Nom en anglais</li>
                <li>Famille</li>
              </div>
              <li>Action</li>
            </ul>
          </div>

          {categories?.map((category) => (
            <ul key={category._id} className="stores">
              <div className="buttondeleteabsolute">
                <DeleteButton handledelet={() => handleDelete(category._id)} />
                <CiEdit size={40} onClick={() => navigate(`${category._id}`)} />
              </div>

              <li className="ligne categoryligne">
                <span>{category.titlefr}</span>
                <span>{category.titleen}</span>
                <span>{category.famille.titlefr}</span>

                <span>
                  <img src={category.image} alt="" />{" "}
                </span>
              </li>
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

export default AdminCategory;
