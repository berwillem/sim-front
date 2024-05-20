/* eslint-disable react-hooks/exhaustive-deps */
import "./Products.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
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

const schema = yup.object().shape({
  Marque: yup.string().required("Marque est requis"),
  Gamme: yup.string().required("Gamme est requis"),
  Famille: yup.string().required("Famille est requis"),
  Type: yup.string().required("Type est requis"),
  image: yup.object().shape({
    attachment: yup.mixed(),
  }),
  Categorie: yup.string().required("Categorie est requis"),
  description: yup.string().required("Description est requis"),
  price: yup.number().required("Prix est requis"),
  title: yup.string().required("Titre est requis"),
});

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [familles, setFamilles] = useState([]);
  const [types, setTypes] = useState([]);
  console.log(familles, "familles");
  const fetchCategories = (page) => {
    getAllCategories(page)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const fetchFamilles = (page) => {
    getAllFamilles(page)
      .then((res) => {
        setFamilles(res.data);
      })
      .catch((error) => {
        console.error("Error fetching familles:", error);
      });
  };
  const fetchTypes = (page) => {
    getAllTypes(page)
      .then((res) => {
        setTypes(res.data);
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
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  // register function :
  const onSubmit = (data) => {
    createProduct(data);
    console
      .log(data + " " + file)
      .then((res) => {
        toast.success(res.data?.message);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  const [file, setFile] = useState([]);

  function ImageUpload() {
    function handleChange(e) {
      setFile([...file, window.URL.createObjectURL(e.target.files[0])]);
    }

    return (
      <div className="App">
        <div className="Appplus">
          <h2>Add Image</h2>
          <label htmlFor="inputfileimage" className="inputfilecircle">
            <CiCirclePlus size={50} className="pluscircle" />
          </label>
        </div>

        <input type="file" id="inputfileimage" onChange={handleChange} />

        <SwiperProduct
          previews={file.length != 0 ? file : [Placeholder]}
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
                        options={
                          familles
                            ? familles.map((famille) => famille.title)
                            : []
                        }
                      ></ComboBox>
                      <ComboBox
                        label="Categorie"
                        options={
                          categories
                            ? categories.map((categorie) => categorie.title)
                            : []
                        }
                      ></ComboBox>
                    </div>
                    <div className="labelSignUphalf">
                      <div className="hadtmekhriga">
                        <ComboBox
                          label="Type"
                          options={types ? types.map((type) => type.title) : []}
                        ></ComboBox>
                      </div>
                      <div className="hadtmekhriga labelSignUphalfinput" id="">
                        <input
                          type="text"
                          id=""
                          placeholder="Titre"
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

const ComboBox = ({ label, options }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
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
