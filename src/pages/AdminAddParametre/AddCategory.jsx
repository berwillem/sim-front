import { useEffect, useState } from "react";
import "./AddParametre.css";
import {
  createCategory,
  getAllFamilles,
} from "../../services/parametresServices";
import Swal from "sweetalert2";
import { CiCirclePlus } from "react-icons/ci";

const AddCategory = () => {
  const [titlefr, setTitlefr] = useState("");
  const [titleen, setTitleen] = useState("");
  const [familles, setFamilles] = useState([]);
  const [image, setImage] = useState(null);
  const [selectedFamille, setSelectedFamille] = useState("");
  const [file, setFile] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titlefr", titlefr);
    formData.append("titleen", titleen);
    formData.append("familleId", selectedFamille);
    if (image) {
      formData.append("image", image);
    }

    createCategory(formData)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Category created successfully",
          icon: "success",
        });
        setTitlefr("");
        setTitleen("");
        setSelectedFamille("");
        setFile("");
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
        <h1>Ajouter une Catégorie</h1>
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
          value={selectedFamille}
          onChange={(e) => setSelectedFamille(e.target.value)}
          required
          className="parametre-select"
        >
          <option value="" disabled>
            Sélectionner une famille
          </option>
          {familles.map((famille) => (
            <option key={famille._id} value={famille._id}>
              {famille.titleen}
            </option>
          ))}
        </select>
        <div className="Appplus31">
          <h2>Add Image</h2>
          <label htmlFor="inputfileimage" className="inputfilecircle">
            <CiCirclePlus size={50} className="pluscircle" />
          </label>
          <img src={file} alt="" className="imgpreviewcat" />
        </div>

        <input
          type="file"
          accept="image/*"
          id="inputfileimage"
          onChange={handleImageChange}
          required
          className="image-input"
        />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default AddCategory;
