import { useState } from "react";
import "./UserCommandes.css";
import { useEffect } from "react";
import { getUserCommandes } from "../../services/usersServices";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const UserCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    getUserCommandes(userId)
      .then((res) => {
        setCommandes(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  }, []);
  return (
    <>
      {commandes.map((commande) => (
        <div key={commande._id}>{commande._id}</div>
      ))}
    </>
  );
};

export default UserCommandes;
