import "./Newsletter.css";
import Newpng from "../../assets/newspng.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createNewsletter } from "../../services/Newsletterservices";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function Newsletter() {
  const { t } = useTranslation();
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
            <h1>{t("newsletterh1")}</h1>
            <p>{t("newsletterp")}</p>
          </div>
        </div>
        <form className="newsletterbottom" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder={t("newsletterpholder")}
            {...register("email")}
          />
          <button type="submit">{t("subscribe")}</button>
        </form>
      </div>
    </div>
  );
}
