import { Link, useParams } from "react-router-dom";
import "./MiniNav.css";
import { FaRegUser } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { GrUpgrade } from "react-icons/gr";

const MiniNav = () => {
  const { userId } = useParams();

  return (
    <>
      <div className="mini-nav">
        <ul className="mini-nav-ul">
          <Link to={`/profile/${userId}`}>
            <li>
              Profile <FaRegUser />
            </li>
          </Link>
          <Link to={`/profile/${userId}/commandes`}>
            <li>
              Commandes <GrDeliver />
            </li>
          </Link>
          <Link to={`/profile/${userId}/levels`}>
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
