import { useNavigate } from "react-router-dom";
import "./CardSubsciptions.css";
import { attributeUser } from "../../services/usersServices";
import { useSelector } from "react-redux";
import { RiTeamFill } from "react-icons/ri";
import { BsPersonCheck } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import { MdOutlineWarehouse } from "react-icons/md";

export default function CardSubscriptions() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth?.user?._id);

  const handleClick = async (type) => {
    await attributeUser(userId, type)
      .then(() => {
        console.log(`User type updated to: ${type}`);
      })
      .catch((error) => {
        console.error("Failed to update user type:", error);
      });
    type === "particulier" ? navigate("/") : navigate("/pending-approval");
  };

  const data = [
    { id: 1, type: "particulier", icon: <RiTeamFill /> },
    { id: 2, type: "revendeur", icon: <BsPersonCheck /> },
    { id: 3, type: "entreprise", icon: <BiBuildings /> },
    { id: 4, type: "grossiste", icon: <MdOutlineWarehouse /> },
  ];

  return (
    <div className="cards-container">
      {data.map((item) => (
        <div
          className={`card-subscriptions`}
          key={item.id}
          onClick={() => handleClick(item.type)}
        >
          <div className="icon">{item.icon}</div>
          <div className="title">{item.type}</div>
        </div>
      ))}
    </div>
  );
}
