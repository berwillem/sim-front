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
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(true);
  return (
    <>
      <p>
        Ouvrez une session pour SYM Industrie afin de continuer pour
        {" <website>"}.com.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="forlabelsignin">
          <div className="labelSignUphalf">
            <div>
              <label htmlFor="FirstName">Prénom </label>
              <input
                type="text"
                id="FirstName"
                placeholder="prénom"
                {...register("FirstName")}
              />
              {errors.FirstName && (
                <p className="error">{errors.FirstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="LastName">Nom </label>
              <input
                type="text"
                id="LastName"
                placeholder="Nom "
                {...register("LastName")}
              />
              {errors.LastName && (
                <p className="error">{errors.LastName.message}</p>
              )}
            </div>
          </div>
          <label htmlFor="email">Adresse courriel</label>
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
          <label htmlFor="password">Mot de passe</label>

          <div className="passinputcontainer">
            <input
              type={show ? "password" : "text"}
              id="password"
              placeholder="mot de passe"
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
        </div>
        <div className="middivsignin">
          <button type="submit">Continuer</button>
        </div>
        <div className="text-center">
          <p>
            {"Vous avez déjà un compte ?"}{" "}
            <Link to="/auth/signin">{"Se connecter"}</Link>
          </p>
        </div>
      </form>
    </>
  );
}
