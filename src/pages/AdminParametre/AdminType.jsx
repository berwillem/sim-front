import { FaUsers } from "react-icons/fa6";
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import DeleteButton from "../../components/DeleteButton/DeleteButon";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import "./Para.css";

import {
  deleteType,
  getAllTypes,
  getTotalTypesCount,
} from "../../services/parametresServices";
import Swal from "sweetalert2";
import AddButton from "../../components/AddButton/Addbutton";

const AdminTypes = () => {
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTypesCount, setTotalTypesCount] = useState(0);

  const fetchTypes = () => {
    getAllTypes(page)
      .then((res) => {
        setTypes(res.data.types);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching types:", error);
      });
  };

  useEffect(() => {
    fetchTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getTotalTypesCount().then((res) => {
      setTotalTypesCount(res.data.count);
    });
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    deleteType(id)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Type deleted successfully",
          icon: "success",
        });
        fetchTypes();
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
            title={"Total Types"}
            stat={totalTypesCount}
          />
          <div className="foraddbutton">
            <AddButton
              title={"Add Type"}
              navigate={"/admin/parametres/addtype"}
            ></AddButton>
          </div>
        </div>

        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne">
              <div
                className="info-stat"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "70px",
                }}
              >
                <li>Nom en français</li>
                <li>Nom en anglais</li>
                <li>Famille</li>
                <li>Catégorie</li>
              </div>
              <li style={{ paddingRight: "0" }}>Action</li>
            </ul>
          </div>

          {types?.map((type) => (
            <ul key={type._id} className="stores">
              <li className="ligne">
                <span>{type.titlefr}</span>
                <span>{type.titleen}</span>
                <span>{type.category.famille.titlefr}</span>
                <span>{type.category.titlefr}</span>
                <span style={{ width: "100px" }}>
                  <DeleteButton handleDelete={() => handleDelete(type._id)} />
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

export default AdminTypes;
