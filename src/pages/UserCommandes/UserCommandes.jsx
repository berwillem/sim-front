import { useState } from "react";
import "./UserCommandes.css";
import { useEffect } from "react";
import { getUserCommandes } from "../../services/usersServices";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import moment from "moment";
import { deleteCommande } from "../../services/commandeservices";
import { RiPassValidFill, RiPassValidLine } from "react-icons/ri";
import { Helmet } from "react-helmet";
import { FaPhoneSquare } from "react-icons/fa";

const UserCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    getUserCommandes(userId)
      .then((res) => {
        setCommandes(res.data);

        console.log(res.data, "daaaaaa");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  }, []);
  const navigate = useNavigate();

  const fetchCommandes = () => {
    getUserCommandes(userId)
      .then((res) => {
        setCommandes(res.data);
        console.log(res.data, "daataaaaaaatata");
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
  console.log(commandes);
  return (
    <>
      <Helmet>
        <title>User Commandes</title>
      </Helmet>
      <div className="admin-stat">
        <div className="table-stat">
          <div className="titre-stat titrestat2">
            <ul className="ligne commandeslist">
              <div className="info-stat infostat2 ">
                <li>Product image</li>
                <li>commande number</li>
                <li>Product Name</li>
                <li>Quantity</li>
                <li>createdAt</li>
                <li>Status</li>
              </div>
              <li>action</li>
            </ul>
          </div>

          {commandes?.map((Commande, index) => {
            console.log(Commande, "commande");
            return (
              <ul
                key={index}
                className={
                  Commande.isValid ? "stores backgreen" : "stores backred"
                }
              >
                <li className="ligne forpc">
                  <span className="imgprevieforcommandespan">
                    <img
                      src={Commande.product?.images[0]}
                      alt=""
                      className="imgprevieforcommande"
                    />{" "}
                  </span>{" "}
                  <span>{Commande.num}</span>
                  <span>
                    {" "}
                    {Commande.product
                      ? Commande.product.titlefr
                      : "Produit supprimé"}
                  </span>{" "}
                  <span>{Commande.quantity}</span>
                  <span>
                    {moment(Commande.createdAt).format("DD MMM YYYY")}
                  </span>
                  <span>
                    {Commande.isValid ? (
                      <>
                        {"valide  "}
                        {""}
                        <RiPassValidLine size={30} color="green" />
                      </>
                    ) : (
                      <>
                        {" non valide  "}{" "}
                        <RiPassValidFill size={30} color="red" />
                      </>
                    )}
                  </span>
                  {Commande.isValid ? (
                    <DeleteButon
                      handledelet={() => handleDelet(Commande._id)}
                    ></DeleteButon>
                  ) : (
                    <FaPhoneSquare
                      size={49}
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() => navigate("/contact")}
                    />
                  )}
                </li>
                <li className="ligne forphone">
                  <span className="imgprevieforcommandespan">
                    <img
                      src={Commande.product?.images[0]}
                      alt=""
                      className="imgprevieforcommande"
                    />{" "}
                  </span>
                  <span>product title : {Commande.product?.titlefr}</span>{" "}
                  <span>quantité :{Commande.quantity}</span>
                  <span>
                    createdAt :
                    {moment(Commande.createdAt).format("DD MMM YYYY")}
                  </span>
                  <span style={{ width: "100%" }}>
                    commande num: {Commande.num}
                  </span>
                  <span>
                    status :
                    {Commande.isValid ? (
                      <>
                        {"valide  "}
                        {""}
                        <RiPassValidLine size={30} color="green" />
                      </>
                    ) : (
                      <>
                        {" non valide  "}{" "}
                        <RiPassValidFill size={30} color="red" />
                      </>
                    )}
                  </span>
                  {Commande.isValid ? (
                    <DeleteButon
                      handledelet={() => handleDelet(Commande._id)}
                    ></DeleteButon>
                  ) : (
                    <FaPhoneSquare
                      size={49}
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() => navigate("/contact")}
                    />
                  )}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserCommandes;
