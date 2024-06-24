import { Link } from "react-router-dom";
import "./Parametres.css";

const Parametres = () => {
  return (
    <>
      <div className="parametres-cards">
        <div className="parametres-card">
          <h1>Familles</h1>
          <button>
            <Link to="famille">Manage Familles</Link>
          </button>
        </div>
        <div className="parametres-card">
          <h1>Categories</h1>
          <button>
            <Link to="category">Manage Categories</Link>
          </button>
        </div>
        <div className="parametres-card">
          <h1>Types</h1>
          <button>
            <Link to="type">Manage Types</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Parametres;
