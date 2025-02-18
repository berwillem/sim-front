import "./Orders.css";
/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { FaRegSquareCheck, FaRegSquareFull, FaUsers } from "react-icons/fa6";
import { CiSquareCheck } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";
import { useEffect, useState } from "react";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";
import {
  deleteCommande,
  getAllCommandes,
  getTotalCommandesCount,
  getPendingCommandesCount,
  getValidCommandesCount,
  updateCommande,
} from "../../services/commandeservices";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import { LuUserX } from "react-icons/lu";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const [Commandes, setCommandes] = useState([]);
  const [TotalCommandesCount, setTotalCommandesCount] = useState(0);
  const [validCommandesCount, setValidCommandesCount] = useState(0);
  const [pendingCommandesCount, setPendingCommandesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("");

  const fetchCommandes = () => {
    getAllCommandes(page, filter)
      .then((res) => {
        setCommandes(res.data.commandes);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelet = (CommandeId) => {
    deleteCommande(CommandeId)
      .then(() => {
        Swal.fire("Supprimé!", "Commande supprimée avec succès.", "success");
        fetchCommandes();
      })
      .catch((err) => {
        Swal.fire("Erreur", err.message, "error");
      });
  };

  const updateOrder = (CommandeId) => {
    updateCommande(CommandeId)
      .then(() => {
        Swal.fire("Succès!", "Commande mise à jour avec succès.", "success");
        fetchCommandes();
      })
      .catch((err) => {
        Swal.fire("Erreur", err.message, "error");
      });
  };

  useEffect(() => {
    fetchCommandes();
  }, [page, filter]);

  useEffect(() => {
    getTotalCommandesCount().then((res) =>
      setTotalCommandesCount(res.data.count)
    );
    getPendingCommandesCount().then((res) =>
      setPendingCommandesCount(res.data.count)
    );
    getValidCommandesCount().then((res) =>
      setValidCommandesCount(res.data.count)
    );
  }, [Commandes]);

  const { i18n } = useTranslation();

  return (
    <div className="admin-stat">
      <div className="mini-cards">
        <AdminMiniCard
          icon={<FaUsers />}
          title="Total Commandes"
          stat={TotalCommandesCount}
        />
        <AdminMiniCard
          icon={<CiSquareCheck />}
          title="Commandes validées"
          stat={validCommandesCount}
        />
        <AdminMiniCard
          icon={<IoIosTimer />}
          title="Commandes en attente"
          stat={pendingCommandesCount}
        />
      </div>

      <FormControl
        variant="outlined"
        style={{ minWidth: 120 }}
        className="filterParent"
      >
        <InputLabel>Status</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="true">Valid</MenuItem>
          <MenuItem value="false">Not Valid</MenuItem>
        </Select>
      </FormControl>

      {Commandes.length > 0 ? (
        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne commandeslist">
              <div className="info-stat">
                <li>Command Number</li>
                <li>Product</li>
                <li>Fullname</li>
                <li>Number</li>
                <li>Quantity</li>
                <li>Total Price</li>
                <li>createdAt</li>
              </div>
              <li>Status</li>
              <li>Action</li>
            </ul>
          </div>

          {Commandes.map((Commande) => (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              key={Commande._id}
            >
              <p> {moment(Commande.createdAt).format("DD MMM YYYY")}</p>
              {Commande.products.map((product, idx) => (
                <ul
                  key={idx}
                  className={
                    Commande.isValid ? "stores " : "stores "
                  }
                >
                  <li className="ligne">
                    <span>{Commande.num}</span>
                    <span>
                      {product?.product?.titlefr || "Produit supprimé"}
                    </span>
                    <span>
                      {Commande.user ? (
                        `${Commande.user.FirstName} ${Commande.user.LastName}`
                      ) : (
                        <div className="flex">
                          {Commande.client} <LuUserX />
                        </div>
                      )}
                    </span>
                    <span>{Commande.phoneNumber}</span>
                    <span>{product?.quantity}</span>
                    <span>
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "DZD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(product.totalPrice)}
                    </span>
                    <span>
                      {moment(Commande.createdAt).format("DD MMM YYYY")}
                    </span>
                    <span style={{ cursor: "pointer" }}>
                      <span>
                        {Commande.isValid ? (
                          <span
                            onClick={() => updateOrder(Commande._id)}
                            className="valid"
                          >
                            {"valide  "}
                          </span>
                        ) : (
                          <span
                            onClick={() => updateOrder(Commande._id)}
                            className="no-valid"
                          >
                            {" non valide  "}
                          </span>
                        )}
                      </span>
                    </span>
                    <DeleteButon
                      handledelet={() => handleDelet(Commande._id)}
                    />
                  </li>
                </ul>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-orders">
          <h1>{`Aucune commande ${
            filter === "true"
              ? "valide"
              : filter === "false"
              ? "non valide"
              : ""
          }`}</h1>
          <h3>Vous verrez toutes vos commandes ici</h3>
        </div>
      )}

      {Commandes.length > 0 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Orders;
