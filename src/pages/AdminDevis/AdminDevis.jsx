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
  addfileToDevis,
  removeFileFromDevis,
} from "../../services/devisServices";
import moment from "moment";
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { LuImage, LuImagePlus } from "react-icons/lu";

export default function Devis() {
  const [Devis, setDevis] = useState([]);
  const [totalDevisCount, setTotalDevisCount] = useState(0);
  const [fileUploading, setFileUploading] = useState(false);

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

  const validateDevis = (DevisId) => {
    updateDevis(DevisId, { isValid: true })
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

  const rejectDevis = (DevisId) => {
    updateDevis(DevisId, { isValid: false })
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

  const handleFileUpload = async (orderId, event) => {
    const image = event.target.files[0];
    if (!image) return;

    setFileUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", image); // Ensure "file" matches the field in multer

      const response = await addfileToDevis(orderId, formData);

      setDevis((prevDevis) =>
        prevDevis.map((devis) =>
          devis._id === orderId
            ? { ...devis, file: response.data.image }
            : devis
        )
      );

      Swal.fire("Succès!", "Fichier ajouté avec succès.", "success");
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire(
        "Error",
        "Une erreur s'est produite lors de l'ajout du fichier.",
        "error"
      );
    } finally {
      setFileUploading(false);
    }
  };

  const handleFileRemove = async (orderId) => {
    try {
      await removeFileFromDevis(orderId);
      setDevis((prevDevis) =>
        prevDevis.map((devis) => {
          if (devis._id === orderId) {
            return { ...devis, file: null }; // Update file URL
          }
          return devis;
        })
      );
      Swal.fire("Succès!", "Fichier supprimé avec succès.", "success");
    } catch (error) {
      console.error("Error removing file:", error);
      Swal.fire(
        "Error",
        "Une erreur s'est produite lors de la suppression du fichier.",
        "error"
      );
    }
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
                {order.file ? (
                  <a
                    href={order.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ alignItems: "center" }}
                  >
                    <LuImage size={20} color="black" />
                  </a>
                ) : (
                  <>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      onChange={(event) => handleFileUpload(order._id, event)}
                      disabled={fileUploading}
                      id={order._id}
                    />
                    <label htmlFor={order._id}>
                      <LuImagePlus
                        id={order._id}
                        size={20}
                        style={{ cursor: "pointer", color: "black" }}
                      />
                    </label>
                  </>
                )}
                <span>{order.name}</span>
                <span>{order.product ? order.product : "Product Deleted"}</span>
                <span>{order.email}</span>
                <span>{order.phoneNumber}</span>
                <span style={{ width: "250px" }}>{order.message}</span>
                <span>{moment(order.createdAt).format("DD MMM YYYY")}</span>
                <span style={{ cursor: "pointer" }}>
                  {order.isValid ? (
                    <FaRegSquareCheck
                      size={30}
                      onClick={() => validateDevis(order._id)}
                    />
                  ) : (
                    <FaRegSquareFull
                      size={24}
                      onClick={() => rejectDevis(order._id)}
                    />
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
