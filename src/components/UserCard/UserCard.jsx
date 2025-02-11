import "./UserCard.css";
import { useEffect, useState } from "react";
import { getUserById, getUserLevelInfos } from "../../services/usersServices";
import { useParams } from "react-router-dom";
import bronze from "../../assets/medaille.png";
import silver from "../../assets/badge.png";
import gold from "../../assets/coupe-dor.png";
import diamond from "../../assets/diamant.png";
import { MdEmail } from "react-icons/md";
import { GrUpgrade } from "react-icons/gr";
import LevelBar from "../LevelBar/LevelBar.jsx";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt } from "react-icons/fa";

const UserCard = () => {
  const [user, setUser] = useState({});
  const { t } = useTranslation();
  const { userId } = useParams();
  useEffect(() => {
    getUserById(userId).then((res) => setUser(res.data));
  }, []);

  const [levelData, setLeveldata] = useState();
  // const getUserLevelClass = (levelName) => {
  //   switch (levelName) {
  //     case "bronze":
  //       return "bronze";
  //     case "silver":
  //       return "silver";
  //     case "gold":
  //       return "gold";
  //     case "diamond":
  //       return "diamond";
  //     default:
  //       return "";
  //   }
  // };
  useEffect(() => {
    getUserLevelInfos(userId)
      .then((res) => setLeveldata(res.data.level))
      .catch(console.log("error"));
  }, []);

  return (
    <>
      <div className="user-card-container">
        <div className="user-card">
          <div className="user-info">
            <div className="user-lign t12">
              <img
                src={
                  user.level?.name === "bronze"
                    ? bronze
                    : user.level?.name === "silver"
                    ? silver
                    : user.level?.name === "gold"
                    ? gold
                    : diamond
                }
                alt=""
                className="medaille"
              />
              <h2>
                {user && user.FirstName && user.LastName
                  ? user.LastName + " " + user.FirstName
                  : ""}
              </h2>
            </div>{" "}
            <div className="user-lign">
              <MdEmail
                size={50}
                style={{ marginRight: "15px", marginLeft: "2px" }}
              />{" "}
              <span style={{ fontWeight: "bold", marginRight: "8px" }}>
                E-mail:
              </span>
              <span>{user && user.email ? user.email : ""}</span>
            </div>
            <div className="user-lign">
              <FaPhoneAlt
                size={50}
                style={{ marginRight: "15px", marginLeft: "2px" }}
              />{" "}
              <span style={{ fontWeight: "bold", marginRight: "8px" }}>
                {t("phonenumber")}:
              </span>
              <span>{user && user.phoneNumber ? user.phoneNumber : ""}</span>
            </div>
            <div className="user-lign">
              <GrUpgrade
                size={50}
                style={{ marginRight: "15px", marginLeft: "2px" }}
              />{" "}
              <span style={{ fontWeight: "bold", marginRight: "8px" }}>
                {" "}
                {t("level")} :
              </span>{" "}
              <span> {user.level?.name.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="level-bar22">
          <LevelBar level={levelData} />
          <span>{levelData?.points.toFixed(0)} points</span>
        </div>
      </div>
    </>
  );
};

export default UserCard;
