import { useState } from "react";
import "./Contact.css";
import Navbar from "../../components/Navbar/Navbar";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import cover from "../../assets/contactcover.jpg";
import { createContact } from "../../services/contactservices";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    name: "",
    companyName: "",
    country: "Algeria",
    phonenumber: "",
    wilaya: "",
    agreement: false,
    activityField: [],
    requestType: [],
  });

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
      country: formData.country,
      message: formData.message,
      phonenumber: formData.phonenumber,
      wilaya: formData.wilaya,
    };

    console.log(contactData + "contactDataaaaaaaaaaaaaaaaaaaaaaaaaaa");

    createContact(contactData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: t("successMessage.title"),
          text: t("successMessage.text"),
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: t("errorMessage.title"),
          text: err.message,
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>{t("pageTitle")}</title>
      </Helmet>
      <Navbar />
      <div className="maincontact" id="maincontact1">
        <div className="cover">
          <img src={cover} alt="" />
        </div>
        <div className="ALL">
          <div className="titles">
            <h4>{t("header.title")}</h4>
            <h2>{t("header.subtitle")}</h2>
            <p>{t("header.description")}</p>
          </div>
          <div className="infos">
            <div className="info1">
              <h4>{t("infoSection.title")}</h4>
              <div className="adress">
                <span>{t("infoSection.address.company")}</span>
                <span>{t("infoSection.address.city")}</span>
                <span>{t("infoSection.address.country")}</span>
              </div>
              <button>
                <a
                  target="_blank"
                  href="https://www.google.com/maps/dir//EURL+SYM+INDUSTRIE+Khraicia+16091/@36.6503013,3.0101263,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x128fa9748ff0cb75:0x6dafc944c4d5fb5f!2m2!1d3.0101263!2d36.6503013?entry=ttu&g_ep=EgoyMDI0MDgyNi4wIKXMDSoASAFQAw%3D%3D"
                >
                  {t("infoSection.button")}
                </a>
              </button>
            </div>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.0268939029447!2d3.0101263!3d36.650301299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fa9748ff0cb75%3A0x6dafc944c4d5fb5f!2sEURL%20SYM%20INDUSTRIE!5e1!3m2!1sfr!2sdz!4v1722872342387!5m2!1sfr!2sdz"
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
              <h1>{t("contactForm.title")}</h1>
            </div>
            <div className="checkBox">
              <ul>
                <li className="checkTitle">
                  {t("contactForm.fields.activityField.label")}
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="activityField"
                    value="Société industrielle"
                    onChange={handleChange}
                  />
                  <label>
                    {t(
                      "contactForm.fields.activityField.options.industrialCompany"
                    )}
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="activityField"
                    value="Particulier"
                    onChange={handleChange}
                  />
                  <label>
                    {t("contactForm.fields.activityField.options.individual")}
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="activityField"
                    value="Revendeur"
                    onChange={handleChange}
                  />
                  <label>
                    {t("contactForm.fields.activityField.options.reseller")}
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="activityField"
                    value="Autre"
                    onChange={handleChange}
                  />
                  <label>
                    {t("contactForm.fields.activityField.options.other")}
                  </label>
                </li>
              </ul>
              <ul>
                <li className="checkTitle">
                  {t("contactForm.fields.requestType.label")}
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="requestType"
                    value="To find a distributor in your area"
                    onChange={handleChange}
                  />
                  <label>
                    {t(
                      "contactForm.fields.requestType.options.findDistributor"
                    )}
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="requestType"
                    value="Demande devis"
                    onChange={handleChange}
                  />
                  <label>
                    {t("contactForm.fields.requestType.options.quoteRequest")}
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="requestType"
                    value="Product information"
                    onChange={handleChange}
                  />
                  <label>
                    {t("contactForm.fields.requestType.options.productInfo")}
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="requestType"
                    value="Other"
                    onChange={handleChange}
                    required
                  />
                  <label>
                    {t("contactForm.fields.requestType.options.other")}
                  </label>
                </li>
              </ul>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="forinput" id="forinputsmall">
                <div className="inputText">
                  <label>{t("contactForm.fields.name")}</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("contactForm.fields.name")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputText">
                  <label>{t("contactForm.fields.companyName")}</label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder={t("contactForm.fields.companyName")}
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputText">
                  <label>{t("contactForm.fields.email")}</label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("contactForm.fields.email")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputText">
                  <label>{t("contactForm.fields.phonenumber")}</label>
                  <input
                    type="string"
                    name="phonenumber"
                    placeholder={t("contactForm.fields.phonenumber")}
                    value={formData.phonenumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputText">
                  <label>Wilaya</label>
                  <select
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {t("contactForm.fields.wilaya")}
                    </option>
                    {wilayas.map((wilaya) => (
                      <option key={wilaya} value={wilaya}>
                        {wilaya}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="message">
                <div className="inputText">
                  <label>{t("contactForm.fields.message")}</label>
                  <textarea
                    name="message"
                    id="inputcontactbig"
                    placeholder={t("contactForm.fields.message")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="checkBox condition">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                />
                <label>{t("contactForm.agreement.text")}</label>
              </div>
              <button type="submit">{t("contactForm.submitButton")}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

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
  "Alger",
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
  "Bordj Bou Arreridj",
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
