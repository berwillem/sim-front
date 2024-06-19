import "./UserCard.css";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/usersServices";
import { useParams } from "react-router-dom";

const UserCard = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  useEffect(() => {
    getUserById(userId).then((res) => setUser(res.data));
  }, []);
  const getUserLevelClass = (levelName) => {
    switch (levelName) {
      case "bronze":
        return "bronze";
      case "silver":
        return "silver";
      case "gold":
        return "gold";
      case "diamond":
        return "diamond";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="user-card-container">
        <div className={`user-card ${getUserLevelClass(user.level?.name)}`}>
          <h2>
            {user && user.FirstName && user.LastName
              ? user.LastName + " " + user.FirstName
              : ""}
          </h2>
          <div className="user-info">
            <div className="info-user">
              <span>Email:</span>
              <span>{user && user.email ? user.email : ""}</span>
            </div>

            <div className="info-user">
              <span>level:</span> <span> {user.level?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
