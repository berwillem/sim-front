/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { BsBorderStyle } from "react-icons/bs";

import "./Products.css";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  getTotalUserCount,
  deleteUser,
} from "../../services/usersServices";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const fetchUsers = (page) => {
    getAllUsers(page)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

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
  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard
            icon={<BsBorderStyle />}
            title={"Products"}
            // stat={totalUserCount}
          />
        </div>
        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne">
              <div className="info-stat">
                <li>title</li>
                <li>price</li>
                <li>desc.</li>
                <li>image</li>
                <li>marque</li>
                <li>gamme</li>
                <li>category</li>
              </div>
              <li>action</li>
            </ul>
          </div>

          {users?.map((user, index) => (
            <ul key={index} className="stores">
              <li className="ligne">
                <span>{user._id}</span>
                <span>
                  {user.LastName} {user.FirstName}
                </span>
                <span>{user.email}</span>
                <DeleteButon
                  handledelet={() => handleDelet(user._id)}
                ></DeleteButon>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
