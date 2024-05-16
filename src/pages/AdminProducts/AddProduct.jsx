/* eslint-disable react-hooks/exhaustive-deps */

import "./Products.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { createProduct } from "../../services/productsServices";
import SwiperProduct from "../../components/SwiperAddProducts/SwiperProduct";
import { useState } from "react";
const schema = yup.object().shape({
  Marque: yup.string().required("Marque est requis"),
  Gamme: yup.string().required("Gamme est requis"),
  Categorie: yup.string().required("Categorie est requis"),
  description: yup.string().required("Description est requis"),
  price: yup.number().required("Prix est requis"),
  title: yup.string().required("Titre est requis"),
});

const AddProduct = () => {
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
      console.log(file);
    }

    return (
      <div className="App">
        <h2>Add Image:</h2>
        <label htmlFor="inputfileimage"> here</label>
        <input type="file" id="inputfileimage" onChange={handleChange} />
        <SwiperProduct previews={file ? file : "heeyy"}></SwiperProduct>
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
                      <div>
                        <label htmlFor="FirstName">Gamme </label>
                        <input
                          type="text"
                          id="FirstName"
                          placeholder="Gamme"
                          {...register("Gamme")}
                        />
                      </div>
                      <div>
                        <label htmlFor="LastName">Marque </label>
                        <input
                          type="text"
                          id="LastName"
                          placeholder="Marque"
                          {...register("Marque")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="forlabelsignin">
                    <div className="labelSignUphalf">
                      <div>
                        <label htmlFor="FirstName">Categorie </label>
                        <input
                          type="text"
                          id="FirstName"
                          placeholder="Categorie"
                          {...register("Categorie")}
                        />
                      </div>
                      <div>
                        <label htmlFor="LastName">title </label>
                        <input
                          type="text"
                          id="LastName"
                          placeholder="title"
                          {...register("title")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="forlabelsignin">
                    <div className="labelSignUphalf">
                      <div>
                        <label htmlFor="FirstName">Description </label>
                        <input
                          type="text"
                          id="FirstName"
                          placeholder="Description"
                          {...register("Description")}
                        />
                      </div>
                      <div>
                        <label htmlFor="LastName">Marque </label>
                        <input
                          type="text"
                          id="LastName"
                          placeholder="Marque"
                          {...register("Marque")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="middivsignin">
                    <button type="submit">Continuer</button>
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
