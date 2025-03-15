import { useState } from "react";
import "./UserCommandes.css";
import { useEffect } from "react";
import { getUserCommandes } from "../../services/usersServices";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
const UserCommandes = () => {
  const { t } = useTranslation();
  const [commandes, setCommandes] = useState([]);
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
                  <li>Image</li>
                  <li>Produit </li>
                  <li>Quantité</li>
                  <li>Prix total</li>
                  <li>Crée le</li>
                  <li style={{ marginLeft: "20px" }}>Status</li>
                  <li style={{ marginLeft: "20px" }}>Bon de Commande</li>
                </div>
              </ul>
            </div>

            {commandes?.map((Commande, index) => (
              <>
                <p>
                  Prix total:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {Commande.totalOrderPrice} DA
                  </span>
                </p>
                <ul key={index} className="stores">
                  {Commande?.products?.map((product, productIndex) => {
                    return (
                      <li key={productIndex} className="ligne forpc">
                        <span
                          className="imgprevieforcommandespan"
                          style={{ marginRight: "30px" }}
                        >
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
                        <span>{product.totalPrice} DA</span>
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
                        {Commande.file ? (
                          <span>
                            <a href={Commande.file} target="_blank">
                              Télécharger le bon de Livraison
                            </a>
                          </span>
                        ) : (
                          <span>
                            <a style={{ alignItems: "center" }}>
                              En cours de traitement
                            </a>
                          </span>
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
                            Produit: {product?.product?.titlefr || "N/A"}
                          </span>
                          <span>Quantité: {product?.quantity}</span>
                          <span>
                            Fait Le:{" "}
                            {moment(Commande.createdAt).format("DD MMM YYYY")}
                          </span>
                          <span>
                            Status:
                            {Commande.isValid ? (
                              <span
                                className="valid"
                                style={{ width: "unset", marginLeft: "10px" }}
                              >
                                {"valide"}
                              </span>
                            ) : (
                              <span
                                className="no-valid"
                                style={{ width: "unset", marginLeft: "10px" }}
                              >
                                {"non valide"}
                              </span>
                            )}
                          </span>
                          {Commande.file ? (
                            <span>
                              <a href={Commande.file} target="_blank">
                                Télécharger le bon de Livraison
                              </a>
                            </span>
                          ) : (
                            <span>
                              <a style={{ alignItems: "center" }}>
                                En cours de traitement
                              </a>
                            </span>
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
          <h1>{t("noorder")}</h1>
          <h3>{t("noordersdesc")}</h3>
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
