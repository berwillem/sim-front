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
} from "../../services/parametresServices";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // test
  const handleFamilleChange = (newFamille) => {
    setSelectedFamille(newFamille);
    setSelectedCategorie(null);
    setSelectedType(null);
  };
  console.log(selectedFamille);

  const handleCategorieChange = (newCategorie) => {
    setSelectedCategorie(newCategorie);
    setSelectedType(null);
  };
  //test
  const fetchCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data.categories);
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

  useEffect(() => {
    fetchCategories();
    fetchFamilles();
  }, []);

  const formatPrice = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Adds spaces every 3 digits
  };

  const cleanPrice = (value) => {
    if (!value) return "";
    return value.toString().replace(",", "."); // Replaces comma with a dot for decimal values
  };

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
      PrixRevendeur: "",
      PrixGrossiste: "",
      images: [],
    },
  });

  const onSubmit = (data) => {
    data.Famille = selectedFamille?._id;
    data.Categorie = selectedCategorie?._id;
    data.Type = selectedType?._id;
    data.images = images;
    // Format prices
    data.Prix = cleanPrice(data.Prix);
    data.PrixRevendeur = cleanPrice(data.PrixRevendeur);
    data.PrixGrossiste = cleanPrice(data.PrixGrossiste);

    console.log(data, "DAAAAAAAAAAAAAAAAAAAA");
    setLoading(true);
    createProduct(data)
      .then((res) => {
        setLoading(false);
        toast.success(res.data?.message);
        navigate("/admin/products");
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      });
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
          <div
            className="table-stat"
            id="table-statadd"
            style={{ border: "2px solid #e0e0e0" }}
          >
            <ImageUpload />

            <div className="titre-stat" style={{ backgroundColor: "unset" }}>
              <div className="ligne">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="forlabelsignin">
                    <div className="labelSignUphalf">
                      <ComboBox
                        label="Famille"
                        options={familles}
                        value={selectedFamille}
                        onChange={handleFamilleChange}
                      />

                      <ComboBox
                        label="Categorie"
                        options={
                          selectedFamille?.categories
                            ? selectedFamille?.categories
                            : []
                        }
                        value={selectedCategorie}
                        onChange={handleCategorieChange}
                      />
                    </div>
                    <div className="labelSignUphalf">
                      <div className="hadtmekhriga">
                        <ComboBox
                          label="Type"
                          options={
                            categories.find(
                              (cat) => cat?._id === selectedCategorie?._id
                            )?.types
                              ? categories.find(
                                  (cat) => cat?._id === selectedCategorie?._id
                                )?.types
                              : []
                          }
                          value={selectedType}
                          onChange={setSelectedType}
                        />
                      </div>
                      {/* titre fr */}
                      <div className="hadtmekhriga labelSignUphalfinput" id="">
                        <input
                          required
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
                          required
                          type="text"
                          id=""
                          placeholder="Titre anglais"
                          {...register("Titre2")}
                        />
                      </div>

                      <div className="labelSignUphalfinput">
                        {selectedFamille?.titlefr !== "FIXATION" ? (
                          <>
                            <input
                              required
                              type="text"
                              id=""
                              placeholder="Prix "
                              {...register("Prix")}
                              onChange={(e) => {
                                e.target.value = formatPrice(
                                  e.target.value.replace(/\s/g, "")
                                );
                              }}
                            />
                          </>
                        ) : (
                          <input
                            type="text"
                            id=""
                            placeholder="Sur devis"
                            {...register("Prix")}
                            disabled
                          />
                        )}
                      </div>
                    </div>

                    {selectedFamille?.titlefr !== "FIXATION" && (
                      <div className="labelSignUphalf">
                        <div className="labelSignUphalfinput">
                          <input
                            required
                            type="text"
                            id=""
                            placeholder="Prix Revendeur/Société"
                            {...register("PrixRevendeur")}
                            onChange={(e) => {
                              e.target.value = formatPrice(
                                e.target.value.replace(/\s/g, "")
                              );
                            }}
                          />{" "}
                        </div>
                        <div className="labelSignUphalfinput">
                          <input
                            required
                            type="text"
                            id=""
                            placeholder="Prix Grossiste"
                            {...register("PrixGrossiste")}
                            onChange={(e) => {
                              e.target.value = formatPrice(
                                e.target.value.replace(/\s/g, "")
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="labelSignUphalf  ">
                      <div className="labelSignUphalfinput">
                        <input
                          required
                          type="text"
                          id=""
                          placeholder="Marque"
                          {...register("Marque")}
                        />
                      </div>
                      <div className="labelSignUphalfinput">
                        <input
                          required
                          type="text"
                          id=""
                          placeholder="Gamme"
                          {...register("Gamme")}
                        />
                      </div>
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
                    <button type="submit" className="btnred" disabled={loading}>
                      {loading ? (
                        <CircularProgress size={25} color="inherit" />
                      ) : (
                        "Ajouter"
                      )}
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
