import { useState } from "react";
import "./AddParametre.css";
import { createFamille } from "../../services/parametresServices";
import Swal from "sweetalert2";

const AddFamille = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createFamille({title})
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Famille created successfully",
          icon: "success",
        });
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

  return (
    <div className="add-parametre">
      <form onSubmit={handleSubmit}>
        <h1>Ajouter une Famille</h1>
        <input
          type="text"
          required
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default AddFamille;
