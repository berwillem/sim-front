import "./SideCard.css";
import { Link } from "react-router-dom";

const SideCard = ({ Labels }) => {
  console.log(Labels);
  return (
    <>
      <ul className="side-button">
        {Labels.map((Label) => (
          <div key={Label.name}>
            <Link to={Label.link}>
              <li>
                <span>{Label.name}</span> {Label.icon}
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </>
  );
};

export default SideCard;
