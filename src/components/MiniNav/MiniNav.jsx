import { Link, useParams } from "react-router-dom";
import "./MiniNav.css";
import { FaRegUser } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { GrUpgrade } from "react-icons/gr";
import { getUserById, updateUserTour } from "../../services/usersServices";
import Joyride from "react-joyride";
import { useState, useEffect } from "react";
const MiniNav = () => {
  const { userId } = useParams();
  const [tour, setTour] = useState(true);
  const steps = [
    {
      target: ".my-first-step",
      content: "Vous pouvez consultez vos information sur la page profile.",
      disableBeacon: true,
    },
    {
      target: ".my-second-step",
      content: "Vous pouvez voir vos commandes en cours et en attente sur la page commandes.",
    },
    {
      target: ".my-third-step",
      content:
        "Voir les niveaux que vous avez accomplis afin de bénifisser des réductions sur nos produits.",
    },
  ];
  useEffect(() => {
    getUserById(userId).then((res) => setTour(res.data.tour));
  }, []);

  return (
    <>
      {!tour && (
        <Joyride
          steps={steps}
          continuous={true}
          disableCloseOnEsc={true}
          hideCloseButton={true}
          disableOverlayClose={true}
          disableScrolling={true}
          callback={(data) => {
            if (data.status === "finished") {
              updateUserTour(userId);
            }
          }}
        />
      )}

      <div className="mini-nav">
        <ul className="mini-nav-ul">
          <Link to={`/profile/${userId}`} className="my-first-step">
            <li>
              Profile <FaRegUser />
            </li>
          </Link>
          <Link to={`/profile/${userId}/commandes`} className="my-second-step">
            <li>
              Commandes <GrDeliver />
            </li>
          </Link>
          <Link to={`/profile/${userId}/levels`} className="my-third-step">
            <li>
              Levels <GrUpgrade />
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default MiniNav;
