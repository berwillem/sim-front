import "./Orders.css";
/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { FaUsers } from "react-icons/fa6";
import { AiFillPrinter } from "react-icons/ai";
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
  addFileToOrder,
} from "../../services/commandeservices";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import { LuUserX } from "react-icons/lu";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LuImage } from "react-icons/lu";
import { LuImagePlus } from "react-icons/lu";

const Orders = () => {
  const [Commandes, setCommandes] = useState([]);
  const [TotalCommandesCount, setTotalCommandesCount] = useState(0);
  const [validCommandesCount, setValidCommandesCount] = useState(0);
  const [pendingCommandesCount, setPendingCommandesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("");
  const [fileUploading, setFileUploading] = useState(false);

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

  const handleFileUpload = async (commandeId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileUploading(true); // Show a loading state if needed

    try {
      const response = await addFileToOrder(commandeId, file);

      // Update the state to reflect the new file URL
      setCommandes((prevCommandes) =>
        prevCommandes.map((commande) =>
          commande._id === commandeId
            ? { ...commande, file: response.data.file } // Update file URL
            : commande
        )
      );

      Swal.fire("Succès!", "Fichier ajouté avec succès.", "success");
    } catch (error) {
      Swal.fire(
        "Erreur",
        error.response?.data?.error || "Erreur inconnue",
        "error"
      );
    } finally {
      setFileUploading(false);
    }
  };

  const printOrders = (commande) => {
    const printContent = `
      <html>
        <head>
          <title>Commande</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h2>Commande N° ${commande.num}</h2>
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Nom Complet</th>
                <th>Numéro</th>
                <th>Quantité</th>
                <th>Prix Total</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${commande.products
                .map(
                  (product) => `
                <tr>
                  <td>${product?.product?.titlefr || "Produit supprimé"}</td>
                  <td>${
                    commande.user
                      ? `${commande.user.FirstName} ${commande.user.LastName}`
                      : commande.client || "N/A"
                  }</td>
                  <td>${commande.phoneNumber || "N/A"}</td>
                  <td>${product?.quantity || 0}</td>
                  <td>${new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "DZD",
                  }).format(product.totalPrice)}</td>
                  <td>${moment(commande.createdAt).format("DD MMM YYYY")}</td>
                  <td>${commande.isValid ? "Validé" : "Non Validé"}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const downloadValidOrdersCSV = () => {
    // Filter valid orders
    const validOrders = Commandes.filter((order) => order.isValid);

    // Properly cased headers
    const headers = [
      "Command Number",
      "Product Name",
      "Full Name",
      "Phone Number",
      "Quantity",
      "Total Price",
      "Order Date",
    ];

    // Prepare the rows
    const rows = validOrders.map((order) => {
      const productName =
        i18n.language === "fr"
          ? order.product?.titlefr
          : order.product?.titleen;
      const fullName = order.user
        ? `${order.user.FirstName} ${order.user.LastName}`
        : order.client || "N/A";

      return [
        order.num, // Command Number
        productName || "Produit supprimé", // Product Name
        fullName, // Full Name
        order.phoneNumber || "N/A", // Phone Number
        order.quantity || 0, // Quantity
        order.totalPrice || 0, // Total Price (plain number)
        moment(order.createdAt).format("DD MMM YYYY"), // Order Date
      ];
    });

    // Combine headers and rows into a CSV string
    const csvContent = [headers, ...rows]
      .map((row) => row.map((item) => `"${item}"`).join(",")) // Escape and join
      .join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "valid_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchCommandes();
  }, [page, filter]);

  useEffect(() => {
    getTotalCommandesCount().then((res) => {
      setTotalCommandesCount(res.data.count);
    });
  }, [handleDelet]);

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

  useEffect(() => {
    getValidCommandesCount().then((res) => {
      setValidCommandesCount(res.data.count);
    });
  }, [handleDelet]);

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

      <button onClick={downloadValidOrdersCSV} className="download-csv-button">
        <h4 style={{ cursor: "pointer" }}> Download Valid Orders as CSV</h4>
      </button>

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
              <div
                style={{ display: "flex", gap: "15px", alignItems: "center" }}
              >
                <h4>
                  {Commande.user.FirstName} {Commande.user.LastName}
                </h4>
                <AiFillPrinter
                  style={{ cursor: "pointer" }}
                  size={25}
                  onClick={() => {
                    printOrders(Commande);
                  }}
                ></AiFillPrinter>
                {Commande.file ? (
                  <a
                    href={Commande.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LuImage size={20} color="black" />
                  </a>
                ) : (
                  <>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      onChange={(event) =>
                        handleFileUpload(Commande._id, event)
                      }
                      disabled={fileUploading}
                      id="file"
                    />
                    <label htmlFor="file">
                      <LuImagePlus
                        size={20}
                        style={{ cursor: "pointer", color: "black" }}
                      />
                    </label>
                  </>
                )}
              </div>
              {Commande.products.map((product, idx) => (
                <ul
                  key={idx}
                  className={Commande.isValid ? "stores " : "stores "}
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
                      <span style={{ width: "unset" }}>
                        {Commande.isValid ? (
                          <span
                            onClick={() => updateOrder(Commande._id)}
                            className="valid"
                            style={{ width: "unset" }}
                          >
                            {"valide  "}
                          </span>
                        ) : (
                          <span
                            onClick={() => updateOrder(Commande._id)}
                            className="no-valid"
                            style={{ width: "unset" }}
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
