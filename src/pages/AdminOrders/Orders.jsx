import "./Orders.css";
/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { FaUsers } from "react-icons/fa6";
import { CiSquareCheck } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";
import { TbGitBranchDeleted } from "react-icons/tb";
import { useEffect, useState } from "react";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";
import {
  deleteCommande,
  getAllCommandes,
  getTotalCommandesCount,
} from "../../services/commandeservices";

const Orders = () => {
  const [Commandes, setCommandes] = useState([]);
  const [TotalCommandesCount, setTotalCommandesCount] = useState(0);
  const [validCommandesCount, setValidCommandesCount] = useState(0);
  const [pendingCommandesCount, setPendingCommandesCount] = useState(0);
  const fetchCommandes = (page) => {
    getAllCommandes(page)
      .then((res) => {
        setCommandes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  useEffect(() => {
    fetchCommandes();
  }, []);

  const handleDelet = (CommandeId) => {
    deleteCommande(CommandeId)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "user deleted succefuly",
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
  useEffect(() => {
    getTotalCommandesCount().then((res) => {
      setTotalCommandesCount(res.data.count);
    });
  }, [handleDelet]);
  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard
            icon={<FaUsers />}
            title={"Total Commandes"}
            stat={TotalCommandesCount}
          />
          <AdminMiniCard
            icon={<CiSquareCheck />}
            title={"Commandes validées"}
            stat={TotalCommandesCount}
          />
          <AdminMiniCard
            icon={<IoIosTimer />}
            title={"Commandes en attente"}
            stat={TotalCommandesCount}
          />
          <AdminMiniCard
            icon={<TbGitBranchDeleted />}
            title={"Commandes supprimées"}
            stat={TotalCommandesCount}
          />
        </div>
        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne">
              <div className="info-stat">
                <li>id</li>
                <li>name</li>
                <li>email</li>
              </div>
              <li>action</li>
            </ul>
          </div>

          {Commandes?.map((Commande, index) => {
            console.log(Commande);
            return (
              <ul key={index} className="stores">
                <li className="ligne">
                  <span>{Commande._id}</span>
                  <span>
                    {Commande.product?.title} {Commande.user.FirstName}
                    {Commande.user.LastName}
                  </span>
                  <span>{Commande.quantity}</span>
                  
                  <DeleteButon
                    handledelet={() => handleDelet(Commande._id)}
                  ></DeleteButon>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Orders;
