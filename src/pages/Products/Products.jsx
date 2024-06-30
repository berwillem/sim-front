import { Helmet } from "react-helmet";
import Cards from "../../components/Cards/Cards";
import Navbar from "../../components/Navbar/Navbar";
import "./Products.css";

export default function Products() {
  return (
    <>
      <Helmet>
            <title>Product Familly</title>
         
        </Helmet>
      <Navbar />
      <Cards />
    </>
  );
}
