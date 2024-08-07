import { useState } from "react";
import "./Contact.css";

import Navbar from "../../components/Navbar/Navbar";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import cover from "../../assets/csm_Menzerna_building_1620x250_13dedd488c.webp";
import { createContact } from "../../services/contactservices"; // Assurez-vous que ce chemin est correct

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    name: "",
    companyName: "",
    country: "Algeria",
    agreement: false,
    activityField: [],
    requestType: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && (name === "activityField" || name === "requestType")) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      "field": formData.activityField.join(", "),
      "need": formData.requestType.join(", "),
      "name": formData.name,
      "companyName": formData.companyName,
      "email": formData.email,
      "country": formData.country,
      "message": formData.message,
    
     
     
    };

  
      createContact(contactData).then(()=>{
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: "Your message has been sent successfully!",
        });
     
      }
        
      ).catch((err) => {
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
        <title>Contact</title>
      </Helmet>
      <Navbar />
      <div className="maincontact" id="maincontact1">
        <div className="cover">
          <img src={cover} alt="" />
        </div>
        <div className="ALL">
          <div className="titles">
            <h4>HOW CAN WE HELP YOU?</h4>
            <h2>Contact</h2>
            <p>Do you have a question for us? We have compiled the most frequently asked questions and answers for you.
            If you have additional questions or suggestions, please feel free to contact us. We will respond as quickly as possible.</p>
          </div>
          <div className="infos">
            <div className="info1">
              <h4>How to find us</h4>
              <div className="adress">
                <span>menzerna polishing compounds</span>
                <span>GmbH & Co. KG</span>
                <span>Industriestraße 25</span>
                <span>76470 Birtoutq</span>
                <span>Algeria</span>
              </div>
              <button>Call now</button>
              <button>Calculate Route</button>
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
              <h1>Contact us</h1>
            </div>
            <div className="checkBox">
              <ul>
                <li className="checkTitle">Your field of activity</li>
                <li>
                  <input type="checkbox" name="activityField" value="industrial company" onChange={handleChange} />
                  <label>industrial company</label>
                </li>
                <li>
                  <input type="checkbox" name="activityField" value="Dealer" onChange={handleChange} />
                  <label>Dealer</label>
                </li>
                <li>
                  <input type="checkbox" name="activityField" value="Detailer/Body and paint shop" onChange={handleChange} />
                  <label>Detailer/Body and paint shop</label>
                </li>
                <li>
                  <input type="checkbox" name="activityField" value="Other" onChange={handleChange} />
                  <label>Other</label>
                </li>
              </ul>
              <ul>
                <li className="checkTitle">You want</li>
                <li>
                  <input type="checkbox" name="requestType" value="To find a distributor in your area" onChange={handleChange} />
                  <label>To find a distributor in your area</label>
                </li>
                <li>
                  <input type="checkbox" name="requestType" value="Product information" onChange={handleChange} />
                  <label>Product information</label>
                </li>
                <li>
                  <input type="checkbox" name="requestType" value="Other" onChange={handleChange} />
                  <label>Other</label>
                </li>
              </ul>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="forinput" id="forinputsmall">
                <div className="inputText">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputText">
                  <label>Company name</label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter Your Company name"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputText">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputText">
                  <label>Country*</label>
                  <select name="country" value={formData.country} onChange={handleChange}>
                    <option value="Algeria">Algeria</option>
                    {/* Add other country options as needed */}
                  </select>
                </div>
              </div>
              <div className="message">
                <div className="inputText">
                  <label>Message</label>
                  <textarea
                    name="message"
                    id="inputcontactbig"
                    placeholder="Enter Your message"
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
                <label>
                  Yes, I agree to Sym storing and processing my data to handle my inquiry and to contact me. You can find more information and revocation instructions in our privacy policy.
                </label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
