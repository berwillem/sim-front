/* eslint-disable react-hooks/exhaustive-deps */
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { BsBorderStyle } from "react-icons/bs";
import "./Products.css";
import { useEffect, useState } from "react";
import Addbutton from "../../components/AddButton/Addbutton";
import {
  deleteProduct,
  getAllProducts,
  getTotalProductsCount,
} from "../../services/productsServices";
import { Pagination as MuiPagination } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation } from "swiper/modules";
import { CiEdit } from "react-icons/ci";
import DeleteButon from "../../components/DeleteButton/DeleteButon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  console.log(products, "products");
  const navigate = useNavigate();
  const fetchProducts = (page) => {
    getAllProducts(page)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  useEffect(() => {
    fetchProducts(page);
  }, [page]);
  useEffect(() => {
    getTotalProductsCount().then((res) => {
      setTotalProductCount(res.data.count);
      console.log(res.data, "dataaaaaa");
    });
  }, [totalProductCount]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleDelet = (CommandeId) => {
    deleteProduct(CommandeId)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "order deleted succefuly",
          icon: "success",
        });
        fetchProducts();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };

  return (
    <>
      <div className="admin-stat">
        <div className="mini-cards">
          <AdminMiniCard
            icon={<BsBorderStyle />}
            title={"Products"}
            stat={totalProductCount}
          />
          <div className="foraddbutton">
            <Addbutton
              title={"Add Product"}
              navigate={"/admin/products/addproduct"}
            ></Addbutton>
          </div>
        </div>

     <div className="filter">
     <Grid container spacing={2} sx={{alignItems:"center"}}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Famille</InputLabel>
              <Select
                value={selectedFamille}
                onChange={(e) => setSelectedFamille(e.target.value)}
                label="Famille"
              >
                <MenuItem value="all">All</MenuItem>
                {familles.map((famille) => (
                  <MenuItem key={famille._id} value={famille._id}>
                    {famille.titlefr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.titlefr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Type</InputLabel>
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                label="Type"
              >
                <MenuItem value="all">All</MenuItem>
                {types.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.titlefr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
  <div className="btns">
  <Button
          variant="contained"
          color="primary"
          onClick={handleFilterApply}
          style={{  marginRight: "10px" ,backgroundColor:"red",height:"55px",fontSize:"13px"
          }}
        >
          Apply Filters
        </Button>
        {filtersApplied && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleFilterClear}
            style={{ color:"red",border:"red 1px solid",height:"55px",fontSize:"13px" }}
          >
            Clear Filters
          </Button>
        )}
  </div>
     </div>

        <div className="table-stat">
          <div className="titre-stat">
            <ul className="ligne">
              <div className="info-stat temporary">
                <li>title</li>
                <li>price</li>
                <li>desc.</li>
                <li>marque</li>
                <li>gamme</li>
              </div>
              <li>preview</li>
            </ul>
          </div>
          {products?.map((product, index) => (
            <ul key={index} className="stores">
              <div className="flex">
                <CiEdit
                  size={40}
                  onClick={() => navigate(`editproduct/${product._id}`)}
                />
                <DeleteButon
                  handledelet={() => handleDelet(product._id)}
                ></DeleteButon>
              </div>{" "}
              <Productitem product={product} />
            </ul>
          ))}
        </div>
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Users;

const Productitem = ({ product, index }) => {
  return (
    <li key={index} className="ligne">
      <span>
        <div>
          <div style={{ marginBottom: "7px" }}>
            {" "}
            Francais: {product?.titlefr}
          </div>
          <div> Anglais: {product?.titleen}</div>
        </div>
      </span>
      <span>{product?.price}</span>
      <span>{product?.description}</span>
      <span>{product?.marque}</span>
      <span>{product?.gamme}</span>
      <span>
        <Swiper
          grabCursor={true}
          effect={"creative"}
          navigation={true}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
            next: {
              shadow: true,
              translate: ["120%", 0, -500],
            },
          }}
          modules={[EffectCreative, Navigation]}
          loop={true}
          className="mySwiper2"
        >
          {product.images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img
                key={image}
                src={image}
                alt="store"
                className="store-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </span>
    </li>
  );
};
