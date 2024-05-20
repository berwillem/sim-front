import { useEffect, useState } from "react";
import "./AddParametre.css";
import {
  createCategory,
  getAllFamilles,
} from "../../services/parametresServices";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({ title, famille: selectedFamille })
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Category created successfully",
          icon: "success",
        });
        setTitle("");
        setSelectedFamille("");
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
        setFamilles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="add-parametre">
      <form onSubmit={handleSubmit}>
        <h1>Ajouter une Catégorie</h1>
        <input
          type="text"
          required
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={selectedFamille}
          onChange={(e) => setSelectedFamille(e.target.value)}
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
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default AddCategory;
