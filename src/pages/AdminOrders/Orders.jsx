import "./Orders.css";
/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { FaUsers } from "react-icons/fa6";
import { CiSquareCheck } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";
import { TbGitBranchDeleted } from "react-icons/tb";
import { useEffect, useState } from "react";
import { RiPassValidFill, RiPassValidLine } from "react-icons/ri";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";
import {
  deleteCommande,
  getAllCommandes,
  getTotalCommandesCount,
  getPendingCommandesCount,
  getValidCommandesCount,
  updateCommande,
} from "../../services/commandeservices";
import Pagination from "@mui/material/Pagination";
import moment from "moment";

import { LuUserX } from "react-icons/lu";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";



const Orders = () => {
  const [Commandes, setCommandes] = useState([]);
  const [TotalCommandesCount, setTotalCommandesCount] = useState(0);
  const [validCommandesCount, setValidCommandesCount] = useState(0);
  const [pendingCommandesCount, setPendingCommandesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("");
  console.log(totalPages, "commandes");
  
  const fetchCommandes = (page, filter) => {
    getAllCommandes(page, filter)
      .then((res) => {
        console.log(res.data.commandes)
        setCommandes(res.data.commandes);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchCommandes(value, filter);
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
  const updateOrder = (CommandeId) => {
    updateCommande(CommandeId)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "commande updated succefuly",
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
    fetchCommandes(page, filter);
  }, [page, filter]);
  useEffect(() => {
    getTotalCommandesCount().then((res) => {
      setTotalCommandesCount(res.data.count);
    });
  }, [handleDelet]);

  useEffect(() => {
    getPendingCommandesCount().then((res) => {
      setPendingCommandesCount(res.data.count);
    });
  }, [handleDelet]);

  useEffect(() => {
    getValidCommandesCount().then((res) => {
      setValidCommandesCount(res.data.count);
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
            stat={validCommandesCount}
          />
          <AdminMiniCard
            icon={<IoIosTimer />}
            title={"Commandes en attente"}
            stat={pendingCommandesCount}
          />
          <AdminMiniCard
            icon={<TbGitBranchDeleted />}
            title={"Commandes supprimées"}
            stat={"0"}
          />
        </div>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter}
            onChange={(e) => {
              console.log(e.target.value);
              setFilter(e.target.value);
              fetchCommandes(page, e.target.value);
            }}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="true">Valid</MenuItem>
            <MenuItem value="false">Not Valid</MenuItem>
          </Select>
        </FormControl>

        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne commandeslist">
              <div className="info-stat ">
                <li>Product</li>
                <li>Fullname</li>
                <li>Number</li>
                <li>Quantity</li>
                <li>Total Price</li>
                <li>createdAt</li>
                <li>Status</li>
              </div>
              <li>action</li>
            </ul>
          </div>

          {Commandes?.map((Commande, index) => {
            // console.log(Commande, "commande");
            return (
              <ul
                key={index}
                className={
                  Commande.isValid ? "stores backgreen" : "stores backred"
                }
              >
                <li className="ligne">
                  <span>{Commande.product?.titlefr}</span>{" "}
                  <span>

                    {Commande.user ? (
                      Commande.user.FirstName + " " + Commande.user.LastName
                    ) : (
                      <div className="flex">
                        {" "}
                        {Commande.client} <LuUserX />
                      </div>
                    )}
                  </span>
                  <span>{Commande.phoneNumber}</span>

                  <span>{Commande.quantity}</span>
                  <span>{Commande.totalPrice}</span>
                  <span>
                    {moment(Commande.createdAt).format("DD MMM YYYY")}
                  </span>
                  <span>
                    {Commande.isValid ? (
                      <>
                        {"valide  "}
                        {""}
                        <RiPassValidLine
                          size={30}
                          onClick={() => updateOrder(Commande._id)}
                          color="green"
                        />
                      </>
                    ) : (
                      <>
                        {" non valide  "}{" "}
                        <RiPassValidFill
                          size={30}
                          onClick={() => updateOrder(Commande._id)}
                          color="red"
                        />
                      </>
                    )}
                  </span>
                  <DeleteButon
                    handledelet={() => handleDelet(Commande._id)}
                  ></DeleteButon>
                </li>
              </ul>
            );
          })}
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

export default Orders;
