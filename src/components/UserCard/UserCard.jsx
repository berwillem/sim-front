import { useSelector } from "react-redux";
import "./UserCard.css";

const UserCard = () => {
  const user = useSelector((state) => state.auth?.user);
  console.log(user);

  return (
    <>
      <div className="user-card-container">
        <div className="user-card">
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
              <span>Number:</span> <span>0763636325</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
