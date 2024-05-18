import { Link } from "react-router-dom";
import "./Addbutton.css";
export default function Addbutton({ title, navigate }) {
  return (
    <>
      <Link to={navigate} type="button" className="button">
        <h1 className="button__text">{title}</h1>
        <span className="button__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
            height="24"
            fill="none"
            className="svg"
          >
            <line y2="19" y1="5" x2="12" x1="12"></line>
            <line y2="12" y1="12" x2="19" x1="5"></line>
          </svg>
        </span>
      </Link>
    </>
  );
}
