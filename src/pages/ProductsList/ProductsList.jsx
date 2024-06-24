import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./ProductsList.css";
import { PiKeyReturnLight } from "react-icons/pi";
import { getProductsByCategory } from "../../services/productsServices";
import { Link, useParams } from "react-router-dom";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getAllTypes } from "../../services/parametresServices";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";


const ProductsList = () => {
  const { CategoryId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [data, setData] = useState(null); // State to hold selected product data

  // Fetch types and products on component mount
  useEffect(() => {
    fetchTypes();
    fetchProducts();
  }, [CategoryId]); // Fetch products whenever CategoryId changes

  // Function to fetch types from backend
  const fetchTypes = () => {
    getAllTypes()
      .then((res) => {
        setTypes(res.data.types);
      })
      .catch((error) => {
        console.error("Error fetching types:", error);
      });
  };

  // Function to fetch products based on category and selected type
  const fetchProducts = () => {
    getProductsByCategory(CategoryId, selectedType)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  // Handle change in selected type
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setFiltersApplied(true); // Set filter applied flag
  };

  // Handle clearing filters
  const clearFilters = () => {
    setSelectedType("");
    setFiltersApplied(false);
    fetchProducts(); // Fetch products without filters
  };

  // Handle click on product item
  const handleClick = (item) => {
    setData(item); // Set the selected product data
    setIsMenuOpen(true); // Open the menu or modal for detailed view
  };

  // JSX rendering
  return (
    <>
      <Navbar />

      <div className="famille-header-final">
        <div className="gobackproduct-final">
          <Link to="/products">
            <PiKeyReturnLight size={30} />
            Products
          </Link>
        </div>
        <div className="familycont-final">
          <h1>
            {products.length < 1
              ? "aucun produit disponible"
              : "Produits disponibles"}
          </h1>
        </div>
      </div>
      {types.length > 0 && (
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                value={selectedType}
                onChange={handleTypeChange}
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
          )}
          {filtersApplied && (
            <Button variant="contained" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
      <div className="productslist-final">
        {isMenuOpen && data && (
          <ProductPreview product={data} functio={() => setIsMenuOpen(false)} />
        )}
        <div className="gridfamille-final">

          {products?.map((item) => {
            return (
              <>
                <div key={item._id} className="productitempreview-final">
                  
                 <LazyLoadImage src={item.images[0]}
             
                  placeholder={<span className="loading"><p>Loading ...</p></span>}
                  alt="item preview-final"
                 
                 />
                
                  <h1>{item.title}</h1>
                  <h2>{item.price} DA</h2>
                  <h3
                    onClick={() => {
                      handleClick();
                      setData(item);
                    }}
                  >
                    Achat{" "}
                  </h3>
                </div>
              </>
            );
          })}

        </div>
      </div>
    </>
  );
};

export default ProductsList;
