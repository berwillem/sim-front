import "./SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "../../../services/authservices";
import { toast } from "react-toastify";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { CiMail } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const schema = yup.object().shape({
  FirstName: yup.string().required("Prénom est requis"),
  LastName: yup.string().required("Nom est requis"),
  email: yup.string().email("Email invalide").required("Email est requis"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Mot de passe est requis"),
});

export default function SignUp() {
  const [exist, setExist] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // register function :
  const onSubmit = (data) => {
    SignUpUser(data)
      .then((res) => {
        toast.success(res.data?.message);
        dispatch(login(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        err.response.data.message == "User already exists! Login instead." &&
          setExist(true);
      });
  };
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>signup </title>
      </Helmet>
      <p>{t("signupP")} </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="forlabelsignin">
          <div className="labelSignUphalf">
            <div>
              <label htmlFor="FirstName">{t("firstname")} </label>
              <input
                type="text"
                id="FirstName"
                placeholder={t("firstname")}
                {...register("FirstName")}
              />
              {errors.FirstName && (
                <p className="error">{errors.FirstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="LastName">{t("lastname")} </label>
              <input
                type="text"
                id="LastName"
                placeholder={t("lastname")}
                {...register("LastName")}
              />
              {errors.LastName && (
                <p className="error">{errors.LastName.message}</p>
              )}
            </div>
          </div>
          <label htmlFor="email">{t("email")}</label>

          <div className="passinputcontainer">
            <input
              type="email"
              id="email"
              placeholder={t("email")}
              {...register("email")}
            />
            <CiMail size={25} fontSize={"35px"} fontWeight={"bold"} />

            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <label htmlFor="password">{t("password")}</label>
          <div className="passinputcontainer">
            <input
              type={show ? "password" : "text"}
              id="password"
              placeholder={t("password")}
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            {show ? (
              <IoMdEyeOff
                onClick={() => setShow(!show)}
                fontSize={"25px"}
                cursor={"pointer"}
              />
            ) : (
              <IoEye
                onClick={() => setShow(!show)}
                fontSize={"25px"}
                cursor={"pointer"}
              />
            )}
          </div>
          {exist && (
            <p className="error" style={{ color: "red" }}>
              User already exists! Login instead.
            </p>
          )}
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
