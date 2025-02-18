import { useState } from "react";
import "./UserCommandes.css";
import { useEffect } from "react";
import { getUserCommandes } from "../../services/usersServices";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import moment from "moment";
import { deleteCommande } from "../../services/commandeservices";
import { Helmet } from "react-helmet";
import { FaRegSquareCheck, FaRegSquareFull } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
const UserCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  console.log(commandes);

  const { userId } = useParams();
  useEffect(() => {
    getUserCommandes(userId)
      .then((res) => {
        setCommandes(res.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  }, [userId]);

  const fetchCommandes = () => {
    getUserCommandes(userId)
      .then((res) => {
        setCommandes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleDelet = (CommandeId) => {
    deleteCommande(CommandeId)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "order deleted succefuly",
          icon: "success",
        });
        fetchCommandes();
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
      <Helmet>
        <title>User Commandes</title>
      </Helmet>
      {commandes.length !== 0 ? (
        <div className="admin-stat">
          <div className="table-stat">
            <div className="titre-stat titrestat2">
              <ul className="ligne commandeslist">
                <div className="info-stat infostat2 ">
                  <li>Product image</li>
                  <li>Product Name</li>
                  <li>Quantity</li>
                  <li>createdAt</li>
                  <li>Status</li>
                </div>
                <li>action</li>
              </ul>
            </div>

            {commandes?.map((Commande, index) => (
              <>
                <p> {moment(Commande.createdAt).format("DD MMM YYYY")}</p>
                <ul key={index} className="stores">
                  {Commande?.products?.map((product, productIndex) => {
                    return (
                      <li key={productIndex} className="ligne forpc">
                        <span className="imgprevieforcommandespan">
                          <img
                            src={product?.product?.images?.[0] || ""}
                            alt="Produit"
                            className="imgprevieforcommande"
                          />
                        </span>
                        <span>
                          {product?.product?.titlefr || "Produit supprimé"}
                        </span>
                        <span>{product.quantity}</span>
                        <span>
                          {moment(Commande.createdAt).format("DD MMM YYYY")}
                        </span>
                        <span>
                          {Commande.isValid ? (
                            <span className="valid">{"valide  "}</span>
                          ) : (
                            <span className="no-valid">{" non valide  "}</span>
                          )}
                        </span>
                        {!Commande.isValid && (
                          <div className="delete-icon">
                            <FaRegTrashAlt
                              handledelet={() => handleDelet(Commande._id)}
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}

                  {/* Version mobile */}
                  {Commande?.products?.map((product, productIndex) => {
                    return (
                      <>
                        <li className="ligne forphone">
                          <span className="imgprevieforcommandespan">
                            <img
                              src={product?.product?.images?.[0] || ""}
                              alt="Produit"
                              className="imgprevieforcommande"
                            />
                          </span>
                          <span>
                            Product title: {product?.product?.titlefr || "N/A"}
                          </span>
                          <span>Quantité: {product?.quantity}</span>
                          <span>
                            CreatedAt:{" "}
                            {moment(Commande.createdAt).format("DD MMM YYYY")}
                          </span>
                          <span>
                            Status:
                            {Commande.isValid ? (
                              <span className="valid">{"valide  "}</span>
                            ) : (
                              <span className="no-valid">
                                {" non valide  "}
                              </span>
                            )}
                          </span>
                          {!Commande.isValid && (
                            <div className="delete-icon">
                              <FaRegTrashAlt
                                handledelet={() => handleDelet(Commande._id)}
                              />
                            </div>
                          )}
                        </li>
                      </>
                    );
                  })}
                </ul>
              </>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <h1>No Orders Yet !</h1>
          <h3>Make an order and receive a exclusive discount</h3>
          <Link
            to="/products"
            style={{
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "var(--primary-color)",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            <button>Shop Now</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserCommandes;
