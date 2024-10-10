import { Link, useParams } from "react-router-dom";
import "./MiniNav.css";
import { FaRegUser } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { GrUpgrade } from "react-icons/gr";
import { getUserById, updateUserTour } from "../../services/usersServices";
import Joyride from "react-joyride";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const MiniNav = () => {
  const { userId } = useParams();
  const [tour, setTour] = useState(true);
  const { t } = useTranslation();
  const authState = useSelector((state) => state.auth);
  const steps = [
    {
      target: ".my-first-step",
      content: "Vous pouvez consultez vos information sur la page profile.",
      disableBeacon: true,
    },
    {
      target: ".my-second-step",
      content:
        "Vous pouvez voir vos commandes en cours et en attente sur la page commandes.",
    },
    {
      target: ".my-third-step",
      content:
        "Voir les niveaux que vous avez accomplis afin de bénifisser des réductions sur nos produits.",
    },
  ];
  useEffect(() => {
    if (authState.user.role === "admin") {
      setTour(true);
    } else {
      getUserById(userId).then((res) => setTour(res.data.tour));
    }
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
            if (data.status === "finished" && authState.user.role !== "admin") {
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
              {t("commandes")} <GrDeliver />
            </li>
          </Link>
          <Link to={`/profile/${userId}/levels`} className="my-third-step">
            <li>
              {t("levels")} <GrUpgrade />
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default MiniNav;
