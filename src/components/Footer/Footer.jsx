import "./Footer.css";
import image from "../../assets/logo.png";
import { useTranslation } from "react-i18next";
import { BsInstagram } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";

export default function Component() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footercontainer">
        <div className="footerfirstsection">
          <img src={image} alt="maxshine logo" className="iconfooter" />

          <p>{t("footerAbout")}</p>
        </div>
        <div className="footeraboutsection">
          <h3 className="">About Maxshine</h3>
          <ul className="">
            <li>
              <ChevronRightIcon className="" />
              Our Company
            </li>
            <li>
              <ChevronRightIcon className="" />
              Products
            </li>
            <li>
              <ChevronRightIcon className="" />
              News
            </li>
            <li>
              <ChevronRightIcon className="" />
              Warranty Reg.
            </li>
            <li>
              <ChevronRightIcon className="" />
              Download Catalog
            </li>
          </ul>
        </div>

        <div className="footercontactsection">
          <h3 className="">Talk with our support</h3>
          <ul className="">
            <li>+86 553 499 6266</li>
            <li>+86 553 393 2199</li>
            <li>sales@maxshine.cn</li>
            <li>
              <a
                href="https://web.facebook.com/profile.php?id=61558883573403"
                target="_blank"
              >
                <FaSquareFacebook />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/symindustrie/" target="_blank">
                <BsInstagram /> Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="forIframe">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3201.0070507539035!2d3.0103239999999998!3d36.650281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDM5JzAxLjAiTiAzwrAwMCczNy4yIkU!5e0!3m2!1sfr!2sdz!4v1717162530808!5m2!1sfr!2sdz"
            width="400"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="foriframeunder"></div>
      </div>
      <div className="footercopyright">
        <p>{t("copyright")}</p>
      </div>
    </footer>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
