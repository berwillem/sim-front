import "./SignIn.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { SignInUser } from "../../../services/authservices";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../redux/slices/authSlice";
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
            {"Vous n'avez pas de compte ?"}{" "}
            <Link to="/auth/signup">S'inscrire</Link>
          </p>
        </div>
      </form>
    </>
  );
}
