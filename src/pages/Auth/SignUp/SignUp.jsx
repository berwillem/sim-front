import "./SignUp.css";
export default function SignUp() {
  return (
    <>
      <p>
        Ouvrez une session pour SYM Industrie afin de continuer pour
        {" <website>"}.com.
      </p>
      <form>
        <div className="forlabelsignin">
          <div className="labelSignUphalf">
            <div>
              <label htmlFor="nom">Nom </label>
              <input type="text" id="nom" placeholder="" required />
            </div>
            <div>
              <label htmlFor="prenom">Prenom </label>
              <input type="text" id="prenom" placeholder="" required />
            </div>
          </div>
          <label htmlFor="email">Adresse courriel</label>
          <input type="email" id="email" placeholder="" required />
          <label htmlFor="password">mot de passe</label>
          <input type="password" id="password" placeholder="" required />
          <label htmlFor="password">confirmer votre mot de passe</label>
          <input type="password" id="confirmpassword" placeholder="" required />
        </div>
        <div>
          <button type="submit">Continuer</button>
        </div>
        <div className="text-center">
          <p>
            {"Vous avez déja un compte ?"}{" "}
            <a href="/auth/signin">{"Se connecter"}</a>
          </p>
        </div>
      </form>
    </>
  );
}
