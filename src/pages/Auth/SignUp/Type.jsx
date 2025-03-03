import { useParams } from "react-router-dom";
import "./SignUp.css";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { attributeUser } from "../../../services/usersServices";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

const schema = yup.object().shape({});

export default function Type() {
  const { type } = useParams();
  const [exist, setExist] = useState(false);
  const user = useSelector((state) => state.auth?.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    try {
      const updatedData = { ...data, type };
      const emailData = {
        name: `${user.FirstName} ${user.LastName}`,
        email: "Demande de changement de type de compte",
        message: `Bonjour, je souhaite changer mon type de compte en ${type}`,
        phonenumber: user.phoneNumber,
        companyName: data.entreprise,
        wilaya: `(Adresse): ${data.adresse}`,
        requestType: type,
        activityField: `Code RC : ${data.RC}`,
      };
      attributeUser(user._id, updatedData)
        .then((res) => {
          console.log(res);
          toast.success(res.data?.message);
          type === "particulier"
            ? navigate("/")
            : navigate(`/pending-approval`);
          emailjs
            .send(
              "service_5c7xedp",
              "template_9c8fqej",
              emailData,
              "JwvjYGDMFmRwbSfVI"
            )
            .then(
              (response) => {
                console.log("SUCCESS!", response.status, response.text);
              },

              (error) => {
                console.log("FAILED...", error);
              }
            );
        })
        .catch((err) => {
          console.log(err);
          setExist(err.response.data?.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <p>{t("lorem")}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="forlabelsignin">
          {/* RC Input */}
          <label htmlFor="RC">
            Code Registre de Commerce
            <span style={{ color: "red" }}> *</span>{" "}
          </label>
          <div className="passinputcontainer">
            <input
              type="text"
              id="RC"
              placeholder="Code Registre de Commerce"
              {...register("RC")}
            />
            {errors.RC && <p className="error">{errors.RC.message}</p>}
          </div>

          {/* Company Name Input */}
          <label htmlFor="entreprise">
            Nom d'entreprise{" "}
            <span style={{ color: "red" }}>{type === "entreprise" && "*"}</span>{" "}
          </label>
          <div className="passinputcontainer">
            <input
              type="text"
              id="entreprise"
              placeholder="Nom d'entreprise"
              {...register("entreprise")}
            />
            {errors.entreprise && (
              <p className="error">{errors.entreprise.message}</p>
            )}
          </div>

          {/* Address Input */}
          <label htmlFor="address">
            {t("Adresse")}
            <span style={{ color: "red" }}> *</span>{" "}
          </label>
          <div className="passinputcontainer">
            <input
              type="text"
              id="address"
              placeholder="Adresse"
              {...register("adresse")}
            />
            {errors.adresse && (
              <p className="error">{errors.adresse.message}</p>
            )}
          </div>
        </div>
        <p>{exist}</p>

        <div className="middivsignin">
          <button type="submit">{t("Continuer")}</button>
        </div>

        <div className="text-center">
          <p>
            {t("dejauncompte")}
            <Link to="/auth/signin">{t("seconnecter")}</Link>
          </p>
        </div>
      </form>
    </>
  );
}
