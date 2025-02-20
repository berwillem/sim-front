import "./AdminDevis.css";
// import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { FaRegSquareCheck, FaRegSquareFull, FaUsers } from "react-icons/fa6";

import { useEffect, useState } from "react";
import DeleteButton from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";
import {
  getAllDevis,
  deleteDevis,
  updateDevis,
  getDevisCount,
} from "../../services/devisServices";
import moment from "moment";
import { LuUserX } from "react-icons/lu";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";

export default function Devis() {
  const [Devis, setDevis] = useState([]);
  const [filter, setFilter] = useState("");
  const { i18n } = useTranslation();

  const [totalDevisCount, setTotalDevisCount] = useState(0);

  const fetchDevis = () => {
    getAllDevis()
      .then((res) => {
        setDevis(res.data);
      })
      .catch((error) => {
        console.error("Error fetching Devis:", error);
      });
  };

  useEffect(() => {
    fetchDevis();
    getDevisCount().then((res) => {
      setTotalDevisCount(res.data.totalCount);
      console.log(res.data);
    });
  }, []);

  const handleDelete = (orderId) => {
    deleteDevis(orderId)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Devis deleted successfully",
          icon: "success",
        });
        fetchDevis();
      })
      .catch((err) =>
        Swal.fire({ icon: "error", title: "Oops...", text: err.message })
      );
  };

  const handleUpdate = (DevisId) => {
    updateDevis(DevisId)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Devis updated successfully",
          icon: "success",
        });
        fetchDevis();
      })
      .catch((err) =>
        Swal.fire({ icon: "error", title: "Oops...", text: err.message })
      );
  };

  return (
    <div className="admin-stat">
      <div className="mini-cards">
        <AdminMiniCard
          icon={<FaUsers />}
          title={"Devis demandés "}
          stat={totalDevisCount}
        />
      </div>

      {Devis.length !== 0 ? (
        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne order-list">
              <div
                className="info-stat"
                style={{ justifyContent: "space-between" }}
              >
                <li>Name</li>
                <li>Product</li>
                <li style={{ marginLeft: "19px" }}>Email</li>
                <li>Phone</li>
                <li style={{ textAlign: "right" }}>Message</li>
                <li style={{ textAlign: "right" }}>Date</li>
                <li style={{ textAlign: "right" }}>Status</li>
                <li style={{ textAlign: "right", width: "140px" }}>Action</li>
              </div>
            </ul>
          </div>

          {Devis.map((order, index) => (
            <ul
              key={index}
              className={order.isValid ? "stores backgreen" : "stores backred"}
            >
              <li className="ligne">
                <span>{order.name}</span>
                <span>{order.product ? order.product : "Product Deleted"}</span>
                <span>{order.email}</span>
                <span>{order.phoneNumber}</span>
                <span style={{ width: "250px" }}>{order.message}</span>
                <span>{moment(order.createdAt).format("DD MMM YYYY")}</span>
                <span
                  onClick={() => handleUpdate(order._id)}
                  style={{ cursor: "pointer" }}
                >
                  {order.isValid ? (
                    <FaRegSquareCheck size={30} />
                  ) : (
                    <FaRegSquareFull size={24} />
                  )}
                </span>
                <DeleteButton handledelet={() => handleDelete(order._id)} />
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <div className="no-Devis">
          <h1>No Devis found</h1>
          <h3>You will see all your Devis here</h3>
        </div>
      )}
    </div>
  );
}
