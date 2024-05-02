import "./SignIn.css";
export default function SignIn() {
  return (
    <>
      <p>
        Connectez-vous à SYM Industrie afin de continuer pour
        {" <website>"}.com.
      </p>
      <form>
        <div className="forlabelsignin">
          <label htmlFor="email">Adresse courriel</label>
          <input type="email" id="email" placeholder="" required />
          <label htmlFor="password">mot de passe</label>
          <input type="password" id="password" placeholder="" required />
        </div>
        <div>
          <button type="submit">Continuer</button>
        </div>
        <div className="text-center">
          <p>
            {"Vous n'avez pas de compte ?"}{" "}
            <a href="/auth/signup">{"Sinscrire"}</a>
          </p>
        </div>
      </form>
    </>
  );
}
