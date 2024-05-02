import "./SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "../../../services/authservices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  // register function :
  const onSubmit = (data) => {
    SignUpUser(data)
      .then((res) => {
        toast.success(res.data?.message);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

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
                placeholder=""
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
                placeholder=""
                {...register("LastName")}
              />
              {errors.LastName && (
                <p className="error">{errors.LastName.message}</p>
              )}
            </div>
          </div>
          <label htmlFor="email">Adresse courriel</label>
          <input
            type="email"
            id="email"
            placeholder=""
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder=""
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div>
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
