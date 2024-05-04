import "./SignIn.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log("Form data:", data);
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <p>
        Connectez-vous à SYM Industrie afin de continuer pour
        {" <website>"}.com.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="forlabelsignin">
          <label htmlFor="email">Adresse courriel</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <label htmlFor="password">Mot de passe</label>

          <div className="passinputcontainer">
            <input
              type={show ? "text" : "password"}
              id="password"
              placeholder="mot de passe"
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
          <Link to="/passwordReset">Mot de passe oublié? </Link>
          <button type="submit">Continuer</button>
        </div>{" "}
        <div className="text-center">
          <p>
            {"Vous n'avez pas de compte ?"}{" "}
            <Link to="/auth/signup">{"S'inscrire"}</Link>
          </p>
        </div>
      </form>
    </>
  );
}
