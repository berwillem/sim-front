import { useEffect, useState } from "react";
import "./AddParametre.css";
import { createType, getAllFamilles } from "../../services/parametresServices";
import Swal from "sweetalert2";

const AddType = () => {
  const [titlefr, setTitlefr] = useState("");
  const [titleen, setTitleen] = useState("");
  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    createType({ titlefr, titleen, categoryId: selectedCategorie })
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Type created successfully",
          icon: "success",
        });
        setTitlefr("");
        setTitleen("");
        setSelectedFamille(null);
        setSelectedCategorie("");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };

  useEffect(() => {
    getAllFamilles()
      .then((res) => {
        setFamilles(res.data.familles);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="add-parametre">
      <form onSubmit={handleSubmit}>
        <h1>Ajouter un Type</h1>
        <input
          type="text"
          required
          placeholder="Titre en fr"
          value={titlefr}
          onChange={(e) => setTitlefr(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Titre en en"
          value={titleen}
          onChange={(e) => setTitleen(e.target.value)}
        />
        <select
          value={selectedFamille ? selectedFamille.titlefr : ""}
          onChange={(e) => {
            setSelectedFamille(
              familles.find((famille) => famille.titlefr === e.target.value)
            );
            setSelectedCategorie("");
          }}
          required
          className="parametre-select"
        >
          <option value="">Sélectionner une famille</option>
          {familles.map((famille) => (
            <option key={famille.id} value={famille.id}>
              {famille.titlefr}
            </option>
          ))}
        </select>
        <select
          value={selectedCategorie}
          onChange={(e) => {
            setSelectedCategorie(e.target.value);
          }}
          required
          className="parametre-select"
          disabled={!selectedFamille}
        >
          <option value="" disabled>
            Sélectionner une catégorie
          </option>
          {selectedFamille?.categories?.map((categorie) => (
            <option key={categorie._id} value={categorie._id}>
              {categorie.titlefr}
            </option>
          ))}
        </select>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default AddType;
