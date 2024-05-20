import { FaUsers } from "react-icons/fa6";
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllFamilles } from "../../services/parametresServices";
import Swal from "sweetalert2";
import Addbutton from "../../components/AddButton/Addbutton";
const AdminFamille = () => {
  const [familles, setFamille] = useState([]);
  const fetchFamille = () => {
    getAllFamilles()
      .then((res) => {
        setFamille(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  useEffect(() => {
    fetchFamille();
  }, []);
  const handleDelet = () => {
    console.log("deleted");
    // deleteFamille()
    //   .then(() => {
    //     Swal.fire({
    //       title: "Good job!",
    //       text: "user deleted succefuly",
    //       icon: "success",
    //     });
    //     fetchFamille();
    //   })
    //   .catch((err) => {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: err.message,
    //     });
    //   });
  };
  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard icon={<FaUsers />} title={"Total Users"} stat={10} />
        </div>
        <div className="foraddbutton">
          <Addbutton
            title={"Add Famille"}
            navigate={"/admin/parametres/addfamille"}
          ></Addbutton>
        </div>
        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne">
              <div className="info-stat">
                <li>id</li>
                <li>name</li>
              </div>
              <li>action</li>
            </ul>
          </div>

          {familles?.map((famille) => (
            <ul key={famille._id} className="stores">
              <li className="ligne">
                <span>{famille._id}</span>
                <span>{famille.title}</span>
                <DeleteButon handledelet={() => handleDelet()}></DeleteButon>
              </li>
            </ul>
          ))}
        </div>
        {/* <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        /> */}
      </div>
    </>
  );
};

export default AdminFamille;
