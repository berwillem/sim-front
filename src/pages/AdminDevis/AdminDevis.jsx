import "./AdminDevis.css";
// import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { FaRegSquareCheck, FaRegSquareFull } from "react-icons/fa6";

import { useEffect, useState } from "react";
import DeleteButton from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";
import {
  getAllDevis,
  deleteDevis,
  updateDevis,
} from "../../services/devisServices";
import moment from "moment";
import { LuUserX } from "react-icons/lu";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Devis() {
  const [Devis, setDevis] = useState([]);
  const [filter, setFilter] = useState("");
  const { i18n } = useTranslation();

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
      {/* <div className="mini-cards">
        <AdminMiniCard
          icon={<FaUsers />}
          title={"Total Devis"}
          stat={totalDevisCount}
        />
        <AdminMiniCard
          icon={<CiSquareCheck />}
          title={"Validated Devis"}
          stat={validDevisCount}
        />
        <AdminMiniCard
          icon={<IoIosTimer />}
          title={"Pending Devis"}
          stat={pendingDevisCount}
        />
      </div> */}
      <FormControl
        variant="outlined"
        style={{ minWidth: 120 }}
        className="filterParent"
      >
        <InputLabel>Status</InputLabel>
        <Select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            fetchDevis(e.target.value);
          }}
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="true">Valid</MenuItem>
          <MenuItem value="false">Not Valid</MenuItem>
        </Select>
      </FormControl>
      {Devis.length !== 0 ? (
        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne order-list">
              <div className="info-stat">
                <li>Name</li>
                <li>Product</li>
                <li>Email</li>
                <li>Phone</li>
              </div>

              <li>Status</li>
              <li>Action</li>
            </ul>
          </div>

          {Devis.map((order, index) => (
            <ul
              key={index}
              className={order.isValid ? "stores backgreen" : "stores backred"}
            >
              <li className="ligne">
                <span>{order.num}</span>
                <span>
                  {order.product ? order.product.title : "Product Deleted"}
                </span>
                <span>
                  {order.user ? (
                    `${order.user.FirstName} ${order.user.LastName}`
                  ) : (
                    <LuUserX />
                  )}
                </span>
                <span>{order.phoneNumber}</span>
                <span>{order.quantity}</span>
                <span>
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "DZD",
                  }).format(order.totalPrice)}
                </span>
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
                <DeleteButton handleDelete={() => handleDelete(order._id)} />
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
