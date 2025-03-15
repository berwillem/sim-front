/* eslint-disable react-hooks/exhaustive-deps */
import "./Para.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import {
  editCategory,
  getCategoryById,
} from "../../services/parametresServices";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const EditCategory = () => {
  const [category, setCategory] = useState({});
  const [image, setImage] = useState(null); // Single image as string or object
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryById(categoryId)
      .then((res) => {
        setCategory(res.data);
        setImage(res.data?.image); // Store the image URL
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, [categoryId]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      titlefr: category?.titlefr,
      titleen: category?.titleen,
      images: category?.image,
    },
  });

  useEffect(() => {
    reset({
      titlefr: category?.titlefr,
      titleen: category?.titleen,
      images: "",
    });
  }, [category, reset]);

  const onSubmit = (data) => {
    const form = new FormData();

    if (image?.file) {
      form.append("image", image.file); // Append new image file
    } else {
      form.append("image", image); // Keep existing image URL
    }

    form.append("titleen", data.titleen);
    form.append("titlefr", data.titlefr);

    setLoading(true);
    editCategory(categoryId, form)
      .then((res) => {
        toast.success(res.data?.message);
        navigate("/admin/parametres/categories");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  function ImageUpload() {
    function handleChange(e) {
      const file = e.target.files[0]; // Get the first selected file
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage({ file, preview: imageUrl }); // Store both file and preview URL
      }
    }

    return (
      <div className="App" style={{ justifyContent: "space-around" }}>
        <div className="Appplus">
          <h2>Add Image</h2>
          <label htmlFor="inputfileimage" className="inputfilecircle">
            <CiCirclePlus size={50} className="pluscircle" />
          </label>
        </div>

        <input type="file" id="inputfileimage" onChange={handleChange} />

        {image && (
          <div className="preview">
            <img
              src={image.preview || image}
              alt="Preview"
              className="preview-image"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="admin-stat">
        <div className="fortable-stat">
          <div className="table-stat" id="table-statadd">
            <ImageUpload />
            <div className="titre-stat" style={{ backgroundColor: "unset" }}>
              <div className="ligne">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="forlabelsignin">
                    <div className="labelSignUphalf">
                      <div className="labelSignUphalfinput">
                        <input
                          type="text"
                          placeholder="Title Francais"
                          {...register("titlefr")}
                          defaultValue={category?.titlefr}
                        />
                      </div>

                      <div className="labelSignUphalfinput">
                        <input
                          type="text"
                          placeholder="Title English"
                          {...register("titleen")}
                          defaultValue={category?.titleen}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="forlabeladd">
                    <button type="submit" className="btnred">
                      {loading ? (
                        <CircularProgress size={25} color="inherit" />
                      ) : (
                        "Edit category"
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

export default EditCategory;
