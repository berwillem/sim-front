import { FaUsers } from "react-icons/fa6";
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import "./Para.css";

import {
  getAllFamilles,
  getTotalFamillesCount,
} from "../../services/parametresServices";

const AdminFamille = () => {
  const [familles, setFamille] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFamillesCount, setTotalFamillesCount] = useState(0);

  const fetchFamille = (pagination = "false", page = 1) => {
    getAllFamilles(pagination, page)
      .then((res) => {
        setFamille(res.data.familles);
        setTotalPages(res.data.totalPages || 1);

        console.log(res.data, "familles");
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchFamille("true", page);
  }, [page]);
  useEffect(() => {
    getTotalFamillesCount().then((res) => {
      setTotalFamillesCount(res.data.count);
    });
  }, [totalFamillesCount]);
  const handlePageChange = (event, value) => {
    setPage(value);
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
        </div>

        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne">
              <div className="info-stat">
                <li>id</li>
                <li>name fr</li>
                <li>name en</li>
              </div>
            </ul>
          </div>

          {familles?.map((famille) => (
            <ul key={famille._id} className="stores">
              <li className="ligne">
                <span>{famille._id}</span>
                <span>{famille.titlefr}</span>
                <span>{famille.titleen}</span>
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
