import "./Footer.css";
import image from "../../assets/Logo.png";
import { useTranslation } from "react-i18next";
import { BsInstagram } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from "react-router-dom";

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
          <h3 className="">About Sym Industries</h3>
          <ul className="">
            <li>
              <a
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
                href="#aboutus"
              >
                <ChevronRightIcon className="" />
                Our Company
              </a>
            </li>
            <li>
              <Link
                to="/products"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <ChevronRightIcon className="" />
                Products
              </Link>
            </li>
            <li>
              <ChevronRightIcon className="" />
              News
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
            <li>+213 552 74 14 09</li>
            <li>contact@symindustrie.com</li>
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
            <li>
              <a
                href="https://www.linkedin.com/company/symindustrie/posts/?feedView=all"
                target="_blank"
              >
                <FaLinkedin /> Linkedin
              </a>
            </li>
            <li>
              <a
                href="
                https://www.tiktok.com/@sym.industrie?_t=8pH77R8N85Z&_r=1"
                target="_blank"
              >
                <AiFillTikTok size={17} /> TikTok
              </a>
            </li>
          </ul>
        </div>
        <div className="forIframe">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.0268939029447!2d3.0101263!3d36.650301299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fa9748ff0cb75%3A0x6dafc944c4d5fb5f!2sEURL%20SYM%20INDUSTRIE!5e1!3m2!1sfr!2sdz!4v1722872342387!5m2!1sfr!2sdz"
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
