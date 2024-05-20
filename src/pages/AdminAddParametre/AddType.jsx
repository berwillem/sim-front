import { useEffect, useState } from "react";
import "./AddParametre.css";
import { createType, getAllFamilles } from "../../services/parametresServices";
import Swal from "sweetalert2";

const AddType = () => {
  const [title, setTitle] = useState("");
  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  console.log(familles + "familles");

  const handleSubmit = (e) => {
    e.preventDefault();
    createType({ title, category: selectedCategorie })
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Type created successfully",
          icon: "success",
        });
        setTitle("");
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
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={selectedFamille ? selectedFamille.id : ""}
          onChange={(e) => {
            const famille = familles.find((f) => f.id === e.target.value);
            setSelectedFamille(famille);
            setSelectedCategorie(""); // Reset category when family changes
          }}
          required
          className="parametre-select"
        >
          <option value="" disabled>
            Sélectionner une famille
          </option>
          {familles.map((famille) => (
            <option key={famille.id} value={famille.id}>
              {famille.title}
            </option>
          ))}
        </select>
        <select
          value={selectedCategorie}
          onChange={(e) => setSelectedCategorie(e.target.value)}
          required
          className="parametre-select"
          disabled={!selectedFamille}
        >
          <option value="" disabled>
            Sélectionner une catégorie
          </option>
          {selectedFamille?.categories?.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.title}
            </option>
          ))}
        </select>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default AddType;
