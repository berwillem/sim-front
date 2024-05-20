import { FaUsers } from "react-icons/fa6";
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import "./Para.css";

import {
  deleteFamille,
  getAllFamilles,
  getTotalFamillesCount,
} from "../../services/parametresServices";
import Swal from "sweetalert2";
import Addbutton from "../../components/AddButton/Addbutton";
const AdminFamille = () => {
  const [familles, setFamille] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFamillesCount, setTotalFamillesCount] = useState(0);

  const fetchFamille = () => {
    getAllFamilles()
      .then((res) => {
        setFamille(res.data.familles);
        setTotalPages(res.data.totalPages);

        console.log(res.data, "familles");
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchFamille(page);
  }, [page]);
  useEffect(() => {
    getTotalFamillesCount().then((res) => {
      setTotalFamillesCount(res.data.count);
    });
  }, [totalFamillesCount]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleDelet = () => {
    console.log("deleted");
    deleteFamille()
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "user deleted succefuly",
          icon: "success",
        });
        fetchFamille();
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
            title={"Total Familles"}
            stat={totalFamillesCount}
          />
          <div className="foraddbutton">
            <Addbutton
              title={"Add Famille"}
              navigate={"/admin/parametres/addfamille"}
            ></Addbutton>
          </div>
        </div>

        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne">
              <div className="info-stat">
                <li>id</li>
                <li>name</li>
              </div>
              <li>action</li>
            </ul>
          </div>

          {familles?.map((famille) => (
            <ul key={famille._id} className="stores">
              <li className="ligne">
                <span>{famille._id}</span>
                <span>{famille.title}</span>
                <DeleteButon handledelet={() => handleDelet()}></DeleteButon>
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

export default AdminFamille;
