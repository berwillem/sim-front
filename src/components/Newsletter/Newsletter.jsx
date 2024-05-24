import "./Newsletter.css";
import Newpng from "../../assets/newspng.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createNewsletter } from "../../services/Newsletterservices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function Newsletter() {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    createNewsletter(data)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          icon: "success",
        });

        reset();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err);
      });
  };

  return (
    <div className="newslettercontainer">
      <div className="newsletter">
        <div className="newslettertop">
          <img src={Newpng} alt="" />
          <div className="newslettertext">
            <h1>Subscribe to our newsletter</h1>
            <p>Get our latest news and updates in your inbox</p>
          </div>
        </div>
        <form className="newsletterbottom" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
