/* eslint-disable react-hooks/exhaustive-deps */
import "./Products.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createProduct } from "../../services/productsServices";
import SwiperProduct from "../../components/SwiperAddProducts/SwiperProduct";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import Placeholder from "../../assets/svg/Placeholder.svg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  getAllCategories,
  getAllFamilles,
  getAllTypes,
} from "../../services/parametresServices";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [familles, setFamilles] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data.categories);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const fetchFamilles = () => {
    getAllFamilles()
      .then((res) => {
        setFamilles(res.data.familles);
      })
      .catch((error) => {
        console.error("Error fetching familles:", error);
      });
  };
  const fetchTypes = () => {
    getAllTypes()
      .then((res) => {
        setTypes(res.data.types);
      })
      .catch((error) => {
        console.error("Error fetching type:", error);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchFamilles();
    fetchTypes();
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      Titre: "",
      Titre2: "",
      Gamme: "",
      Marque: "",
      Famille: "",
      Type: "",
      Categorie: "",
      Description: "",
      Prix: "",
      images: [],
    },
  });

  const onSubmit = (data) => {
    data.Famille = selectedFamille?._id;
    data.Categorie = selectedCategorie?._id;
    data.Type = selectedType?._id;
    data.images = images;
    createProduct(data)
      .then((res) => {
        toast.success(res.data?.message);
        navigate("/admin/products/all");
      })
      .catch((err) => console.log(err));
  };

  function ImageUpload() {
    function handleChange(e) {
      const fileList = Array.from(e.target.files);
      setImages((prevImages) => [
        ...prevImages,
        ...fileList.map((file) => ({
          file,
          url: window.URL.createObjectURL(file),
        })),
      ]);
    }

    return (
      <div className="App">
        <div className="Appplus">
          <h2>Add Image</h2>
          <label htmlFor="inputfileimage" className="inputfilecircle">
            <CiCirclePlus size={50} className="pluscircle" />
          </label>
        </div>

        <input
          type="file"
          id="inputfileimage"
          onChange={handleChange}
          multiple
        />

        <SwiperProduct
          previews={
            images.length !== 0 ? images.map((img) => img.url) : [Placeholder]
          }
        ></SwiperProduct>
      </div>
    );
  }

  return (
    <>
      <div className="admin-stat">
        <div className="fortable-stat">
          <div className="table-stat" id="table-statadd">
            <ImageUpload />

            <div className="titre-stat">
              <div className="ligne">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="forlabelsignin">
                    <div className="labelSignUphalf">
                      <ComboBox
                        label="Famille"
                        options={familles}
                        value={selectedFamille}
                        onChange={setSelectedFamille}
                      />
                      <ComboBox
                        label="Categorie"
                        options={categories}
                        value={selectedCategorie}
                        onChange={setSelectedCategorie}
                      />
                    </div>
                    <div className="labelSignUphalf">
                      <div className="hadtmekhriga">
                        <ComboBox
                          label="Type"
                          options={types}
                          value={selectedType}
                          onChange={setSelectedType}
                        />
                      </div>
                        {/* titre fr */}
                      <div className="hadtmekhriga labelSignUphalfinput" id="">
                        <input
                          type="text"
                          id=""
                          placeholder="Titre francais"
                          {...register("Titre")}
                        />
                      </div>
                    </div>
                    <div className="labelSignUphalf">
                      <div className="labelSignUphalfinput">
                        <input
                          type="text"
                          id=""
                          placeholder="Gamme"
                          {...register("Gamme")}
                        />
                      </div>

                      <div className="labelSignUphalfinput">
                        <input
                          type="text"
                          id=""
                          placeholder="Prix"
                          {...register("Prix")}
                        />
                      </div>
                    </div>
                    <div className="labelSignUphalfinput labelSignUphalfinputspecial ">
                      <input
                        type="text"
                        id=""
                        placeholder="Marque"
                        {...register("Marque")}
                      />
                    </div>
                    {/* titre anglais */}
                    <div className="hadtmekhriga labelSignUphalfinput" id="">
                      <input
                        type="text"
                        id=""
                        placeholder="Titre anglais"
                        {...register("Titre2")}
                      />
                    </div> 
                    <div className="labelSignUphalf">
                      <textarea
                        name=""
                        className="descriptioncontact"
                        placeholder="Description"
                        {...register("Description")}
                      ></textarea>
                    </div>
                  </div>
                  <div className="forlabeladd">
                    <button type="submit" className="btnred">
                      Continuer
                    </button>
                  </div>
                  <div className="text-center"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

const ComboBox = ({ label, options, value, onChange }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.titlefr}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label={label} />}
      className="muiautocompleter"
      slotProps={{
        paper: {
          sx: {
            "& .MuiAutocomplete-option": {
              width: "100%",
            },
          },
        },
      }}
    />
  );
};
