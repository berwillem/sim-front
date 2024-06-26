/* eslint-disable react-hooks/exhaustive-deps */
import "./Products.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getProductById, updateProduct } from "../../services/productsServices";
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
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [categories, setCategories] = useState([]);
  const [familles, setFamilles] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  console.log(images, "images");

  const { productid } = useParams();
  useEffect(() => {
    getProductById(productid)
      .then(async (res) => {
        setProduct(res.data);
        setImages(res?.data?.images?.map((image) => image));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [productid]);
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
      titre: product?.title,
      gamme: product?.gamme,
      marque: product?.marque,
      famille: product?.famille,
      type: product?.type,
      categorie: product?.category,
      description: product?.description,
      prix: product?.price,
      images: "",
    },
  });
  const [activeImage, setActiveImage] = useState(0)
  const onSubmit = (data) => {
    const form = new FormData();
    form.append("famille", selectedFamille?._id);
    form.append("categorie", selectedCategorie?._id);
    form.append("type", selectedType?._id);
    images.forEach((image) => form.append("images", image.file||image));
    form.append("titleen", data.titleen);
    console.log(form.getAll("images"));
    form.append("titlefr", data.titlefr);
    form.append("prix", data.prix);
    form.append("marque", data.marque);
    form.append("gamme", data.gamme);
    form.append("description", data.description);

    console.log(form.getAll("images"))
    
    updateProduct(productid, form)
      .then((res) => {
        toast.success(res.data?.message);
        navigate("/admin/products");
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
        <button className="delete-image-button" onClick={() => setImages((state)=>state.filter((_,index)=>(index!==activeImage)))}>Delete</button>
        <SwiperProduct
          onImageChange={setActiveImage}
          previews={
            images.length !== 0
              ? images.map((img) => (img.url ? img.url : img))
              : [Placeholder]
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
            <ImageUpload />{" "}
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
                      <div className="hadtmekhriga labelSignUphalfinput" id="">
                        <input
                          type="text"
                          id=""
                          placeholder="Titre Aglais"
                          {...register("titleen")}
                          defaultValue={product?.titleen}
                        />
                      </div>
                    </div>
                    <div className="labelSignUphalf">
                      <div className="labelSignUphalfinput">
                        <input
                          type="text"
                          id=""
                          placeholder="Title Francais"
                          {...register("titlefr")}
                          defaultValue={product?.titlefr}
                        />
                      </div>

                      <div className="labelSignUphalfinput">
                        <input
                          type="text"
                          id=""
                          placeholder="Prix"
                          {...register("prix")}
                          defaultValue={product?.price}
                        />
                      </div>
                    </div>
                    <div className="labelSignUphalf">
                      <div className="labelSignUphalfinput">
                        <input
                          type="text"
                          id=""
                          placeholder="Marque"
                          {...register("marque")}
                          defaultValue={product?.marque}
                        />
                      </div>
                      <div className="labelSignUphalfinput">
                        <input
                          type="text"
                          id=""
                          placeholder="Gamme"
                          {...register("gamme")}
                          defaultValue={product?.gamme}
                        />
                      </div>
                    </div>
                    <div className="labelSignUphalf">
                      <textarea
                        name=""
                        className="descriptioncontact"
                        placeholder="Description"
                        {...register("description")}
                        defaultValue={product?.description}
                      ></textarea>
                    </div>
                  </div>
                  <div className="forlabeladd">
                    <button type="submit" className="btnred">
                      Edit product
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

export default EditProduct;

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
