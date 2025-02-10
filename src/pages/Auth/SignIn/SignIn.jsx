import "./SignIn.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInUser } from "../../../services/authservices";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../redux/slices/authSlice";
import { CiMail } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FaPhone } from "react-icons/fa";

const schema = yup.object().shape({
  identifier: yup
    .string()
    .test(
      "is-email-or-phone",
      "Enter a valid email or phone number",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{10,15}$/; // Supports international format
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    )
    .required("Email or phone number is required"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const onSubmit = (data) => {
    SignInUser(data) // Send { identifier: "email/phone", password }
      .then((res) => {
        setTimeout(() => {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }, 50);
        toast.success(res.data?.message);
        dispatch(login(res.data));

        if (res.data?.user?.role === "admin") {
          navigate("/admin/home");
        } else {
          navigate("/");
        }
      })
      .catch((err) => setError(err.response?.data.message));
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <p>{t("connectezvous")}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="forlabelsignin">
          <label htmlFor="identifier">{t("emailOrPhone")}</label>
          <div className="passinputcontainer">
            <input
              type="text"
              id="identifier"
              placeholder="Email or Phone Number"
              {...register("identifier")}
            />
            {errors.identifier && (
              <p className="error">{errors.identifier.message}</p>
            )}
            <CiMail size={25} />
            <FaPhone size={20} style={{ marginLeft: "10px" }} />
          </div>

          <label htmlFor="password">{t("password")}</label>
          <div className="passinputcontainer">
            <input
              type={show ? "text" : "password"}
              id="password"
              placeholder={t("password")}
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            {!show ? (
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
        </div>

        <div className="middivsignin">
          {error && <h3 className="error-message">{error}</h3>}
          <Link to="/passwordForgot">{t("motdepasseoublie")}</Link>
          <button type="submit">{t("Continuer")}</button>
        </div>

        <div className="text-center">
          <p>
            {t("pasdecompte")}
            <Link to="/auth/signup">{t("S'inscrire")}</Link>
          </p>
        </div>
      </form>
    </>
  );
}
