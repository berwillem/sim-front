import { useState } from "react";
import "./UserDevis.css";
import { useEffect } from "react";
import { getUserDevis } from "../../services/usersServices";

import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import { Helmet } from "react-helmet";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const UserDevis = () => {
  const { t } = useTranslation();
  const [devis, setDevis] = useState([]);

  const { userId } = useParams();
  useEffect(() => {
    getUserDevis(userId)
      .then((res) => {
        setDevis(res.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  }, [userId]);

  return (
    <>
      <Helmet>
        <title>User Devis</title>
      </Helmet>
      {devis.length !== 0 ? (
        <div className="admin-stat">
          <div className="table-stat">
            <div className="titre-stat titrestat2">
              <ul className="ligne commandeslist">
                <div
                  className="info-stat infostat2 info-stat22"
                  style={{ marginRight: "20px" }}
                >
                  <li>Produit</li>
                  <li>Message</li>
                  <li>Crée le:</li>
                  <li>Status</li>
                  <li>Devis</li>
                </div>
              </ul>
            </div>

            {devis?.map((Devis, index) => (
              <>
                <p> {moment(Devis.createdAt).format("DD MMM YYYY")}</p>
                <ul key={index} className="stores">
                  <li className="ligne forpc" style={{ minHeight: "90px" }}>
                    <span>{Devis?.product || "Produit supprimé"}</span>
                    <span>{Devis.message}</span>
                    <span>{moment(Devis.createdAt).format("DD MMM YYYY")}</span>
                    <span>
                      {Devis.isValid ? (
                        <span className="valid">{"valide  "}</span>
                      ) : (
                        <span className="no-valid">{" non valide  "}</span>
                      )}
                    </span>
                    {Devis.file ? (
                      <span className="flex-center">
                        <a href={Devis.file} target="_blank">
                          Télécharger le devis
                        </a>{" "}
                      </span>
                    ) : (
                      <span className="flex-center">
                        En cours de traitement
                      </span>
                    )}
                  </li>
                  {/* Version mobile */}
                  <li className="ligne forphone">
                    <span>Produit : {Devis.product || "N/A"}</span>
                    <span>Message: {Devis?.message}</span>
                    <span>
                      Fait le: {moment(Devis.createdAt).format("DD MMM YYYY")}
                    </span>
                    {Devis.file && (
                      <span className="flex-center">
                        Devis: <a href={Devis.file}>Télécharger le devis</a>{" "}
                      </span>
                    )}

                    <span>
                      Status:
                      {Devis.isValid ? (
                        <span
                          className="valid"
                          style={{ width: "unset", marginLeft: "10px" }}
                        >
                          {"valide  "}
                        </span>
                      ) : (
                        <span
                          className="no-valid"
                          style={{ width: "unset", marginLeft: "10px" }}
                        >
                          {" non valide  "}
                        </span>
                      )}
                    </span>
                  </li>
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
          <h1>{t("nodevis")}</h1>
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

export default UserDevis;
