import "./AboutUsPage.css";
import image from "../../assets/logo2.png";
import { useTranslation } from "react-i18next";
import LogoCarousel from "../../components/LogoCarouselle/LogoCarousel";

export default function AboutUsPage() {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className="aboutusfirst" style={{ marginTop: "50px" }}>
          <div className="aboutusimg">
            <img src={image} alt="loading" />
          </div>

          <div className="aboutustext">
            <h2>{t("aboutushomeh2")}</h2>
            <h1>{t("aboutushomeh1")}</h1>
            <p>{t("aboutushomep")}</p>
          </div>
        </div>
      </div>
      <LogoCarousel></LogoCarousel>
    </>
  );
}
