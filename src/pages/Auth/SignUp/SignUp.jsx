import "./SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  nom: yup.string().required("Nom est requis"),
  prenom: yup.string().required("Prénom est requis"),
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

  const onSubmit = (data) => {
    console.log("Form data:", data);
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
              <label htmlFor="nom">Nom </label>
              <input type="text" id="nom" placeholder="" {...register("nom")} />
              {errors.nom && <p className="error">{errors.nom.message}</p>}
            </div>
            <div>
              <label htmlFor="prenom">Prénom </label>
              <input
                type="text"
                id="prenom"
                placeholder=""
                {...register("prenom")}
              />
              {errors.prenom && (
                <p className="error">{errors.prenom.message}</p>
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
