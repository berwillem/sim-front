/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { FaUsers } from "react-icons/fa6";
import "./Users.css";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  getTotalUserCount,
  deleteUser,
  getAllpendingUsers,
  validateAttribution,
  AddCodeClient,
} from "../../services/usersServices";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";
import Pagination from "@mui/material/Pagination";
import { PiPackageFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TextField } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [clientCode, setClientCode] = useState("");
  const [clientCodes, setClientCodes] = useState({});

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
  const fetchPendingUsers = () => {
    getAllpendingUsers()
      .then((res) => {
        setPendingUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching pending users:", error);
      });
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);
  const validateAttributionUser = (userId) => {
    validateAttribution(userId, true).then(() => {
      fetchPendingUsers();
    });
  };
  const handleDeletetype = (userId) => {
    validateAttribution(userId, false).then(() => {
      fetchPendingUsers();
    });
  };
  const handleAddCodeClient = (userId, codeClient) => {
    AddCodeClient(userId, codeClient)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: `code client add succefuly : ${codeClient}`,
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Failed to update user type:", error);
        Swal.fire({
          title: "failed!",
          text: error.response.data.error,
          icon: "error",
        });
      });
  };

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
  useEffect(() => {
    fetchPendingUsers();
  }, []);
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
        {pendingUsers.length > 0 && (
          <>
            <h1 style={{ textAlign: "left", width: "96%" }}>
              Utilisateur en attente de validation du compte :
            </h1>
            <div className="table-stat">
              <div className="titre-stat">
                <ul className="ligne" id="ligneuser">
                  <div
                    className="info-stat"
                    id="info-statuser"
                    style={{ width: "100%", padding: "0px 50px 0 40px" }}
                  >
                    <li>Nom complet</li>
                    <li>Téléphone</li>
                    <li>RC</li>
                    <li>Adresse</li>
                    <li>Entresprise</li>

                    <li style={{ textAlign: "right", width: "130px" }}>Type</li>
                    <li>Action</li>
                  </div>
                </ul>
              </div>

              {pendingUsers?.map((user, index) => (
                <ul key={index} className="stores">
                  <li className="ligne">
                    <span>
                      {user.LastName} {user.FirstName}
                    </span>
                    <span>{user.phoneNumber}</span>
                    <span>{user.pendingRC}</span>
                    <span>{user.pendingAdresse}</span>
                    <span>{user.pendingEntreprise}</span>
                    <span>{user.pendingType}</span>
                    <span
                      style={{
                        justifyContent: "space-around",
                        width: "100px",
                        marginRight: "35px",
                      }}
                    >
                      <FaCheck
                        color="green"
                        style={{ cursor: "pointer" }}
                        onClick={() => validateAttributionUser(user._id)}
                      />
                      <FaTimes
                        color="red"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeletetype(user._id)}
                      />
                    </span>
                  </li>
                </ul>
              ))}
            </div>
          </>
        )}
        {pendingUsers.length > 0 && (
          <h1 style={{ width: "96%" }}>Tous les utilisateurs :</h1>
        )}
        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne" id="ligneuser">
              <div
                className="info-stat"
                id="info-statuser"
                style={{ width: "86%" }}
              >
                <li style={{ marginLeft: "0px", width: "120px" }}>
                  Code client
                </li>
                <li style={{ width: "120px" }}>Nom complet</li>
                <li>Type</li>
                <li>Email</li>
                <li>Téléphone</li>
                <li style={{ width: "130px" }}>Nombre de commandes</li>
              </div>
              <li
                id="actionuser"
                style={{
                  width: "7%",
                  paddingLeft: "0px",
                  paddingRight: "15px",
                }}
              >
                Commandes
              </li>
              <li
                id="actionuser"
                style={{
                  width: "5%",
                  paddingLeft: "0px",
                  paddingRight: "22px",
                }}
              >
                Action
              </li>
            </ul>
          </div>

          {users?.map((user, index) => (
            <ul key={index} className="stores">
              <li className="ligne">
                <span style={{ position: "relative", width: "160px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Code Client"
                    variant="outlined"
                    defaultValue={user.code}
                    onChange={(e) =>
                      setClientCodes((prev) => ({
                        ...prev,
                        [user._id]: e.target.value,
                      }))
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleAddCodeClient(user._id, clientCodes[user._id]);
                        event.preventDefault();
                      }
                    }}
                  />
                  {clientCodes[user._id] && (
                    <FaCheck
                      onClick={() =>
                        handleAddCodeClient(user._id, clientCodes[user._id])
                      }
                      color="green"
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "10px",
                      }}
                    />
                  )}

                  {clientCode && (
                    <FaCheck
                      onClick={() => handleAddCodeClient(user._id, clientCode)}
                      color="green"
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "10px",
                      }}
                    />
                  )}
                </span>
                <span>
                  {user.LastName} {user.FirstName}
                </span>
                <span>{user.type}</span>
                <span>{user.email}</span>
                <span>{user.phoneNumber}</span>
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
