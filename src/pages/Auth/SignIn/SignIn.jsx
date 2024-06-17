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

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
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
  const onSubmit = (data) => {
    SignInUser(data)
      .then((res) => {
        toast.success(res.data?.message);
        dispatch(login(res.data?.user));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <p>{t("connectezvous")}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="forlabelsignin">
          <label htmlFor="email">{t("email")}</label>
          <div className="passinputcontainer">
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
            <CiMail size={25} fontSize={"35px"} fontWeight={"bold"} />
            {errors.email && <p className="error">{errors.email.message}</p>}
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
          <Link to="/passwordForgot">{t("motdepasseoublie")} </Link>
          <button type="submit">{t("Continuer")} </button>
        </div>{" "}
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
