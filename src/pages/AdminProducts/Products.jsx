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
import {
  getAllCategories,
  getAllFamilles,
} from "../../services/parametresServices";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

const Products = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [filtersApplied, setFiltersApplied] = useState(false);
  const navigate = useNavigate();

  console.log(products);
  const fetchProducts = (page) => {
    getAllProducts(
      page,
      selectedFamille._id,
      selectedCategory._id,
      selectedType._id
    )
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setFiltersApplied(true);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

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
    getTotalProductsCount().then((res) => {
      setTotalProductCount(res.data.count);
    });
  }, [totalProductCount, products]);

  useEffect(() => {
    fetchProducts(page);
    fetchCategories();
    fetchFamilles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleDelet = (productId) => {
    deleteProduct(productId)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Product deleted successfully",
          icon: "success",
        });
        fetchProducts(page);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterApply = () => {
    fetchProducts(page);
  };

  const handleFilterClear = () => {
    setSelectedFamille("");
    setSelectedCategory("");
    setSelectedType("");
    setFiltersApplied(false);
    fetchProducts(page);
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
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Famille</InputLabel>
                <Select
                  value={selectedFamille}
                  onChange={(e) => {
                    setSelectedFamille(e.target.value);
                  }}
                  label="Famille"
                >
                  <MenuItem value="all">All</MenuItem>
                  {familles.map((famille) => (
                    <MenuItem key={famille._id} value={famille}>
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
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                  label="Category"
                >
                  <MenuItem value="all">All</MenuItem>
                  {selectedFamille?.categories?.map((category) => (
                    <MenuItem key={category._id} value={category}>
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
                  {categories
                    .find((cat) => cat?._id === selectedCategory?._id)
                    ?.types.map((type) => (
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
              style={{
                marginRight: "10px",
                backgroundColor: "red",
                height: "55px",
                fontSize: "13px",
              }}
            >
              Apply Filters
            </Button>
            {filtersApplied && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleFilterClear}
                style={{
                  color: "red",
                  border: "red 1px solid",
                  height: "55px",
                  fontSize: "13px",
                }}
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
                <li>Title</li>
                <li>Price</li>
                <li>Desc.</li>
                <li>Marque</li>
                <li>Gamme</li>
              </div>
              <li>Preview</li>
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
          style={{ marginTop: "10px" }}
        />
      </div>
    </>
  );
};

export default Products;

const Productitem = ({ product, index }) => {
  return (
    <li key={index} className="ligne">
      <span> {product?.titlefr}</span>
      {product?.price ? (
        <span>
          Client {product?.price} DA <br />
          R/S {product?.priceRevendeur} DA
          <br />
          Grossiste {product?.priceGrossiste} DA
        </span>
      ) : (
        <span>Sur devis</span>
      )}
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
