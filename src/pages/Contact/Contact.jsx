import  { useState } from "react";
import "./Contact.css";
import Navbar from "../../components/Navbar/Navbar";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import cover from "../../assets/csm_Menzerna_building_1620x250_13dedd488c.webp";
import { createContact } from "../../services/contactservices";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Contact = () => {
  const { t } = useTranslation(); // Initialize translation hook

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    name: "",
    companyName: "",
    wilaya: "",
    agreement: false,
    activityField: [],
    requestType: [],
  });

  const wilayas = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Algiers",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
    "Timimoun",
    "Bordj Badji Mokhtar",
    "Ouled Djellal",
    "Béni Abbès",
    "In Salah",
    "In Guezzam",
    "Touggourt",
    "Djanet",
    "El M'Ghair",
    "El Meniaa",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (
      type === "checkbox" &&
      (name === "activityField" || name === "requestType")
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      field: formData.activityField.join(", "),
      need: formData.requestType.join(", "),
      name: formData.name,
      companyName: formData.companyName,
      email: formData.email,
      wilaya: formData.wilaya,
      message: formData.message,
    };

    createContact(contactData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: t("messageSent"),
          text: t("messageSentSuccess"),
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>{t("contactTitle")}</title>
      </Helmet>
      <Navbar />
      <div className="maincontact" id="maincontact1">
        <div className="cover">
          <img src={cover} alt="" />
        </div>
        <div className="ALL">
          <div className="titles">
            <h4>{t("howCanWeHelp")}</h4>
            <h2>{t("contact")}</h2>
            <p>{t("contactDescription")}</p>
          </div>
          <div className="infos">
            <div className="info1">
              <h4>{t("howToFindUs")}</h4>
              <div className="adress">
                <span>{t("companyName")}</span>
                <span>{t("companyLegal")}</span>
                <span>{t("companyAddress")}</span>
                <span>{t("companyCity")}</span>
                <span>{t("companyCountry")}</span>
              </div>
              <button>{t("callNow")}</button>
              <button>{t("calculateRoute")}</button>
            </div>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.0060291865284!2d3.007551375295887!3d36.65030557613577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fa9748ff0cb75%3A0x6dafc944c4d5fb5f!2sEURL%20SYM%20INDUSTRIE!5e0!3m2!1sfr!2sdz!4v1719842287094!5m2!1sfr!2sdz"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="contactuscarre">
            <div className="titleContact">
              <h1>{t("contactUs")}</h1>
            </div>
            <div className="checkBox">
              <ul>
                <li className="checkTitle">{t("yourFieldOfActivity")}</li>
                <li>
                  <input
                    type="checkbox"
                    name="activityField"
                    value="industrial company"
                    onChange={handleChange}
                  />
                  <label>{t("industrialCompany")}</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="activityField"
                    value="Dealer"
                    onChange={handleChange}
                  />
                  <label>{t("dealer")}</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="activityField"
                    value="Detailer/Body and paint shop"
                    onChange={handleChange}
                  />
                  <label>{t("detailerBodyAndPaintShop")}</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="activityField"
                    value="Other"
                    onChange={handleChange}
                  />
                  <label>{t("other")}</label>
                </li>
              </ul>
              <ul>
                <li className="checkTitle">{t("youWant")}</li>
                <li>
                  <input
                    type="checkbox"
                    name="requestType"
                    value="To find a distributor in your area"
                    onChange={handleChange}
                  />
                  <label>{t("findDistributor")}</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="requestType"
                    value="Product information"
                    onChange={handleChange}
                  />
                  <label>{t("productInformation")}</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="requestType"
                    value="Other"
                    onChange={handleChange}
                  />
                  <label>{t("other")}</label>
                </li>
              </ul>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="forinput" id="forinputsmall">
                <div className="inputText">
                  <label>{t("name")}*</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("enterYourName")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputText">
                  <label>{t("companyName")}</label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder={t("enterYourCompanyName")}
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputText">
                  <label>{t("email")}*</label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("enterYourEmail")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputText">
                  <label>{t("wilaya")}*</label>
                  <select
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={handleChange}
                    placeholder={t("chooseYourWilaya")}
                    required
                  >
                    <option value="">{t("chooseYourWilaya")}</option>
                    {wilayas.map((wilaya) => (
                      <option value={wilaya} key={wilaya}>
                        {wilaya}
                      </option>
                    ))}{" "}
                  </select>
                </div>
              </div>
              <div className="message">
                <div className="inputText">
                  <label>{t("message")}</label>
                  <textarea
                    name="message"
                    id="inputcontactbig"
                    placeholder={t("enterYourMessage")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>              </div>
              <div className="checkBox condition">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                />
                <label>{t("agreementText")}</label>
              </div>
            <button type="submit">{t("submit")}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;