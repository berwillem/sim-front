/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { BsBorderStyle } from "react-icons/bs";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import "./Products.css";

const AddProduct = () => {
  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard icon={<BsBorderStyle />} title={"Add Product"} />
          <div className="foraddbutton"></div>
        </div>
        <div className="table-stat">
          <div className="titre-stat">
            <div className="ligne">
              <ImageUpload />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
