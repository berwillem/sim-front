import { IoArrowForward } from "react-icons/io5";
import "./ValidationPage.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ValidationPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <main className="wait-page">
      <h2>
        {t("validationpageh2")} <br /> {t("validationpageh2_2")}
      </h2>
      <div className="buttons">
        <button onClick={() => navigate("/contact")}>
          {t("contact_support")}
        </button>

        <button type="button" onClick={() => navigate("/")}>
          <span>{t("Continuer")}</span>
          <IoArrowForward />
        </button>
      </div>
    </main>
  );
}
