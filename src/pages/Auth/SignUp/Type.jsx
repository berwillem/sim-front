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

const schema = yup.object().shape({});

export default function Type() {
  const { type } = useParams();
  console.log(type);

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
    console.log("Form Data:", data);

    toast.success();
    navigate("/user/type");
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
          <label htmlFor="companyName">
            Nom d'entreprise{" "}
            <span style={{ color: "red" }}>{type === "entreprise" && "*"}</span>{" "}
          </label>
          <div className="passinputcontainer">
            <input
              type="text"
              id="companyName"
              placeholder="Nom d'entreprise"
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="error">{errors.companyName.message}</p>
            )}
          </div>

          {/* Address Input */}
          <label htmlFor="address">
            {t("Addresse")}
            <span style={{ color: "red" }}> *</span>{" "}
          </label>
          <div className="passinputcontainer">
            <input
              type="text"
              id="address"
              placeholder="Adresse"
              {...register("address")}
            />
            {errors.address && (
              <p className="error">{errors.address.message}</p>
            )}
          </div>
        </div>

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
