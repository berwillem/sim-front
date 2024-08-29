/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { FaUsers } from "react-icons/fa6";
import "./Users.css";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  getTotalUserCount,
  deleteUser,
} from "../../services/usersServices";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";
import Pagination from "@mui/material/Pagination";
import { PiPackageFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUserCount, setTotalUserCount] = useState(0);

  const fetchUsers = (page) => {
    getAllUsers(page)
      .then((res) => {
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDelet = (userId) => {
    deleteUser(userId)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "user deleted succefuly",
          icon: "success",
        });
        fetchUsers();
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
    getTotalUserCount().then((res) => {
      setTotalUserCount(res.data.count);
    });
  }, [handleDelet]);
  // pagination :
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard
            icon={<FaUsers />}
            title={"Total Users"}
            stat={totalUserCount}
          />
        </div>
        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne" id="ligneuser">
              <div className="info-stat" id="info-statuser">
                <li>Nom complet</li>
                <li>Email</li>
                <li>Nombre de commandes</li>
              </div>
              <li id="actionuser">Commandes</li>
              <li id="actionuser">Action</li>
            </ul>
          </div>

          {users?.map((user, index) => (
            <ul key={index} className="stores">
              <li className="ligne">
                <span>
                  {user.LastName} {user.FirstName}
                </span>
                <span>{user.email}</span>

                <span>{user.commandes.length}</span>
                <Link to={`/profile/${user._id}/commandes`}>
                  {" "}
                  <span className="orderIcon">
                    <PiPackageFill />
                  </span>
                </Link>
                <DeleteButon
                  handledelet={() => handleDelet(user._id)}
                ></DeleteButon>
              </li>
            </ul>
          ))}
        </div>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Users;
